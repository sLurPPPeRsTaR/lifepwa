import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';

import bootstrapReducers from '@cp-bootstrap/bootstrapReducer';
import bootstrapSagas from '@cp-bootstrap/bootstrapSaga';
import Persist from '@cp-config/Persist';

let finalReducers = bootstrapReducers;
if (Persist.active) {
  const persistConfig = Persist.storeConfig;
  finalReducers = persistReducer(persistConfig, bootstrapReducers);
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' ? composeWithDevTools : null) ||
  compose;

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  finalReducers,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);
const persistor = persistStore(store);

const makeStore = ({ isServer }) => {
  if (isServer) {
    return store;
  }
  store.__persistor = persistor;
  return store;
};

sagaMiddleware.run(bootstrapSagas);

export const wrapper = createWrapper(makeStore);
