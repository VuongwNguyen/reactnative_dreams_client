import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    // baseURL: 'https://15fe-115-77-154-145.ngrok-free.app/api',
    baseURL: 'http://192.168.100.234:8012/api',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      // const token = localStorage.getItem("token");
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcwMTBlM2RhMmNlOWVkMmQxNzBiYTEzIiwiaWF0IjoxNzI5NTIxNjgzLCJleHAiOjE3Mjk2MDgwODN9.FZ-HqCr_TsNChKc9CUACuAlIpu7dy3eZqn86W51UgE4';
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
