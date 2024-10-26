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

const fetchListRooms = createAsyncThunk('chat/rooms', async (body, thunk) => {
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

const fetchRoom = createAsyncThunk('chat/room', async (body, thunk) => {
  try {
    const res = await AxiosInstance().post('/room/get-room', {
      participant: body.participant,
    });

    return res;
  } catch (e) {
    return thunk.rejectWithValue(e);
  }
});

const fetchGroup = createAsyncThunk('chat/group', async (body, thunk) => {});

export {fetchFollowingUsers, fetchListRooms, fetchRoom, fetchGroup};
