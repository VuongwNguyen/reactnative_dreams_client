import {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';

const SocketContext = createContext({});

const URL = 'http://192.168.1.24:8012/';

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [usersOnline, setUsersOnline] = useState([]);
  const [rooms, setRooms] = useState([]);
  const {token, authenticated} = useSelector(state => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) return;
    // create new socket connection
    const newConnection = io(URL, {
      reconnection: true,
      retries: 10,
      auth: {
        token: token.accessToken,
      },
    });

    setSocket(newConnection);

    return () => {
      console.log('disconnect');
      newConnection?.disconnect();
      setSocket(null);
    };
  }, [token, authenticated]);

  return (
    <SocketContext.Provider value={{socket, usersOnline, rooms}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
