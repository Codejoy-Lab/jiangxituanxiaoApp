import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import VideoControl from '../../components/VideoControl';
import RepeatButton from '../../components/RepeatButton';
import {sendCommand, updateAppStatus, getPoint} from '../../request/api';
import Config from 'react-native-config';

let timeId: any = '';
export default (props: {status: any}) => {
  const {status} = props;
  const [isPlaying, setIsPlaying] = useState(status.screen.isPlaying);

  const checkPoint = async () => {
    return new Promise((resolve, reject) => {
      timeId = setInterval(async () => {
        try {
          const res = await getPoint();
          if (res === 'begin') {
            clearInterval(timeId);
            resolve('begin');
          }
        } catch (error) {
          clearInterval(timeId);
          reject(error);
        }
      }, 1000);
    });
  };
  useEffect(() => {
    return () => {
      clearInterval(timeId);
    };
  }, []);
  useEffect(() => {
    setIsPlaying(status.screen.isPlaying);
    if (status.screen.mark == 'done') {
      setIsPlaying(false);
    }
  }, [status]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{uri: `${Config.APP_API}/images/滑轨屏.png`}}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.controlRow}>
        <VideoControl
          isPlaying={isPlaying}
          onChange={v => {
            updateAppStatus({
              ...status,
              screen: {
                isPlaying: v,
                command: v ? 'start_play' : 'stop_play',
                name: '滑轨屏v8.mp4',
              },
              active: 'screen',
            });
            setIsPlaying(v);
          }}
          style={{width: 50, height: 50}}
        />
        <RepeatButton
          onRepeat={async () => {
            //    await checkPoint();
            setIsPlaying(true);
            updateAppStatus({
              ...status,
              screen: {
                isPlaying: true,
                command: 'resume_play',
                name: '滑轨屏v8.mp4',
              },
              active: 'screen',
            });
          }}
          style={{width: 50, height: 50}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '2%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    height: '80%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  controlRow: {
    width: '100%',
    height: '15%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});
