import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  sideEffectHasRun: false,
};

const homeState = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      state.count = action.payload;
    },
    setSideEffectHasRun: (state) => {
      state.sideEffectHasRun = true;
    },
  },
});

export const homeActions = homeState.actions;
export default homeState;
