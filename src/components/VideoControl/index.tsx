import {Image, TouchableOpacity} from 'react-native';

export default (props: {
  style: any;
  onChange: (isPlaying: boolean) => void;
  isPlaying: boolean;
}) => {
  const {style, onChange, isPlaying = false} = props;
  const hanlePress = () => {
    onChange && onChange(!isPlaying);
  };
  return (
    <TouchableOpacity style={style} onPress={hanlePress}>
      {isPlaying ? (
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/icons/pause.png')}
          resizeMode="contain"
        />
      ) : (
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/icons/play.png')}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};
