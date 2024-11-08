import {createSlice} from '@reduxjs/toolkit';

export const idsTagUserSlice = createSlice({
  name: 'idsTagUser',
  initialState: {
    ids: [],
  },
  reducers: {
    setIds: (state, action) => {
      state.ids = action.payload;
    },
  },
});

export const {setIds} = idsTagUserSlice.actions;
