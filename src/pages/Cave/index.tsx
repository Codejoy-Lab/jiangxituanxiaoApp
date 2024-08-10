import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import VideoControl from '../../components/VideoControl';
import RepeatButton from '../../components/RepeatButton';
import {sendCommand, updateAppStatus} from '../../request/api';
import Config from 'react-native-config';
export default (props: {status: any}) => {
  const {status} = props;
  const [isPlaying, setIsPlaying] = useState(status.cave.isPlaying);
  const [selectedVideo, setSelectedVideo] = useState(status.cave.selected);
  useEffect(() => {
    setIsPlaying(status.cave.isPlaying);
    setSelectedVideo(status.cave.selected);
    if (status.cave.mark == 'done') {
      setIsPlaying(false);
    }
  }, [status]);
  const handleSelected = (item: any) => {
    setSelectedVideo(item);
    updateAppStatus({
      ...status,
      cave: {
        ...status.cave,
        selected: item,
      },
    });
  };
  const list = [
    {
      name: '永恒的财富',
    },
    {
      name: '蓝天之下',
    },
    {
      name: '从破坏者到守护者',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.list}>
          {list.map((item, i) => {
            const isSelected = selectedVideo.name == item.name;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.videoitem,
                  isSelected ? styles.selectedItem : {},
                ]}
                onPress={() => {
                  handleSelected(item);
                }}>
                <Text
                  style={[
                    styles.listText,
                    isSelected ? styles.selectedText : {},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.videoArea}>
          <Text></Text>
        </View>
        {/* <Image
          source={{uri: `${Config.APP_API}/images/滑轨屏.png`}}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        /> */}
      </View>
      <View style={styles.controlRow}>
        <VideoControl
          isPlaying={isPlaying}
          onChange={v => {
            updateAppStatus({
              ...status,
              cave: {
                isPlaying: v,
                selected: selectedVideo,
                command: v ? 'start_play' : 'stop_play',
                name: '滑轨屏v8.mp4',
              },
              active: 'cave',
            });
            setIsPlaying(v);
          }}
          style={{width: 50, height: 50}}
        />
        <RepeatButton
          onRepeat={() => {
            setIsPlaying(true);
            updateAppStatus({
              ...status,
              cave: {
                isPlaying: true,
                selected: selectedVideo,
                command: 'resume_play',
                name: '滑轨屏v8.mp4',
              },
              active: 'cave',
            });
          }}
          style={{width: 50, height: 50}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '2%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    height: '80%',
    // backgroundColor: '#1a1a1a',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: '#fff',
    alignItems: 'center',
  },
  controlRow: {
    width: '100%',
    height: '15%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  list: {
    width: '20%',
    height: '100%',
    backgroundColor: '#1a1a1a',

    borderRadius: 10,
    padding: '2%',
  },
  videoArea: {
    width: '50%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  videoitem: {
    height: 50,
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderRadius: 6,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#1677ff',
  },
  listText: {
    color: '#fff',
  },
  selectedText: {
    color: '#1677ff',
  },
});
