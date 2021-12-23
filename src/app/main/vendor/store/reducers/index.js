import { combineReducers } from 'redux';
import widgets from './widgets.reducer';
import vendorProfile from './vendor.reducer';
import VendorFlowableReducer from './vendor.flowable.reducer';

const vendorReducer = combineReducers({
  widgets: widgets,
  vendorProfile: vendorProfile,
  flowable: VendorFlowableReducer
});

export default vendorReducer;
