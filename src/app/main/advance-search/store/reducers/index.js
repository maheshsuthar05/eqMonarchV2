import { combineReducers } from 'redux';
import SearchFlowableReducer from './search.flowable.reducer';

const taskManagementAppReducers = combineReducers({
  flowable: SearchFlowableReducer
});

export default taskManagementAppReducers;
