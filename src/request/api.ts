import req from './index';

export const sendCommand = async (param: any) => {
  return req.post('/command', param);
};
export const getCurrentRegionName = async () => {
  return req.get('/getCurrentRegionName');
};
export const getStatus = async () => {
  return req.get('/getStatus');
};
export const updateAppStatus = async (param: any) => {
  return req.post('/updateStatus', param);
};
export const getPoint = async () => {
  return req.get('/getPoint');
};
