import {createSlice} from '@reduxjs/toolkit';
import { APIGetPostDetail } from '../api/PostAPI';

export const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: {
    data: {},
    loading: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(APIGetPostDetail.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
  },
});
