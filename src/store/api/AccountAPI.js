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

export const APIRegister = createAsyncThunk(
  'account/register',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('account/register', data);
      console.log(response, 'register response');
      return response;
    } catch (error) {
      console.log('register error');

      return rejectWithValue(error.response.data);
    }
  },
);