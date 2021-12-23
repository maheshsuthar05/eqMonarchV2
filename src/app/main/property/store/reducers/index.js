import propertyAddReducer from './property-add.reducer';
import propertyDecisionReducer from './property-decision.reducer';
import getPropertyReducer from './property-get.reducer';
import getPropertyHeaderFormReducer from './property-header.reducer';
import propertyInitReducer from './property-init.reducer';
import propertyTabsUpdateReducer from './property-tabs.reducer';
import getPropertyTaskListingFormReducer from './property-task-listing.reducer';
import propertyTaskReducer from './property-task.reducer';
import propertyUpdateReducer from './property-update.reducer';
import getPropertyDocumentFormReducer from './property-document.reducer';
import getPropertyMilestoneReducer from './property-milestone.reducer';
import getAllPropertyReducer from './property-get-all.reducer';
import getUserListingFormReducer from './role-assign.reducer';
import getPropertyOfferListingFormReducer from 'app/main/offer/store/reducers/offer-listing.reducer';
import snapshotReducer from './snapshot.reducer';
import getPropertyStrategyFormReducer from './property-startegy.reducer';
import propertyBulkImportReducer from './property-bulkimport.reducer';
import getPropertyMailBoxReducer from './property-mail-box.reducer';
import propertyFlowableReducer from './property.flowable.reducer';
import { combineReducers } from 'redux';

const propertyReducers = combineReducers({
  get: getPropertyReducer,
  add: propertyAddReducer,
  update: propertyUpdateReducer,
  header: getPropertyHeaderFormReducer,
  taskListing: getPropertyTaskListingFormReducer,
  tabs: propertyTabsUpdateReducer,
  task: propertyTaskReducer,
  document: getPropertyDocumentFormReducer,
  decision: propertyDecisionReducer,
  init: propertyInitReducer,
  milestone: getPropertyMilestoneReducer,
  getAll: getAllPropertyReducer,
  roles: getUserListingFormReducer,
  offerListing: getPropertyOfferListingFormReducer,
  snapshot: snapshotReducer,
  strategy:getPropertyStrategyFormReducer,
  bulkimport:propertyBulkImportReducer,
  messages:getPropertyMailBoxReducer,
  flowable: propertyFlowableReducer
});

export default propertyReducers;
