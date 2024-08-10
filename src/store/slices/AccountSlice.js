import {createSlice} from '@reduxjs/toolkit';
import {APILogin, APIResetPassword} from '../api/AccountAPI';

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
  extraReducers: builder => {
    builder.addCase(APILogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
  },
});

// resetPassword Reducer
export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    resetPasswordState: '',
    resetPasswordData: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(APIResetPassword.pending, (state, action) => {
        state.resetPasswordState = 'loading';
      })
      .addCase(APIResetPassword.fulfilled, (state, action) => {
        state.resetPasswordState = 'succeeded';
        state.resetPasswordData = action.payload.resetPasswordData;
      })
      .addCase(APIResetPassword.rejected, (state, action) => {
        state.resetPasswordState = 'failed';
        console.log(action.error.message);
      });
  },
});
