import getDecisionRuleFormReducer from './decision-rule.reducer';
import getTenantAdminFormsReducer from './tenant-admin/tenant-admin.reducer';
import adminDecisionTableFormReducer from './tenant-admin/tenant-admin-decision.reducer';
import getInvestorReducer from './investor.reducer';
import manageProductVendorReducer from './manage-product-vendor.reducer';
import manageVendorApprovedReducer from './manage-vendor-approved.reducer';
import getPropertyAdminReducer from './property-admin/property-admin.reducer';
import TenantAdminFlowableReducer from './tenant-admin.flowable.reducer';
import taskAdminReducer from './task-admin/task-admin.reducer';
import adminRefreshReducer from './refresh.reducer';
import { combineReducers } from 'redux';

const adminReducers = combineReducers({
  rule: getDecisionRuleFormReducer,
  tenant_forms: getTenantAdminFormsReducer,
  manageProductVendor: manageProductVendorReducer,
  investor: getInvestorReducer,
  vendorSearchApproval: manageVendorApprovedReducer,
  propertyAdmin: getPropertyAdminReducer,
  flowable: TenantAdminFlowableReducer,
  taskAdmin: taskAdminReducer,
  adminDecision: adminDecisionTableFormReducer,
  refresh: adminRefreshReducer
});

export default adminReducers;
