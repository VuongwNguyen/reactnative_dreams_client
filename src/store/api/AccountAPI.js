import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APILogin = createAsyncThunk(
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

