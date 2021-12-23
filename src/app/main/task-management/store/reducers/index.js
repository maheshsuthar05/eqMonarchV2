import { combineReducers } from 'redux';
import claimsTaskReducer from './claimsTask.reducer';
import assignTaskReducer from './assignTask.reducer';
import tasksReducer from './tasks.reducer';
import TaskFlowableReducer from './taskManagment.flowable.reducer';

const taskManagementAppReducers = combineReducers({
  claimsTask: claimsTaskReducer,
  assignedTask: assignTaskReducer,
  details: tasksReducer,
  flowable: TaskFlowableReducer
});

export default taskManagementAppReducers;
