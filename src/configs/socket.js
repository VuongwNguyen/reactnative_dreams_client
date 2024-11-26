import {io} from 'socket.io-client';

const BASE_URL = 'https://dreams-server-bmd-4sx0.onrender.com';


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
