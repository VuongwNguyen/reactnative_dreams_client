import {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SocketIO from '../configs/socket';
import {
  deleteMember,
  deleteRoom,
  rename,
  updateMember,
  updateOfflineUser,
  updateOnlineUser,
  updateRoom,
  updateRoomName,
} from '../store/slices';
import {parseJwt} from '../utils/token';
import {ToastAndroid} from 'react-native';

const SocketContext = createContext({});

export const SocketProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const {token, authenticated} = useSelector(state => state.account);
  const {room} = useSelector(state => state.chatMessage);
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

    const userId = parseJwt(token.accessToken)?.user_id;

    socket.on('update-room', (message, room) => {
      dispatch(
        updateRoom({
          message,
          room,
          userId,
        }),
      );
    });

    socket.on('user-online', info => {
      dispatch(updateOnlineUser(info?.user_id));
    });

    socket.on('user-disconnect', info => {
      dispatch(updateOfflineUser(info?.user_id));
    });

    socket.on('delete-room', (roomId, name) => {
      dispatch(deleteRoom(roomId));
      if (roomId !== room._id) {
        ToastAndroid.show(` Nhóm ${name} đã bị giải tán`, 1000);
      }
    });

    socket.on('remove-member', (roomId, memberId, name) => {
      if (room._id) {
        dispatch(
          updateMember({
            roomId,
            userId: memberId,
          }),
        );
      }

      if (userId === memberId) {
        dispatch(deleteRoom(roomId));
        if (roomId !== room._id) {
          ToastAndroid.show(`Bạn vừa bị xóa khỏi nhóm ${name}`, 1000);
        }
      }

      dispatch(deleteMember({roomId, memberId}));
    });

    socket.on('update-room-name', (roomId, name) => {
      if (room._id) {
        dispatch(rename({roomId, name}));
      }
      dispatch(updateRoomName({roomId, name}));
    });

    return () => {
      socket.off('update-room');
      socket.off('user-online');
      socket.off('user-disconnect');
      socket.off('delete-room');
      socket.off('remove-member');
      socket.off('update-room-name');
    };
  }, [socket, token, room]);

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
