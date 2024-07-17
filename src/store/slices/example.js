import {createSlice} from '@reduxjs/toolkit';

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    count: 0,
  },
  reducers: {
    inc: (state, action) => {
      state.count += 1;
    },
    dec: (state, action) => {
      state.count -= 1;
    },
    modify: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const exampleReducer = exampleSlice.reducer;
export const {inc, dec, modify} = exampleSlice.actions;
