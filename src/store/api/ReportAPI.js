import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

export const APISendReport = createAsyncThunk(
  'report-reason/report',
  async (body, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        '/report-reason/report',
        body,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
