import { combineReducers } from 'redux';
import verificationReducer from './verification.reducer';

const commonReducers = combineReducers({
  route: verificationReducer
});

export default commonReducers;
