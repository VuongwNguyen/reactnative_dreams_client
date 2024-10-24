import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APIPersonalDetailInf = createAsyncThunk(
  'infomation/get-infomation-by-self-setting',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/infomation/get-infomation-by-self-setting`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetInf = createAsyncThunk(
  'infomation/get-infomation',
  async (user_id_view = '', {rejectWithValue}) => {
    try {
      const query = new URLSearchParams({
        ...(user_id_view && {user_id_view}),
      }).toString();

      const response = await AxiosInstance().get(
        `/infomation/get-infomation?${query}`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetInfList = createAsyncThunk(
  'infomation/get-infomation-list',
  async (user_id_view = '', {rejectWithValue}) => {
    try {
      const query = new URLSearchParams({
        ...(user_id_view && {user_id_view}),
      }).toString();

      const response = await AxiosInstance().get(
        `/infomation/get-infomation-list?${query}`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const APIUpdateInf = createAsyncThunk(
  'infomation/up-sert-infomation',
  async (body, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/infomation/up-sert-infomation',
        body,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
