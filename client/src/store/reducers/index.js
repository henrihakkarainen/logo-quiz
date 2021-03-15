import appReducer from './appReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appReducer,
  userReducer
});

export default rootReducer;