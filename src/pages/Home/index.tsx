import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default () => {
  console.log('init');
  
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'http://192.168.44.98:5173/map'}}
        style={styles.container}></WebView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'red',
  },
});
