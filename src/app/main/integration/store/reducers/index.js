import { combineReducers } from 'redux';
import services from './service.reducer';
import operation from './operation.reducer';

const reducer = combineReducers({
  services,
  operation
});

export default reducer;
