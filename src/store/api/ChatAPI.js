import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

const fetchFollowingUsers = createAsyncThunk(
  'chat/following',
  async (body, thunk) => {
    try {
      const res = await AxiosInstance().get('/follow/get-followings-chat', {
        params: {
          _page: body?.page,
          _limit: body?.limit,
        },
      });

      return res;
    } catch (e) {
      console.log(e);
      return thunk.rejectWithValue(e);
    }
  },
);

const fetchListRooms = createAsyncThunk('chat/room', async (body, thunk) => {
  try {
    const res = await AxiosInstance().get('/room', {
      params: {
        _page: body.page,
        _limit: body.limit,
      },
    });

    return res;
  } catch (e) {
    return thunk.rejectWithValue(e);
  }
});

export {fetchFollowingUsers, fetchListRooms};
