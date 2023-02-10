import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HomeState = {
  count: number;
  sideEffectHasRun: boolean;
};

const initialState: HomeState = {
  count: 0,
  sideEffectHasRun: false,
};

const homeState = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increaseCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setSideEffectHasRun: (state) => {
      state.sideEffectHasRun = true;
    },
  },
});

export const homeActions = homeState.actions;
export default homeState;
