import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import VideoControl from '../../components/VideoControl';
import RepeatButton from '../../components/RepeatButton';
import {sendCommand} from '../../request/api';

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/滑轨屏.png')}
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
            sendCommand({
              name: '滑轨屏v8.mp4',
              command: v ? 'start_play' : 'stop_play',
            });
            setIsPlaying(v);
          }}
          style={{width: 50, height: 50}}
        />
        <RepeatButton
          onRepeat={() => {
            sendCommand({
              name: '滑轨屏v8.mp4',
              command: 'resume_play',
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
