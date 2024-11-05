import {io} from 'socket.io-client';

const BASE_URL =
  'https://a2f5-2402-800-637c-9e22-c0db-d808-83b1-f64b.ngrok-free.app';

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
