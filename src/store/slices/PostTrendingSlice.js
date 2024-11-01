import { createSlice } from '@reduxjs/toolkit';
import { APIGetPostsTrending } from '../api/PostAPI';

export const postTrendingSlice = createSlice({
  name: 'postTrending',
  initialState: {
    data: {},
    loading: true,
    isPostCreated: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostCreated: (state) => {
      state.isPostCreated = true; // Đặt lại trạng thái khi đã tạo bài viết
    },
    resetPostCreated: (state) => {
      state.isPostCreated = false; // Đặt lại trạng thái khi đã xử lý
    }
  },
  extraReducers: builder => {
    builder.addCase(APIGetPostsTrending.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
  },
});

export const { setPostCreated, resetPostCreated } = postTrendingSlice.actions;
