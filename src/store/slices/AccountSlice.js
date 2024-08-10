import { createSlice } from '@reduxjs/toolkit';
import { APILogin } from '../api/AccountAPI';
import { apiSendOtpResetPW } from '../api/AccountAPI';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    token: '',
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(APILogin.pending, (state) => {
      console.log('APILogin.pending');
    });
    builder.addCase(APILogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(APILogin.rejected, (state, action) => {
      console.log('APILogin.rejected', action.error);
    });
  },
});
