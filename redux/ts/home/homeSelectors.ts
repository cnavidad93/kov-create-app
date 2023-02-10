import { createSelector } from '@reduxjs/toolkit';

export const selectCount = createSelector(
  [(state) => state.home.count, (state) => state.home.sideEffectHasRun],
  (count, sideEffectHasRun) => {
    // Do some complex vm builds or values that heavily depend on other selectors
    return count;
  }
);

export default selectCount;
