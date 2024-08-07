import axios from 'axios';
import Config from 'react-native-config';

const req = axios.create({
  baseURL: Config.APP_API,
});

export default req;
