/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Map from '../Map';
import Movie from '../Cave';
import Screen from '../Screen';
import {getStatus} from '../../request/api';
// import {initWS} from '../../request/ws';
import Config from 'react-native-config';
let timeId: any = '';
export default () => {
  const list = [
    {title: '数字沙盘', image: require('../../assets/icons/光雕投影.png')},
    {title: '滑轨屏', image: require('../../assets/icons/滑轨屏.png')},
    {title: 'CAVE空间', image: require('../../assets/icons/cave影片.png')},
  ];

  const wsRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeModule, setActiveModule] = useState({title: '数字沙盘'});
  const {width, height} = Dimensions.get('screen');
  const [renderKey, setRnederKey] = useState(Math.random());
  const [isLandScape, setIsLandScape] = useState(width > height);
  const [status, setStatus] = useState({
    map: {
      regionName: '无',
      isPlaying: false,
      command: 'stop_play',
    },
    screen: {
      isPlaying: false,
      command: 'stop_play',
    },
    cave: {
      selected: {},
      isPlaying: false,
      command: 'stop_play',
    },
  });
  console.log(renderKey);
  const connect = () => {
    // if (isConnected) {
    //   return;
    // }
    timeId = setInterval(() => {
      console.log('1111111111');
      console.log(wsRef.current);

      if (!wsRef.current) {
        // 如果socket不存在，则创建一个新的WebSocket实例
        const ws = new WebSocket(Config.APP_WS_API);
        console.log('ws', ws);
        wsRef.current = ws;

        wsRef.current.onopen = () => {
          console.log('Reconnected successfully.');
          setIsConnected(true);
          clearInterval(timeId);
        };
        wsRef.current.onclose = () => {
          wsRef.current = null;
          setIsConnected(false);
          console.log(' reconnect ');
          // connect();
          // setRnederKey(Math.random());
        };
        wsRef.current.onmessage = (event: WebSocketMessageEvent) => {
          const {data} = event;
          handleMessage(data);
        };
        wsRef.current.onerror = () => {
          wsRef.current = null;
          // setRnederKey(Math.random());
          setIsConnected(false);
          console.log(' reconnect ');
          // connect();
        };
      }
    }, 1000);
  };

  useEffect(() => {
    connect();
    return () => {
      // 清理操作
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);
  const updateStatus = async () => {
    getStatus().then(res => {
      console.log('init-----', res.data);
      if (res?.data) {
        //  const {map, cave, screen} = res.data;
        setStatus(res.data);
      }
    });
  };
  const handlePressTab = async (item: {title: string}) => {
    setActiveModule(item);
    updateStatus();
  };
  // 初始化
  useEffect(() => {
    updateStatus();
    const subscription = Dimensions.addEventListener('change', () => {
      const {width, height} = Dimensions.get('screen');
      setRnederKey(Math.random());
      setIsLandScape(width > height);
    });
    return () => subscription.remove();
  }, []);
  const handleMessage = (message: any) => {
    const data = JSON.parse(message);
    console.log('ws message', data, data.command);
    // 播放结束，通知客户端图标切换
    setStatus(data);
  };
  useEffect(() => {
    // initWS(handleMessage);
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        },
      ]}
      key={renderKey}>
      <View
        style={[
          {
            width: Dimensions.get('screen').width,
            height: '81%',
          },
        ]}>
        {activeModule.title == '数字沙盘' ? (
          <Map isLandScape={isLandScape} status={status} />
        ) : null}
        {activeModule.title == '滑轨屏' ? <Screen status={status} /> : null}
        {activeModule.title == 'CAVE空间' ? <Movie status={status} /> : null}
      </View>
      <View
        style={[
          styles.bottomBar,
          {
            width: Dimensions.get('screen').width,
            height: '15%',
          },
        ]}>
        {list.map(item => {
          return (
            <TouchableOpacity
              key={item.title}
              style={styles.bar}
              onPress={() => {
                handlePressTab(item);
              }}>
              <Image
                style={{height: '60%', width: 60}}
                source={item.image}
                resizeMode="contain"
              />
              <Text
                style={[
                  {
                    marginLeft: 10,
                    color:
                      activeModule.title === item.title ? '#1677ff' : '#fff',
                    fontSize: Dimensions.get('screen').height * 0.02,
                    fontWeight:
                      activeModule.title === item.title ? 'bold' : '500',
                    // marginBottom: activeModule.title === item.title ? 20 : 0,
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  bottomBar: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },

  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    // color: '#000',
  },
});
