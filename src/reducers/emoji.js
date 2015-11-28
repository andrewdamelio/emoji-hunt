import { handleActions } from 'redux-actions';
import { ADD_HIT, ADD_MISS, SET_TARGETS, RESET_GAME } from '../constants';
import { fromJS } from 'immutable';

const emojiReducer = handleActions({
  [SET_TARGETS]: (state, action) => {
    return state.merge(state, {
      targets: action.payload.map(value => {
        return value.character;
      }),
    });
  },
  [ADD_HIT]: (state, action) => {
    return state.merge(state, {
      hits: state.get('hits').concat(action.payload),
    });
  },
  [ADD_MISS]: (state, action) => {
    return state.merge(state, {
      misses: state.get('misses').concat(action.payload),
    });
  },
  [RESET_GAME]: (state) => {
    return state.merge(state, {
      targets: [],
      misses: [],
      hits: [],
    });
  },
}, fromJS({
  targets: [],
  misses: [],
  hits: [],
}));

export default emojiReducer;
