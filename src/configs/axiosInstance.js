import axios from 'axios';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    // baseURL: 'https://15fe-115-77-154-145.ngrok-free.app/api',
    baseURL: 'https://21e7-2402-800-637d-6a14-50ff-c9d3-8dfb-7275.ngrok-free.app/api',
  });
  axiosInstance.interceptors.request.use(
    async config => {
      // const token = localStorage.getItem("token");
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZlOTkwNjY0OGRlMDY3ZWIyNmIwZDMzIiwiaWF0IjoxNzI4OTEyNjMxLCJleHAiOjE3Mjg5OTkwMzF9.VcxOTr9yBNGIonzC8T8X5KH5e_F9ZPz21FKqGglW9yQ';
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
