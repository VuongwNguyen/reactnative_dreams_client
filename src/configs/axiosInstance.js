import axios from 'axios';
import {store} from '../store';
import {updateTokens} from '../store/slices';
import {logoutRef} from '../components/LogoutDialog';
import {logout as logoutAction} from '../store/slices/AuthSlice';
import {alertRef} from '../components/dialog/AlertDialog';
import messaging from '@react-native-firebase/messaging';
import {parseJwt} from '../utils/token';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASEURL = 'https://dreams-server-bmd-4sx0.onrender.com/api';

let isRefreshing = false;
let queue = [];

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 60000,
  });

  const processQueue = (err, accessToken) => {
    queue.forEach(request => {
      if (err) {
        request.reject(err);
      } else {
        request.resolve(accessToken);
      }
    });

    queue = [];
  };

  const addRequest = originRequest => {
    return new Promise((resolve, reject) => {
      queue.push({resolve, reject});
    })
      .then(token => {
        originRequest.headers.authorization = `Bearer ${token}`;
        return axiosInstance(originRequest);
      })
      .catch(err => console.log('error: ', err));
  };

  axiosInstance.interceptors.request.use(
    async config => {
      let token;
      if (store.getState().account.token.accessToken) {
        token = store.getState().account.token.accessToken;
      }

      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    err => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    res => res.data,
    async err => {
      if (!err?.response || !err?.response?.data)
        return await Promise.reject(err);

      if (err?.response?.status === 403) {
        alertRef.current?.alert(
          'Thông báo',
          'Bạn đã bị khóa tài khoản, vui lòng liên hệ với quản trị viên',
          {
            resolve: {
              text: 'Đồng ý',
              onPress: () => {
                const {token} = store.getState().account;
                store.dispatch(logoutAction());
                messaging().deleteToken();
                if (token?.accessToken) {
                  AxiosInstance().post('/account/revoke-fcm', {
                    user_id: parseJwt(token.accessToken)?.user_id,
                  });
                }

                AsyncStorage.removeItem('credentials');
              },
            },
          },
        );
      }

      const refreshToken = store.getState().account.token.refreshToken;
      const originRequest = err.config;

      if (
        err.response?.status === 401 &&
        err.response?.data?.message !== 'jwt expired'
      ) {
        // logout
        logoutRef.current?.showDialog();
      }

      if (
        err.response.status === 401 &&
        err.response.data.message === 'jwt expired'
      ) {
        if (isRefreshing) {
          return addRequest(originRequest);
        }

        isRefreshing = true;

        try {
          const res = await axiosInstance.post('/account/renew-tokens', {
            refreshToken,
          });

          if (res) {
            const payload = {
              accessToken: res.data.token.accessToken,
              refreshToken: res.data.token.refreshToken,
            };

            store.dispatch(updateTokens(payload));
            processQueue(null, res.data.token.accessToken);
            originRequest.headers.authorization = `Bearer ${res.data.token.accessToken}`;
            return await axiosInstance(originRequest);
          }
        } catch (e) {
          processQueue(e, null);
          if (e.response.data.status === 401) {
            logoutRef.current?.showDialog();
            return;
          }
        } finally {
          isRefreshing = false;
        }
      }

      return await Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default AxiosInstance;
