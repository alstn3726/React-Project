import { combineReducers } from 'redux';
import user from './user_reducer';
import freeBoard from './board_reducer'

export const rootReducer = combineReducers({
    user,
    freeBoard
});