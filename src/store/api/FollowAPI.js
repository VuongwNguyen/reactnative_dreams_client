import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APIGetFollowing = createAsyncThunk(
  'follow/get-followings',
  async ({ user_id_view, page = 1, limit = 15 }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance().get(
        `/follow/get-followings?user_id_view=${user_id_view}&_page=${page}&_limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIToggleFollow = createAsyncThunk(
  'follow/toggle-follow',
  async (body, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance().post(
        '/follow/toggle-follow',
        body,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetFollowers = createAsyncThunk(
  'follow/get-followers',
  async ({ user_id_view, page }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance().get(
        `/follow/get-followers?user_id_view=${user_id_view}&_page=${page}&_limit=15`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
