import {io} from 'socket.io-client';

const BASE_URL =
  'https://7443-2402-800-637c-9e22-e492-864e-ab15-1631.ngrok-free.app';
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
