import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import * as slices from './slices';

const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persisConfig,
  slices.accountSlice.reducer,
);

export const store = configureStore({
  reducer: {
    account: persistedReducer,
    userBasicInf: slices.userBasicInfSlice.reducer,
    chatUser: slices.usersOnlineSlice.reducer,
    chatRoom: slices.roomsSlice.reducer,
    chatMessage: slices.chatSlice.reducer,
    postDetail: slices.postDetailSlice.reducer,
    postTrending: slices.postTrendingSlice.reducer,
    childComment: slices.childCommentSlice.reducer,
    notification: slices.notificationSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});
export const persistor = persistStore(store);
