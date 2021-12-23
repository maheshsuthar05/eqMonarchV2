import { combineReducers } from 'redux';
import formDefinition from './flowable-core.reducer';
import jsonForm from './jsonFormDefinition.reducer';

const CoreReducers = combineReducers({
  formDefinition,
  jsonForm
});

export default CoreReducers;
