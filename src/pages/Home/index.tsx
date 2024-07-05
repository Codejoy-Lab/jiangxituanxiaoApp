import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Map from '../Map';
import Movie from '../Movie';
import Screen from '../Screen';
export default () => {
  const list = [{title: '光雕投影'}, {title: '滑轨屏'}, {title: 'Cave影片'}];
  const [activeModule, setActiveModule] = useState({title: '光雕投影'});
  const {width, height} = Dimensions.get('screen');
  const [renderKey, setRnederKey] = useState(Math.random());
  const [isLandScape, setIsLandScape] = useState(width > height);
  console.log(renderKey);

  // 监听屏幕方向变化
  useEffect(() => {
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
        {activeModule.title == '光雕投影' ? (
          <Map isLandScape={isLandScape} />
        ) : null}
        {activeModule.title == '滑轨屏' ? <Screen /> : null}
        {activeModule.title == 'Cave影片' ? <Movie /> : null}
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
                setActiveModule(item);
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      activeModule.title === item.title ? '#1677ff' : '#000',
                    fontSize: Dimensions.get('screen').height * 0.02,
                    fontWeight:
                      activeModule.title === item.title ? 'bold' : '500',
                    marginBottom: activeModule.title === item.title ? 20 : 0,
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
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
  },
  content: {},
  bottomBar: {
    backgroundColor: '#fff',
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
