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
        `/post/get-post-detail?post_id=${post_id}`,
      );      
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetPostByUser = createAsyncThunk(
  'post/get-post-by-user',
  async (user_id, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/post/get-post-by-user?_page=1&_limit=10`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APIGetPostsTrending = createAsyncThunk(
  'post/get-posts-trending',
  async (page, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/post/trending-posts`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
)

export const APIFollowingPost = createAsyncThunk(
  'post/following-posts',
  async (page, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/post/trending-posts`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APISetPostViewd = createAsyncThunk(
  'post/set-post-viewed',
  async (post_id, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post('/post/set-post-viewed', {
        post_id: post_id,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const APICountViewPost = createAsyncThunk(
  'post/count-view-post',
  async (post_id, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(`/post/count-view-post`, {
        post_id,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
