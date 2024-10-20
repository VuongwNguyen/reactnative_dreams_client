import {createContext, useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const SocketContext = createContext({});

const URL = 'http://192.168.1.24:8012/';

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (socket) return;

    // create new socket connection
    const newConnection = io(URL, {
      reconnection: true,
      retries: 10,
      auth: {
        token: '',
      },
    });

    setSocket(newConnection);

    return () => {
      socket?.disconnect();
      setSocket(null);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    // listen event
  }, [socket]);

  return (
    <SocketContext.Provider value={{socket, usersOnline, rooms}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
