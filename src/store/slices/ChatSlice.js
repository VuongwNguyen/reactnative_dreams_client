import {createSlice} from '@reduxjs/toolkit';
import {fetchFollowingUsers, fetchListRooms} from '../api/ChatAPI';

const usersOnlineSlice = createSlice({
  name: 'chat/usersOnline',
  initialState: {
    list: [],
    page: {
      max: 0,
      prev: 0,
      limit: 0,
      next: false,
      current: false,
    },
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFollowingUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFollowingUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.list;
        state.page = action.payload.data.page;
      })
      .addCase(fetchFollowingUsers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

const roomsSlice = createSlice({
  name: 'chat/rooms',
  initialState: {
    list: [],
    page: {
      max: 0,
      current: 0,
      limit: 0,
      next: false,
      prev: false,
    },
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchListRooms.pending, state => {
        state.loading = true;
      })
      .addCase(fetchListRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.list;
        state.page = action.payload.data.page;
      })
      .addCase(fetchListRooms.rejected, state => {
        state.loading = false;
      });
  },
});

export {usersOnlineSlice, roomsSlice};
