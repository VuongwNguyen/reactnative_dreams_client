import axios from 'axios';
import {store} from '../store';
import {updateTokens} from '../store/slices';
import {logoutRef} from '../components/LogoutDialog';

const BASEURL = 'http://192.168.1.24:8012/api/';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: BASEURL,
  });
  axiosInstance.interceptors.request.use(
    config => {
      let token;
      if (store.getState().account.token.accessToken) {
        token = store.getState().account.token.accessToken;
      }
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
        security: 'secure_code',
      };
      return config;
    },
    err => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    res => res.data,
    async err => {
      console.log(err);
      if (!err.response || !err.response.data) return await Promise.reject(err);

      const refreshToken = store.getState().account.token.refreshToken;
      const originRequest = err.config;

      if (
        !refreshToken ||
        (err.response.status === 401 &&
          err.response.data.message !== 'jwt expired')
      ) {
        // logout
        logoutRef.current?.showDialog();
      }

      if (
        err.response.status === 401 &&
        err.response.data.message === 'jwt expired'
      ) {
        try {
          const res = await axiosInstance.post('/account/renew-tokens', {
            refreshToken,
          });

          if (res) {
            const payload = {
              accessToken: res.data.token.accessToken,
              refreshToken: res.data.token.refreshToken,
            };

            console.log('renew token');

            store.dispatch(updateTokens(payload));
            originRequest.headers.authorization = `Bearer ${res.data.token.accessToken}`;
            return await axiosInstance(originRequest);
          }

          throw new Error('cannot renew tokens');
        } catch (error) {
          // logout
          console.log('error when renew tokens', error.response.data);
          logoutRef.current?.showDialog();
        }
      }

      return await Promise.reject(err);
    },
  );

  return axiosInstance;
};
export default AxiosInstance;
