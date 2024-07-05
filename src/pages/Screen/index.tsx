import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import VideoControl from '../../components/VideoControl';
import RepeatButton from '../../components/RepeatButton';
export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}></View>
      <View style={styles.controlRow}>
        <VideoControl onChange={v => {}} style={{width: 50, height: 50}} />
        <RepeatButton onRepeat={() => {}} style={{width: 50, height: 50}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '2%',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  content: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  controlRow: {
    width: '100%',
    height: '15%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
