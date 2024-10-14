import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APIFollowingPost = createAsyncThunk(
  'post/following-posts',
  async (page, {rejectWithValue}) => {    
    try {
      const response = await AxiosInstance().get(
        `/post/following-posts/${page}/3`,
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
    console.log(post_id);
    
    try {
      const response = await AxiosInstance().post('/post/set-post-viewed', {
        post_id: post_id,
      });

      console.log(response);
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
      const response = await AxiosInstance().post(
        `/post/count-view-post`,
        {post_id},
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);