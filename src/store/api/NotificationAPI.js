import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APIGetNotification = createAsyncThunk(
  'notification/get-notification',
  async ({_limit = 10, _page, type = 'all'}, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/notify/notifications?_limit=${_limit}&_page=${_page}&type=${type}`,
      );
      return response;
    } catch (error) {
      return console.log(error);
    }
  },
);
