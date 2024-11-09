import {io} from 'socket.io-client';

const BASE_URL =
  'https://4800-2402-800-637d-9a2f-956c-9b52-b6e3-ad95.ngrok-free.app';

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
