import axios from 'axios';

const baseURL = 'http://example.com';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error);
  },
);
