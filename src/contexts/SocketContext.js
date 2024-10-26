import {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import SocketIO from '../configs/socket';

const SocketContext = createContext({});

const URL = 'http://192.168.1.24:8012/';

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {token, authenticated} = useSelector(state => state.account);

  useEffect(() => {
    if (!authenticated) return;

    const socketInstance = new SocketIO(token.accessToken).socket;

    setSocket(socketInstance);

    return () => {
      socketInstance?.close();
    };
  }, [token, authenticated]);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
