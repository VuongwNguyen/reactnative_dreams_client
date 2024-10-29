import {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SocketIO from '../configs/socket';
import {updateOfflineUser, updateOnlineUser, updateRoom} from '../store/slices';

const SocketContext = createContext({});

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {token, authenticated} = useSelector(state => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) return;

    const socketInstance = new SocketIO(token.accessToken).socket;

    setSocket(socketInstance);

    return () => {
      socketInstance?.close();
    };
  }, [token, authenticated]);

  useEffect(() => {
    if (!socket) return;

    socket.on('update-room', (message, room) => {
      dispatch(updateRoom({message, room}));
    });

    socket.on('user-online', info => {
      dispatch(updateOnlineUser(info?.user_id));
    });

    socket.on('user-disconnect', info => {
      dispatch(updateOfflineUser(info?.user_id));
    });

    return () => {
      console.log('unregisted');
      socket.off('update-room');
      socket.off('user-online');
      socket.off('user-disconnect');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
