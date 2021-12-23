import resourceAddReducer from 'app/main/tenant/store/reducers/resource-add.reducer.js';
import userListReducer from 'app/main/tenant/store/reducers/user-list.reducer.js';
import groupListReducer from 'app/main/tenant/store/reducers/group-list.reducer.js';
import resourceListReducer from 'app/main/tenant/store/reducers/resource-list.reducer.js';
import roleListReducer from 'app/main/tenant/store/reducers/role-list.reducer.js';
import roleAddReducer from 'app/main/tenant/store/reducers/role-add.reducer.js';
import groupAddReducer from 'app/main/tenant/store/reducers/group-add.reducer.js';
import userAddReducer from 'app/main/tenant/store/reducers/user-add.reducer.js';
import tenantTabsUpdateReducer from 'app/main/tenant/store/reducers/tenant-tabs.reducer';
import tenantHeaderReducer from 'app/main/tenant/store/reducers/tenant-header.reducer';
import tenantGetReducer from 'app/main/tenant/store/reducers/tenant-get.reducer';
import tenantListFormFetchReducer from 'app/main/tenant/store/reducers/tenant-list.reducer';
import tenantAddFormFetchReducer from 'app/main/tenant/store/reducers/tenant-add.reducer';
import tenantRolePrivilegeReducer from 'app/main/tenant/store/reducers/tenant-role-privilege.redcer';
import dataMaskReducer from 'app/main/tenant/store/reducers/data-mask.reduce';
import tenantPropertyRoleReducer from 'app/main/tenant/store/reducers/tenant-property-role.reducer';
import TenantFlowableReducer from 'app/main/tenant/store/reducers/tenant.flowable.reducer';

import { combineReducers } from 'redux';

const tenantReducers = combineReducers({
  resourceAdd: resourceAddReducer,
  roleAdd: roleAddReducer,
  groupAdd: groupAddReducer,
  userAdd: userAddReducer,
  userList: userListReducer,
  groupList: groupListReducer,
  resourceList: resourceListReducer,
  roleList: roleListReducer,
  tabs: tenantTabsUpdateReducer,
  tenantHeader: tenantHeaderReducer,
  tenantGet: tenantGetReducer,
  list: tenantListFormFetchReducer,
  tenantAdd: tenantAddFormFetchReducer,
  rolePrivilege: tenantRolePrivilegeReducer,
  dataMask: dataMaskReducer,
  propertyRole: tenantPropertyRoleReducer,
  flowable: TenantFlowableReducer
});

export default tenantReducers;
