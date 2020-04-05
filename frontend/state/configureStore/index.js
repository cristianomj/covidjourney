import { compose, applyMiddleware, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from 'state/rootReducer';
import rootSaga from 'state/rootSaga';

const composeEnhancers =
  // eslint-disable-next-line
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleWare();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  );
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();
  return store;
}
