import {
  watchResourceAdd,
  watchResourceView,
  watchResourceEdit,
  watchResourceDelete,
  watchGetResourceListingForm,
  watchGetResourceAddForm,
  watchUploadResourceFile,
  watchDownloadResourceFile,
  watchResourceSink
} from 'app/main/tenant/sagas/resource-add.saga';
import {
  watchUserAdd,
  watchUserView,
  watchUserEdit,
  watchUserDelete,
  watchGetUserListingForm,
  watchGetUserAddForm,
  watchResetPassword
} from 'app/main/tenant/sagas/user-add.saga';
import {
  watchRoleAdd,
  watchRoleView,
  watchRoleEdit,
  watchRoleDelete,
  watchGetRoleListingForm,
  watchGetRoleAddForm
} from 'app/main/tenant/sagas/role-add.saga';
import {
  watchGroupAdd,
  watchGroupView,
  watchGroupEdit,
  watchGroupDelete,
  watchGetGroupListingForm,
  watchGetGroupAddForm
} from 'app/main/tenant/sagas/group-add.saga';
import { watchTenantTabsUpdate } from 'app/main/tenant/sagas/tenant-tabs.saga';
import {
  watchTenantAddFormFetch,
  watchTenantAdd,
  watchTenantHeaderForm,
  watchTenantEdit
} from 'app/main/tenant/sagas/tenant-add.saga';
import { watchGetTenantById } from 'app/main/tenant/sagas/tenant-get.saga';
import {
  watchFetchTenantListForm,
  watchFetchTenant
} from 'app/main/tenant/sagas/tenant-list.saga';
import {
  watchRoleList,
  watchResouceList,
  watchRolePrivilegeSave,
  watchRolePrivilegeDataForEdit
} from 'app/main/tenant/sagas/role-privilege.saga';
import { watchAddDataMask } from 'app/main/tenant/sagas/data-mask.saga';
import {
  watchAddAndUpdatePropertyRoles,
  watchPropertyRolesDelete,
  watchPropertyRolesUsers,
  watchGetPropertyRoles
} from 'app/main/tenant/sagas/tenant-property-role.saga';
import { all, call } from 'redux-saga/effects';

export default function* tenantSaga() {
  yield all([
    call(watchResourceSink),
    call(watchUploadResourceFile),
    call(watchDownloadResourceFile),
    call(watchResourceAdd),
    call(watchUserAdd),
    call(watchRoleAdd),
    call(watchGroupAdd),
    call(watchUserDelete),
    call(watchGroupDelete),
    call(watchResourceDelete),
    call(watchRoleDelete),
    call(watchGroupView),
    call(watchGroupEdit),
    call(watchResourceView),
    call(watchResourceEdit),
    call(watchUserView),
    call(watchUserEdit),
    call(watchRoleView),
    call(watchRoleEdit),
    call(watchGetUserListingForm),
    call(watchGetGroupListingForm),
    call(watchGetResourceListingForm),
    call(watchGetRoleListingForm),
    call(watchGetUserAddForm),
    call(watchGetGroupAddForm),
    call(watchGetResourceAddForm),
    call(watchGetRoleAddForm),
    call(watchTenantTabsUpdate),
    call(watchTenantAdd),
    call(watchTenantHeaderForm),
    call(watchTenantEdit),
    call(watchGetTenantById),
    call(watchFetchTenantListForm),
    call(watchTenantAddFormFetch),
    call(watchRoleList),
    call(watchResouceList),
    call(watchRolePrivilegeSave),
    call(watchRolePrivilegeDataForEdit),
    call(watchFetchTenant),
    call(watchAddDataMask),
    call(watchResetPassword),
    call(watchAddAndUpdatePropertyRoles),
    call(watchPropertyRolesDelete),
    call(watchPropertyRolesUsers),
    call(watchGetPropertyRoles)
  ]);
}
