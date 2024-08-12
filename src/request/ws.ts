import Config from 'react-native-config';
let timeId: any = '';
export const initWS = (handleMessage: {
  (message: any): void;
  (arg0: WebSocketMessageEvent): void;
}) => {
  let socket = new WebSocket(Config.APP_WS_API);
  socket.onopen = () => console.log('WebSocket Connected');

  socket.onmessage = message => {
    console.log('message---------type', typeof message);

    handleMessage(message.data);
  };

  socket.onclose = () => {
    console.log('WebSocket Disconnected');
    console.log('is reconnecting');

    timeId = setInterval(() => {
      if (socket) {
        clearInterval(timeId);
        return;
      }
      socket = new WebSocket(Config.APP_WS_API);
    }, 1000);
  };
};
