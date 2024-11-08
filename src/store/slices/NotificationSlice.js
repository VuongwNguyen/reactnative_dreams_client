// Updated slice
import {createSlice, current} from '@reduxjs/toolkit';
import {APIGetNotification} from '../api/NotificationAPI';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    page: {
      max: 0,
      prev: false,
      limit: 10,
      next: false,
      current: 1,
    },
    loading: false,
    reload: false,
    err: null,
  },
  reducers: {
    
  },
  extraReducers: builder => {
    builder
      .addCase(APIGetNotification.pending, state => {
        state.loading = true;
        state.err = null;
        state.reload = state.page.current === 1 ? true : false;
      })
      .addCase(APIGetNotification.fulfilled, (state, action) => {
        const {maxPage, currentPage, limit, hasNext, hasPrevious} =
          action.payload.data.page;
        const newData = action.payload.data.data;

        state.notifications =
          currentPage === 1 ? newData : [...state.notifications, ...newData];
        state.page = {
          max: maxPage,
          prev: hasPrevious,
          limit: limit,
          next: hasNext,
          current: currentPage,
        };
        state.loading = false;
        state.reload = false;
      })
      .addCase(APIGetNotification.rejected, (state, action) => {
        state.loading = false;
        state.reload = false;
        state.err = 'Error loading notifications'; // Better error message
      });
  },
});


// Updated store

