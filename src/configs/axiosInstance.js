import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    // baseURL: 'https://15fe-115-77-154-145.ngrok-free.app/api',
    baseURL: 'http://192.168.1.11:8012/api',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      // const token = localStorage.getItem("token");
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcwOGM2M2FmMmYwZDhiNzJhNTkxZDU1IiwiaWF0IjoxNzI4NjI4NTc4LCJleHAiOjE3Mjg2MzU3Nzh9.Wpao89hqK9qJFaIuxw3PqXTBMfJ_ynH6cMJFYl39S8U';
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
    err => {
      console.log(err.response.data);

      return err.response.data;
    },
  );

  return axiosInstance;
};
export default AxiosInstance;
