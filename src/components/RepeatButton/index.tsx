import {} from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default (props: {style: any; onRepeat: () => void}) => {
  const {style, onRepeat} = props;
  const hanlePress = () => {
    onRepeat && onRepeat();
  };
  return (
    <TouchableOpacity style={style} onPress={hanlePress}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/icons/repeat.png')}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
