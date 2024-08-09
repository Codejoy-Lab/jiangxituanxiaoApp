import {View, StyleSheet, Image} from 'react-native';
import MapEcharts from '../../components/MapEcharts';
import RepeatButton from '../../components/RepeatButton';
import VideoControl from '../../components/VideoControl';
import React, {useEffect, useState} from 'react';
import {sendCommand} from '../../request/api';
import Config from 'react-native-config';
// import {saveData, getData} from '../../utils';

export default (props: {isLandScape: boolean}) => {
  const {isLandScape} = props;
  const [regionName, setRegionName] = useState('无');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    `${Config.APP_API}/images/数字沙盘.png`,
  );
  function isLandScapeChangeValue<T>(
    landScapeValue: T,
    unLandScapeValue: T,
  ): T {
    return isLandScape ? landScapeValue : unLandScapeValue;
  }
  const initRegionName = async () => {
    // const name = await getData('regionName');
    // if (name) {
    //   setRegionName(name);
    // }
  };
  const initPlayStatus = async () => {
    // const v = await getData('mapIsPlaying');
    // setIsPlaying(v === '2' ? false : true);
  };
  useEffect(() => {
    initRegionName();
    initPlayStatus();
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
          onChange={(data: {regionName: string}) => {
            if (data.regionName != regionName) {
              setRegionName(data.regionName);
              setSelectedImage(
                `${Config.APP_API}/images/${data.regionName}.png`,
              );
              setIsPlaying(false);
              saveData('regionName', data.regionName);
            } else {
              // 取消选择
              console.log('取消选择');
              setRegionName('');
              setSelectedImage(`${Config.APP_API}/images/数字沙盘.png`);
              saveData('regionName', '');
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
          <Image
            source={{uri: selectedImage}}
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
                    : '数字沙盘先导片v14.mp4',
                command: v ? 'start_play' : 'stop_play',
                module: '数字沙盘',
              });
              setIsPlaying(v);
              // saveData('mapIsPlaying', v ? '1' : '2');
            }}
          />
          <RepeatButton
            style={{width: 30, height: 30}}
            onRepeat={() => {
              sendCommand({
                name: regionName
                  ? `${regionName}.mp4`
                  : '数字沙盘先导片v14.mp4',
                command: 'resume_play',
                module: '数字沙盘',
              });
              // saveData('mapIsPlaying', '1');
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
