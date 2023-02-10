import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put } from 'redux-saga/effects';
import { homeActions } from './homeState';

function* sideEffectSaga(action: PayloadAction<number>) {
  console.log('This is a side effect for action: ', action);
  yield put(homeActions.setSideEffectHasRun());
}

export function* watcherSaga() {
  yield takeEvery(homeActions.increaseCount, sideEffectSaga);
}

export default watcherSaga;
