import {createSlice} from '@reduxjs/toolkit';
import {
  APIAuthGithub,
  APIAuthThirdPartner,
  APILogin,
  APILogout,
} from '../api/AccountAPI';

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    token: {
      accessToken: null,
      refreshToken: null,
    },
    authenticated: false,
    loading: false,
    error: false,
    ggSigninLoading: false,
  },
  reducers: {
    updateTokens: (state, action) => {
      state.token.accessToken = action.payload.accessToken;
      state.token.refreshToken = action.payload.refreshToken;
    },
    logout: (state, _) => {
      state.token.accessToken = null;
      state.token.refreshToken = null;
      state.authenticated = false;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(APILogin.pending, (state, _) => {
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
      .addCase(APILogin.rejected, (state, _) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(APILogout.pending, (state, _) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(APILogout.fulfilled, (state, _) => {
        state.loading = false;
        state.ggSigninLoading = false;
        state.error = false;
        state.authenticated = false;
        state.token.accessToken = null;
        state.token.refreshToken = null;
      })
      .addCase(APILogout.rejected, (state, _) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(APIAuthThirdPartner.pending, (state, _) => {
        state.ggSigninLoading = true;
      })
      .addCase(APIAuthThirdPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.token.accessToken = action.payload.data.accessToken;
        state.token.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(APIAuthThirdPartner.rejected, (state, _) => {
        state.ggSigninLoading = false;
      })
      .addCase(APIAuthGithub.pending, (state, _) => {
        state.ggSigninLoading = true;
      })
      .addCase(APIAuthGithub.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = true;
        state.token.accessToken = action.payload.data.accessToken;
        state.token.refreshToken = action.payload.data.refreshToken;
      })
      .addCase(APIAuthGithub.rejected, (state, _) => {
        state.ggSigninLoading = false;
      });
  },
});

export const {updateTokens, logout} = accountSlice.actions;
