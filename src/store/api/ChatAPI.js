import {createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../../configs/axiosInstance';

const THIRTY_MINUTES = 30 * 60 * 1000;

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

const fetchGroup = createAsyncThunk('chat/group', async (body, thunk) => {
  try {
    const res = await AxiosInstance().post('/room/get-group', {
      room_id: body.roomId,
    });

    return res;
  } catch (e) {
    return thunk.rejectWithValue(e.message);
  }
});

const fetchMessages = createAsyncThunk('chat/messages', async (body, thunk) => {
  try {
    const res = await AxiosInstance().get('/message', {
      params: {
        room_id: body.roomId,
        _page: body.page,
        _limit: body.limit,
        timestamp: body.timestamp,
        _offset: body.offset,
      },
    });

    const messages = res.data.list;

    if (messages.length <= 1 && messages.length > 0) {
      messages[0].showAvatar = true;
    } else {
      for (let i = 0; i < messages.length - 1; i++) {
        const prev = messages[i];
        const next = messages[i + 1];

        const timeDiff = Math.abs(
          Date.parse(prev.send_at) - Date.parse(next.send_at),
        );

        if (prev.author._id === next.author._id && timeDiff <= THIRTY_MINUTES) {
          next.isNext = true;
        } else {
          prev.showAvatar = true;
        }
        if (i + 1 === messages.length - 1) {
          next.showAvatar = true;
        }
      }
    }

    return {
      message: res?.message,
      data: {
        list: messages,
        page: res.data.page,
      },
    };
  } catch (e) {
    console.log(e);
    return thunk.rejectWithValue(e.message);
  }
});

const deleteMessages = createAsyncThunk(
  'chat/delete-messages',
  async (body, thunk) => {
    try {
      await AxiosInstance().delete(`/message/${body}`);

      return body;
    } catch (e) {
      return thunk.rejectWithValue(e.message);
    }
  },
);

export {
  fetchFollowingUsers,
  fetchListRooms,
  fetchRoom,
  fetchGroup,
  fetchMessages,
  deleteMessages,
};
