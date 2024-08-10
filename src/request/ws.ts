import Config from 'react-native-config';

export const initWS = (handleMessage: {
  (message: any): void;
  (arg0: WebSocketMessageEvent): void;
}) => {
  const socket = new WebSocket(Config.APP_WS_API);
  socket.onopen = () => console.log('WebSocket Connected');

  socket.onmessage = message => {
    console.log('message---------type', typeof message);

    handleMessage(message.data);
  };

  socket.onclose = () => console.log('WebSocket Disconnected');
};
