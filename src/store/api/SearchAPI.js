import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../configs/axiosInstance";

export const APISearch = createAsyncThunk(
  'search',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/search?keyword=${data}&_limit=20&_page=1`,
      );
      return response;
    } catch (error) {      
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APISearchHashtag = createAsyncThunk(
  'search/search-hashtag',
  async (data, {rejectWithValue}) => {
    try {
      console.log('data', data);
      
      const response = await AxiosInstance().get(
        `search/search-hashtag?keyword=${data}&_page&_limit`,
      );
      return response;
    } catch (error) {      
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const APISearchPost = createAsyncThunk(
  'search/search-post',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get(
        `/search/search-post?keyword=${data}&_limit=20&_page=1`,
      );
      return response;
    } catch (error) {      
      return rejectWithValue(error?.response?.data);
    }
  },
);