import {io} from 'socket.io-client';

const BASE_URL = 'http://192.168.1.10:8012';

class SocketIO {
  constructor(token) {
    this.socket = io(BASE_URL, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionAttempts: 1000,
    });
  }
}

export default SocketIO;
