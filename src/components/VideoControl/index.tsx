import {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export default (props: {
  style: any;
  onChange: (isPlaying: boolean) => void;
}) => {
  const {style, onChange} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const hanlePress = () => {
    setIsPlaying(old => !old);
    onChange && onChange(!isPlaying);
  };
  return (
    <TouchableOpacity style={style} onPress={hanlePress}>
      {isPlaying ? (
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/pause.png')}
        />
      ) : (
        <Image  style={{width: '100%', height: '100%'}} source={require('../../assets/play.png')} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
