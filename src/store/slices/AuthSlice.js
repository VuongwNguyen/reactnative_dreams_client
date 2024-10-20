import {createSlice} from '@reduxjs/toolkit';
import {APILogin} from '../api/AccountAPI';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    token: {
      accessToken: '',
      refreshToken: '',
    },
    authenticated: false,
    loading: false,
    error: false,
  },
  reducers: {
    updateTokens: (state, action) => {
      state.token.accessToken = action.payload.data.accessToken;
      state.token.refreshToken = accountSlice.payload.data.refreshToken;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(APILogin.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(APILogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.authenticated = true;
        state.token.accessToken = action.payload.data.accessToken;
        state.token.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(APILogin.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});
