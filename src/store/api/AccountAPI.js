import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APILogin = createAsyncThunk(
  'account/login',
  async (data, {rejectWithValue}) => {
    console.log(data);
    try {
      const response = await AxiosInstance().post('/account/login', data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const APIVerifyAccount = createAsyncThunk(
  'account/send-verify-code',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/account/send-verify-code',
        data,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const APISendOtpCode = createAsyncThunk(
  'account/verify-email',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('account/verify-email', data);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const apiSendOtpResetPW = createAsyncThunk(
  'account/send-code-reset-password',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/account/verify-email',
        data,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const apiVerifyCodeResetPW = createAsyncThunk(
  'account/verify-code-reset-password',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/account/verify-code-reset-password',
        data,
      );
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APIRegister = createAsyncThunk(
  'account/register',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('/account/register', data);
      console.log(response, 'register response');
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APIResetPassword = createAsyncThunk(
  'account/reset-password',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/account/reset-password',
        data,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APIChangePassword = createAsyncThunk(
  'account/change-password',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/account/change-password',
        data,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APILogout = createAsyncThunk(
  'account/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('/account/logout');
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APIGetUserBasicInf = createAsyncThunk(
  'account/get-info',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get('/account/get-info');
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);
