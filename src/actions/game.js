import {
  USE_POWERUP,
  ENDGAME,
  DECREMENT_TIMER,
  RESET_GAME,
} from '../constants';

export function powerup() {
  return {
    type: USE_POWERUP,
  };
}

export function endgame() {
  return {
    type: ENDGAME,
  };
}

export function decrement() {
  return (dispatch, getState) => {
    if (getState().game.get('completed')) {
      return null;
    } else if (getState().game.get('currentTime') === 0) {
      return dispatch(endgame());
    }
    dispatch({
      type: DECREMENT_TIMER,
    });
  };
}

export function resetGame(emojis) {
  return {
    type: RESET_GAME,
    payload: emojis,
  };
}
