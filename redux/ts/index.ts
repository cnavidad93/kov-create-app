import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import homeState from './home/homeState';
import initSagas from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    home: homeState.reducer,
  },
  middleware: [sagaMiddleware, ...getDefaultMiddleware()],
  enhancers: [],
});

initSagas(sagaMiddleware);
export default store;
