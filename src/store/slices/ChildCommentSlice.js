import {createSlice} from '@reduxjs/toolkit';

export const childCommentSlice = createSlice({
  name: 'childComment',
  initialState: {
    data: [],
    loading: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPushChildComment: (state, action) => {      
      state.data = [...state.data, action.payload];
    },
  }
});
