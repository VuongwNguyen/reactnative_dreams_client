import {createSlice} from '@reduxjs/toolkit';
import { APIGetPostsTrending } from '../api/PostAPI';

export const postTrendingSlice = createSlice({
  name: 'postTrending',
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
    builder.addCase(APIGetPostsTrending.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
  },
});
