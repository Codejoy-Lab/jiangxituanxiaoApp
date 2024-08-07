import {View, StyleSheet, Image} from 'react-native';
import MapEcharts from '../../components/MapEcharts';
import RepeatButton from '../../components/RepeatButton';
import VideoControl from '../../components/VideoControl';
import React, {useEffect, useState} from 'react';
import {sendCommand} from '../../request/api';
export default (props: {isLandScape: boolean}) => {
  const {isLandScape} = props;
  const [regionName, setRegionName] = useState('无');
  const [isPlaying, setIsPlaying] = useState(false);
  function isLandScapeChangeValue<T>(
    landScapeValue: T,
    unLandScapeValue: T,
  ): T {
    return isLandScape ? landScapeValue : unLandScapeValue;
  }
  useEffect(() => {
    console.log('isLandScape', isLandScape);
  }, [isLandScape]);

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isLandScapeChangeValue('row', 'column'),
        },
      ]}>
      <View
        style={[
          styles.map,
          {
            height: isLandScapeChangeValue('100%', '60%'),
            width: isLandScapeChangeValue('68%', '100%'),
          },
        ]}>
        <MapEcharts
          onChange={(data: {regionName: React.SetStateAction<string>}) => {
            if (data.regionName != regionName) {
              setRegionName(data.regionName);
              setIsPlaying(false);
            } else {
              // 取消选择
              console.log('取消选择');
              setRegionName('');
            }
          }}
        />
      </View>
      <View
        style={[
          styles.option,
          {
            height: isLandScapeChangeValue('100%', '38%'),
            width: isLandScapeChangeValue('30%', '100%'),
          },
        ]}>
        <View
          style={[styles.video]}
          onLayout={e => {
            console.log(e.nativeEvent.layout);
          }}>
          {/* <Image source={require('../../assets/数字沙盘-先导片.jpg')} /> */}
          <Image
            source={require('../../assets/数字沙盘-先导片.png')}
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
            style={{width: 30, height: 30}}
            onChange={v => {
              sendCommand({
                name:
                  regionName !== '无'
                    ? `${regionName}.mp4`
                    : `数字沙盘先导片v14.mp4`,
                command: v ? 'start_play' : 'stop_play',
              });
              setIsPlaying(v);
            }}
          />
          <RepeatButton
            style={{width: 30, height: 30}}
            onRepeat={() => {
              sendCommand({
                name: regionName
                  ? `${regionName}.mp4`
                  : `数字沙盘先导片v14.mp4`,
                command: 'resume_play',
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: '2%',
  },
  option: {
    // width: '30%',
    // height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    // 阴影的模糊半径
    shadowOpacity: 0.8,
    // 阴影的扩散半径
    shadowRadius: 4,
  },
  map: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  controlRow: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
});
