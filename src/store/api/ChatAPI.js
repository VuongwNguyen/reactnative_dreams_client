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
      return thunk.rejectWithValue(e.message);
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
    return thunk.rejectWithValue(e.message);
  }
});

const fetchRoom = createAsyncThunk('chat/room', async (body, thunk) => {
  try {
    const res = await AxiosInstance().post('/room/get-room', {
      participant: body.participant,
    });

    return res;
  } catch (e) {
    return thunk.rejectWithValue(e.message);
  }
});

const fetchGroup = createAsyncThunk('chat/group', async (body, thunk) => {});

const fetchMessages = createAsyncThunk('chat/messages', async (body, thunk) => {
  try {
    const res = await AxiosInstance().get('/message', {
      params: {
        room_id: body.roomId,
        _page: body.page,
        _limit: body.limit,
        timestamp: body.timestamp,
      },
    });

    return res;
  } catch (e) {
    return thunk.rejectWithValue(e.message);
  }
});

export {
  fetchFollowingUsers,
  fetchListRooms,
  fetchRoom,
  fetchGroup,
  fetchMessages,
};
