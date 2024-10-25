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

const rootReducer = combineReducers({
  account: slices.accountSlice.reducer, // Add your reducers here
  userBasicInf: slices.userBasicInfSlice.reducer,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});
export const persistor = persistStore(store);
