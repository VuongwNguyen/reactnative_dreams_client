import {io} from 'socket.io-client';

const BASE_URL =
  'https://94a3-2402-800-637d-9a2f-d5b7-539e-35a0-c598.ngrok-free.app';

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
