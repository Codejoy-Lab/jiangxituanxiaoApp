/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image} from 'react-native';
import MapEcharts from '../../components/MapEcharts';
import RepeatButton from '../../components/RepeatButton';
import VideoControl from '../../components/VideoControl';
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {updateAppStatus} from '../../request/api';

export default (props: {isLandScape: boolean; status: any}) => {
  const {isLandScape, status} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [regionName, setRegionName] = useState('无');
  const [selectedImage, setSelectedImage] = useState(
    `${Config.APP_API}/images/数字沙盘.png`,
  );
  function isLandScapeChangeValue<T>(
    landScapeValue: T,
    unLandScapeValue: T,
  ): T {
    return isLandScape ? landScapeValue : unLandScapeValue;
  }

  useEffect(() => {
    setRegionName(status?.map?.regionName);
    setIsPlaying(status?.map?.isPlaying);

    if (status?.map?.mark === 'done') {
      setIsPlaying(false);
    }
    if (status?.map?.regionName && status?.map?.regionName != '无') {
      setSelectedImage(`${Config.APP_API}/images/${status.map.regionName}.png`);
    } else {
      console.log('11111', status);

      setSelectedImage(`${Config.APP_API}/images/数字沙盘.png`);
    }
  }, [status]);
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
            console.log(data.regionName, regionName);

            if (data.regionName != regionName && data.regionName != '无') {
              setRegionName(data.regionName);
              console.log(`${Config.APP_API}/images/${data.regionName}.png`);
              setSelectedImage(
                `${Config.APP_API}/images/${data.regionName}.png`,
              );
              setIsPlaying(false);
            } else {
              // 取消选择
              console.log('取消选择');
              setRegionName('');
              setSelectedImage(`${Config.APP_API}/images/数字沙盘.png`);
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
        <View style={[styles.video]}>
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
              // sendCommand({
              //   name:
              //     regionName !== '无'
              //       ? `${regionName}.mp4`
              //       : '数字沙盘先导片v14.mp4',
              //   command: v ? 'start_play' : 'stop_play',
              //   module: 'map',
              //   regionName: regionName,
              // });
              // console.log('2222', regionName);

              updateAppStatus({
                ...status,
                map: {
                  isPlaying: v,
                  command: v ? 'start_play' : 'stop_play',
                  regionName,
                  name:
                    regionName !== '无'
                      ? `${regionName}.mp4`
                      : '数字沙盘先导片v14.mp4',
                },
                active: 'map',
              });

              setIsPlaying(v);
            }}
          />
          <RepeatButton
            style={{width: 30, height: 30}}
            onRepeat={() => {
              // sendCommand({
              //   name: regionName
              //     ? `${regionName}.mp4`
              //     : '数字沙盘先导片v14.mp4',
              //   command: 'resume_play',
              //   module: 'map',
              // });
              setIsPlaying(true);
              updateAppStatus({
                ...status,
                map: {
                  isPlaying: true,
                  command: 'resume_play',
                  regionName,
                  name:
                    regionName !== '无'
                      ? `${regionName}.mp4`
                      : '数字沙盘先导片v14.mp4',
                },
                active: 'map',
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
