import navigationReducer from 'app/common/store/reducers/navigation.reducers';
import IAMResourceProviderReducer from 'app/common/store/reducers/iam-resource-provider.reducer';
import predefinedListReducer from './predefined-list.reducers';
import exploreTourReducer from './explore-tour.reducers';
import downloadFile from './file-utility.reducer';
import documentsReducer from './documents.reducer';
import commonFlowableReducer from './common.flowable.reducer';
import formDataFlowableReducer from './form-data.flowable.reducer';
import { combineReducers } from 'redux';
import changelogReducer from './changelog.reducer';

const commonReducers = combineReducers({
  navigation: navigationReducer,
  IAMResource: IAMResourceProviderReducer,
  predefinedList: predefinedListReducer,
  explore: exploreTourReducer,
  downloadFile: downloadFile,
  documents:documentsReducer,
  flowable:commonFlowableReducer,
  flowableFormData:formDataFlowableReducer,
  changelog:changelogReducer
});

export default commonReducers;
