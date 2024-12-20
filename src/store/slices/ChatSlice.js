import {createSlice} from '@reduxjs/toolkit';
import {
  deleteMessages,
  fetchFollowingUsers,
  fetchGroup,
  fetchListRooms,
  fetchMessages,
  fetchRoom,
} from '../api/ChatAPI';

const THIRTY_MINUTES = 30 * 60 * 1000;

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
  reducers: {
    updateOnlineUser: (state, action) => {
      const user = state.list.find(user => user._id === action.payload);

      if (user) {
        user.isOnline = true;
      }
    },
    updateOfflineUser: (state, action) => {
      const user = state.list.find(user => user._id === action.payload);

      if (user) {
        user.isOnline = false;
      }
    },
  },
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
  reducers: {
    updateRoom: (state, action) => {
      const room = state.list.find(
        room => room._id === action.payload.room._id,
      );
      if (room) {
        room.message = action.payload.message;
        state.list = [
          room,
          ...state.list.filter(r => r._id !== action.payload.room._id),
        ];
      } else {
        const newRoom = action.payload.room;

        if (!newRoom.is_group) {
          newRoom.members = newRoom.members.map(mem => {
            return {
              ...mem,
              isMe: mem._id === action.payload.userId,
            };
          });
          newRoom.name =
            newRoom.members[0]._id === action.payload.userId
              ? newRoom.members[1].fullname
              : newRoom.members[0].fullname;
        }

        newRoom.message = action.payload.message;

        state.list = [newRoom, ...state.list];
      }
    },
    updateRoomName: (state, action) => {
      const room = state.list.find(room => room._id === action.payload.roomId);
      if (!room) {
        return;
      }
      room.name = action.payload.name;
    },
    deleteRoom: (state, action) => {
      state.list = state.list.filter(room => room._id !== action.payload);
    },
    deleteMember: (state, action) => {
      const room = state.list.find(room => room._id === action.payload.roomId);

      if (room) {
        room.members = room.members.filter(
          mem => mem._id !== action.payload.memberId,
        );
      }
    },
  },
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
      .addCase(fetchListRooms.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        state.list = state.list.filter(room => room._id !== action.payload);
      });
  },
});

const chatSlice = createSlice({
  name: 'chat/message',
  initialState: {
    initial: false,
    room: {
      _id: null,
      members: [],
      is_group: false,
      name: null,
      host: null,
    },
    messages: [],
    page: {},
    loading: false,
    count: 0,
  },
  reducers: {
    reset: state => {
      state.initial = false;
      state.room = {
        _id: null,
        members: [],
        is_group: false,
        name: null,
      };
      state.messages = [];
      state.page = {};
      state.count = 0;
    },
    newMessage: (state, action) => {
      const prev = state.messages[0];
      const incomming = action.payload;

      if (prev) {
        const timeDiff = Math.abs(
          Date.parse(incomming.send_at) - Date.parse(prev.send_at),
        );

        if (
          incomming.author._id === prev.author._id &&
          timeDiff < THIRTY_MINUTES
        ) {
          prev.isNext = true;
        } else {
          incomming.showAvatar = true;
        }
      } else {
        incomming.showAvatar = true;
      }

      state.messages = [incomming].concat(state.messages);
      state.count++;
    },
    rename: (state, action) => {
      if (state.room._id === action.payload.roomId) {
        state.room.name = action.payload.name;
      }
    },
    updateMember: (state, action) => {
      if (state.room._id === action.payload.roomId) {
        state.room.members = state.room.members.filter(
          mem => mem.account_id !== action.payload.userId,
        );
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRoom.pending, state => {
        state.initial = false;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.initial = true;
        state.room = action.payload.data;
      })
      .addCase(fetchRoom.rejected, state => {
        state.initial = true;
      })
      .addCase(fetchMessages.pending, state => {
        state.loading = true;
      })
      .addCase(fetchGroup.pending, state => {
        state.initial = false;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.initial = true;
        state.room = action.payload.data;
      })
      .addCase(fetchGroup.rejected, state => {
        state.initial = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const messages = action.payload.data.list;
        state.loading = false;
        state.page = action.payload.data.page;
        state.messages = state.messages.concat(messages);
      })
      .addCase(fetchMessages.rejected, state => {
        state.loading = false;
      });
  },
});

export {usersOnlineSlice, roomsSlice, chatSlice};
export const {reset, newMessage, rename, updateMember} = chatSlice.actions;
export const {updateRoom, deleteRoom, updateRoomName, deleteMember} =
  roomsSlice.actions;
export const {updateOfflineUser, updateOnlineUser} = usersOnlineSlice.actions;
