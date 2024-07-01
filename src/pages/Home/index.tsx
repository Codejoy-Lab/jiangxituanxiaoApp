import React from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

export default () => {
  console.log('init');
  const handleMessage = (event: WebViewMessageEvent) => {
    console.log('1');
    const data = JSON.parse(event.nativeEvent.data);
    console.log('Received from H5:', data);
  };
  const injectedJS = `(function() {
    window.postMessage = function(data) {
     
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };
  })();`;
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'http://192.168.44.85:5174/videoMapControlPage/map',
        }}
        injectedJavaScript={injectedJS} // 注入JS，确保H5页面能使用postMessage
        onMessage={handleMessage} // 监听从H5发送过来的消息
        style={styles.container}
        originWhitelist={['*']}
        javaScriptEnabled={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
});
