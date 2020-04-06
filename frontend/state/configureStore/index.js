import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleWare from 'redux-saga';

import createRootReducer from 'state/rootReducer';
import rootSaga from 'state/rootSaga';

export const history = createBrowserHistory();

const composeEnhancers =
  // eslint-disable-next-line
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleWare();

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      ),
    ),
  );
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();
  return store;
}
