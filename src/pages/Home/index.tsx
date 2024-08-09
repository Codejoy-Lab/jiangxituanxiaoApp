/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
export default () => {
  const list = [
    {title: '数字沙盘', image: require('../../assets/icons/光雕投影.png')},
    {title: '滑轨屏', image: require('../../assets/icons/滑轨屏.png')},
    {title: 'CAVE空间', image: require('../../assets/icons/cave影片.png')},
  ];
  const [activeModule, setActiveModule] = useState({title: '数字沙盘'});
  const {width, height} = Dimensions.get('screen');
  const [renderKey, setRnederKey] = useState(Math.random());
  const [isLandScape, setIsLandScape] = useState(width > height);
  const [status, setStatus] = useState({
    map: {
      regionName: '无',
      isPlaying: false,
    },
    screen: {
      isPlaying: false,
    },
    cave: {
      selected: '',
      isPlaying: false,
    },
  });
  console.log(renderKey);
  const updateStatus = async () => {
    getStatus().then(res => {
      console.log(res.data);
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
          styles.content,
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
