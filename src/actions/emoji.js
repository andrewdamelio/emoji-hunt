import {
  ADD_HIT,
  ADD_MISS,
  SET_TARGETS,
  RESET_EMOJI,
} from '../constants';

export function addHit(emoji) {
  return {
    type: ADD_HIT,
    payload: emoji,
  };
}

export function addMiss(emoji) {
  return {
    type: ADD_MISS,
    payload: emoji,
  };
}

export function setTargets(emojis) {
  return {
    type: SET_TARGETS,
    payload: emojis,
  };
}

export function resetEmoji(emojis) {
  return {
    type: RESET_EMOJI,
    payload: emojis,
  };
}
