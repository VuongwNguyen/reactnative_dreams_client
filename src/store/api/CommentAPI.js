import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APICreateComment = createAsyncThunk(
  'comment/create-comment',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance('multipart/form-data').post(
        '/comment/create-comment',
        formData,
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetChildComment = createAsyncThunk(
  '/comment/child-comments?comment_id',
  async (comment_id, page = 1, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/comment/child-comments?comment_id=${comment_id}&page=${page}&_limit=10`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
