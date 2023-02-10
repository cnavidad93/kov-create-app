import * as homeSagas from './home/homeSagas';

export function initSagas(sagaMiddleware) {
  Object.values(homeSagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}

export default initSagas;
