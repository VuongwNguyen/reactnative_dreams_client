import {io} from 'socket.io-client';

const BASE_URL =
  'https://91eb-2402-800-637c-9e22-54ac-eb16-37e5-b470.ngrok-free.app';

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
