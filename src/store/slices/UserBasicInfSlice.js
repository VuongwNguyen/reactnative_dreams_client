import {createSlice} from '@reduxjs/toolkit';
import {APIGetUserBasicInf} from '../api/AccountAPI';

export const userBasicInfSlice = createSlice({
  name: 'userBasicInf',
  initialState: {
    userBasicInfData: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(APIGetUserBasicInf.fulfilled, (state, action) => {
      state.userBasicInfData = action.payload.data;
    });
  },
});
