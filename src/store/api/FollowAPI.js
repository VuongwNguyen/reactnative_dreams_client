import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APIGetFollowing = createAsyncThunk(
  'follow/get-followings',
  async (user_id, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/follow/get-followings?user_id=${user_id}`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);


export const APIToggleFollow = createAsyncThunk(
  'follow/toggle-follow',
  async (body, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/follow/toggle-follow',body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);