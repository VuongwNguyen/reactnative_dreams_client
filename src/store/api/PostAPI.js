import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APICreatePost = createAsyncThunk(
  'post/create-post',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance('multipart/form-data').post(
        '/post/create-post',
        formData,
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetPostDetail = createAsyncThunk(
  'post/get-post-detail',
  async (post_id, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `post/get-post-detail?post_id=${post_id}`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
