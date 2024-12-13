import AxiosInstance from '../configs/axiosInstance';

function parseJwt(token) {
  // Tách JWT thành các phần bởi dấu '.'
  const base64Url = token?.split('.')[1];

  // Giải mã từ base64Url sang chuỗi JSON
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  // Trả về kết quả JSON
  return JSON.parse(jsonPayload);
}

async function streamTokenProvider() {
  const res = await AxiosInstance().post('/account/get-stream-token');

  return res.data;
}

export {parseJwt, streamTokenProvider};
