import React from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import Config from "react-native-config";

export default () => {
  console.log('init');
  console.log('config',Config.WebView_URl);
  
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
          uri: Config.WebView_URl,
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
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
  },
});
