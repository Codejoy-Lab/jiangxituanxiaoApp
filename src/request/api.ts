import req from './index';

export const sendCommand = async (param: any) => {
  return req.post('/command', param);
};
export const getCurrentRegionName = async () => {
  return req.get('/getCurrentRegionName');
};
