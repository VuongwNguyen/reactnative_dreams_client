import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../styles';
import {logout as logoutAction} from '../store/slices/AuthSlice';
import {useSocket} from '../contexts/SocketContext';
import AxiosInstance from '../configs/axiosInstance';
import {parseJwt} from '../utils/token';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutRef = createRef();

const {width} = Dimensions.get('window');

const LogoutDialog = (
  {message = 'Login session has expired, please log in again'},
  ref,
) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [mess, setMess] = useState(message);
  const {socket} = useSocket();
  const {token} = useSelector(state => state.account);

  useImperativeHandle(
    ref,
    () => {
      return {
        showDialog: () => setShow(true),
        setMessage: message => setMess(message),
      };
    },
    [setShow, setMess],
  );

  const logout = () => {
    socket?.disconnect();
    dispatch(logoutAction());
    messaging().deleteToken();
    AxiosInstance().post('/account/revoke-fcm', {
      user_id: parseJwt(token.accessToken)?.user_id,
    });
    AsyncStorage.removeItem('credentials');
    setShow(false);
  };

  return (
    show && (
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>{mess}</Text>
          <TouchableOpacity onPress={logout} style={styles.logout}>
            <Text style={styles.textBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

export default forwardRef(LogoutDialog);

const styles = StyleSheet.create({
  textBtn: {
    color: Colors.primary,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  logout: {
    alignSelf: 'flex-end',
  },
  modal: {
    width: width * 0.7,
    height: 'auto',
    aspectRatio: 2,
    backgroundColor: 'white',
    padding: 20,
    elevation: 10,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(60, 60, 60, 0.1)',
  },
});
