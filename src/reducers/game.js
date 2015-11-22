import { handleActions } from 'redux-actions';
import { DECREMENT_TIMER, ENDGAME, USE_POWERUP, RESET_GAME } from '../constants';
import { fromJS } from 'immutable';

const gameReducer = handleActions({
  [DECREMENT_TIMER]: (state) => state.update('currentTime', (value) => value - 1),
  [ENDGAME]: (state) => state.set('completed', true),
  [USE_POWERUP]: (state) => {
    return state.merge(state, {
      powerup: {
        active: !state.get('powerup').get('active'),
        used: true,
      },
    });
  },
  [RESET_GAME]: (state) => {
    return state.merge(state, {
      powerup: {
        active: false,
        used: false,
      },
      timeLimit: 35,
      currentTime: 35,
      completed: false,
    });
  },
}, fromJS({
  powerup: {
    used: false,
    active: false,
  },
  timeLimit: 35,
  currentTime: 35,
  completed: false,
}));
export default gameReducer;
