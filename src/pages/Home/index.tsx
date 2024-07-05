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
            height: Dimensions.get('screen').height - 100,
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
            height: 100,
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
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  },
  text: {
    color: '#000',
  },
});
