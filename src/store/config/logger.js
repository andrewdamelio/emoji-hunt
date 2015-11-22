import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

function immutableToJS(state) {
  return Object.keys(state).reduce((newState, key) => {
    const val = state[key];
    newState[key] = Iterable.isIterable(val) ? val.toJS() : val;
    return newState;
  }, {});
}

export default createLogger({
  collapsed: true,
  transformer: (state) => {
    return immutableToJS(state);
  },
});
