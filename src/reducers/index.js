import { combineReducers } from 'redux';
import game from './game';
import emoji from './emoji';

const rootReducer = combineReducers({
  game,
  emoji,
});

export default rootReducer;
