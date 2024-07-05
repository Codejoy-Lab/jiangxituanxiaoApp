import {View, StyleSheet, Text} from 'react-native';
import MapEcharts from '../../components/MapEcharts';
import RepeatButton from '../../components/RepeatButton';
import VideoControl from '../../components/VideoControl';
import React, {useEffect} from 'react';

export default (props: {isLandScape: boolean}) => {
  const {isLandScape} = props;
 
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
        <MapEcharts />
      </View>
      <View
        style={[
          styles.option,
          {
            height: isLandScapeChangeValue('100%', '38%'),
            width: isLandScapeChangeValue('30%', '100%'),
          },
        ]}>
        <View style={[styles.video]}></View>
        <View style={styles.controlRow}>
          <VideoControl
            style={{width: 30, height: 30}}
            onChange={v => {}}></VideoControl>
          <RepeatButton
            style={{width: 30, height: 30}}
            onRepeat={() => {}}></RepeatButton>
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
    backgroundColor: '#e3e3e3',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
