import { SagaMiddleware } from 'redux-saga';
import * as homeSagas from './home/homeSagas';

export function initSagas(sagaMiddleware: SagaMiddleware) {
  Object.values(homeSagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}

export default initSagas;
