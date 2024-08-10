import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

const APILogin = createAsyncThunk(
  'account/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('account/login', data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const APIResetPassword = createAsyncThunk(
  'account/reset-password',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        'account/reset-password',
        data,
      );
      return response;
    } catch (error) {
      console.log(rejectWithValue(error.response.data));
      return rejectWithValue(error.response.data);
    }
  },
);
export {APILogin, APIResetPassword};
