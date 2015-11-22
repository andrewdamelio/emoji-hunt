import { devTools } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import logger from './config/logger';
import rootReducer from '../reducers';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware, logger),
    devTools(),
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
