import axios from 'axios';
import {store} from '../store';

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
    err => Promise.reject(err),
  );

  return axiosInstance;
};
export default AxiosInstance;
