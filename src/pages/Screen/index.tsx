/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import VideoControl from '../../components/VideoControl';
import RepeatButton from '../../components/RepeatButton';
import {updateAppStatus, getPoint, revertScreen} from '../../request/api';
import Config from 'react-native-config';

let timeId: any = '';
export default (props: {status: any}) => {
  const {status} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [point, setPoint] = useState('起点');
  // const [data] =
  const checkPoint = async () => {
    return new Promise((resolve, reject) => {
      timeId = setInterval(async () => {
        try {
          const res = await getPoint();
          console.log('检测结果===', res.data.point);

          if (res.data.point === 'begin') {
            setPoint('起点');
            clearInterval(timeId);
            resolve('begin');
          } else {
            setPoint('end' == res.data.point ? '终点' : '中间位置');
          }
        } catch (error) {
          clearInterval(timeId);
          reject(error);
        }
      }, 1000);
    });
  };
  useEffect(() => {
    // checkPoint();
    return () => {
      clearInterval(timeId);
    };
  }, []);
  useEffect(() => {
    setIsPlaying(status?.screen?.isPlaying);
    if (status?.screen?.mark == 'done') {
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
        {/* <Text style={{color: '#fff'}}>{`滑轨位置: ${point}`}</Text> */}
        {!isPlaying ? (
          <VideoControl
            isPlaying={isPlaying}
            onChange={v => {
              getPoint().then(res => {
                if (res.data.point == 'begin') {
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
                } else {
                }
              });
            }}
            style={{width: 50, height: 50}}
          />
        ) : (
          <Text style={{color: '#fff'}}>视频播放中</Text>
          // <RepeatButton
          //   onRepeat={async () => {
          //     //    await checkPoint();
          //     setIsPlaying(true);
          //     updateAppStatus({
          //       ...status,
          //       screen: {
          //         isPlaying: true,
          //         command: 'resume_play',
          //         name: '滑轨屏v8.mp4',
          //         point: 'none',
          //       },
          //       active: 'screen',
          //     });
          //     // ? 点击暂停后，立即开始轮询检测滑轨的位置

          //     checkPoint()
          //       .then(point => {
          //         console.log(point);
          //         //?滑轨位置回到起点后，发送start指令，播放视频
          //         if (point === 'begin') {
          //           updateAppStatus({
          //             ...status,
          //             screen: {
          //               isPlaying: true,
          //               command: 'start_play',
          //               name: '滑轨屏v8.mp4',
          //               point: 'begin',
          //             },
          //             active: 'screen',
          //           });
          //         }
          //       })
          //       .catch(err => {
          //         console.log(err);
          //         updateAppStatus({
          //           ...status,
          //           screen: {
          //             isPlaying: false,
          //             command: 'resume_play',
          //             name: '滑轨屏v8.mp4',
          //           },
          //           active: 'screen',
          //         });
          //         // 如果发生错误，将滑轨暂停，并回到终点
          //       });
          //   }}
          //   style={{width: 50, height: 50}}
          // />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            revertScreen();
            updateAppStatus({
              ...status,
              screen: {
                isPlaying: false,
                command: 'stop_play',
                name: '滑轨屏v8.mp4',
              },
              active: 'screen',
            });
            setIsPlaying(false);
          }}>
          <Text style={{color: '#fff'}}>收回滑轨屏（视频将会暂停播放）</Text>
        </TouchableOpacity>
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
  button: {
    height: '70%',
    paddingHorizontal: 20,
    backgroundColor: '#1677ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
