import * as action from 'app/main/tenant/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const resourceSink = () => ({ type: action.RESOURCE_SINK_START });

export const userRoleGroupAdd = (tenantCode, payload, userRes, tenantId) => {
  return {
    type: action.USER_ROLE_GROUP_ADD,
    tenantCode,
    payload,
    userRes,
    tenantId
  };
};
export const resourceModalClose = (payload) => {
  return { type: action.RESOURCE_MODAL_CLOSE, payload };
};

export const resourceListRefresh = (payload) => {
  return { type: action.RESOURCE_LIST_REFRESH_TIME, payload };
};
export const resourceDownload = () => {
  return { type: action.RESOURCE_DOWNLOAD_FILE };
};
export const resourceUpload = (payload, tenantCode) => {
  return { type: action.RESOURCE_UPLOAD_FILE, payload, tenantCode };
};
export const resourceAddStart = (tenantCode, payload) => ({
  type: action.RESOURCE_ADD_START,
  payload: payload,
  tenantCode: tenantCode
});

export const resourceViewStart = (tenantCode, payload, tenantId) => ({
  type: action.RESOURCE_VIEW_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode
});

export const userViewStart = (tenantCode, payload, tenantId) => ({
  type: action.USER_VIEW_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode
});

export const roleViewStart = (tenantCode, payload, tenantId) => ({
  type: action.ROLE_VIEW_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode
});

export const roleEditStart = (tenantCode, payload) => ({
  type: action.ROLE_EDIT_START,
  payload: payload,
  tenantCode: tenantCode
});

export const groupViewStart = (tenantCode, payload) => ({
  type: action.GROUP_VIEW_START,
  payload: payload,
  tenantCode: tenantCode
});

export const groupEditStart = (tenantCode, payload) => ({
  type: action.GROUP_EDIT_START,
  payload: payload,
  tenantCode: tenantCode
});

export const userEditStart = (tenantCode, payload, editIt, realm) => ({
  type: action.USER_EDIT_START,
  payload: payload,
  tenantCode: tenantCode,
  editIt: editIt,
  realm: realm
});

export const resourceEditStart = (tenantCode, payload) => ({
  type: action.RESOURCE_EDIT_START,
  payload: payload,
  tenantCode: tenantCode
});

export const userDeleteStart = (tenantCode, payload, tenantId, status) => ({
  type: action.USER_DELETE_START,
  tenantCode: tenantCode,
  payload: payload,
  tenantId: tenantId,
  status: status
});

export const groupDeleteStart = (tenantCode, payload, tenantId) => ({
  type: action.GROUP_DELETE_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode
});

export const resourceDeleteStart = (
  tenantCode,
  payload,
  tenantId,
  dispatch
) => ({
  type: action.RESOURCE_DELETE_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode,
  dispatch
});
export const roleDeleteStart = (tenantCode, payload, tenantId) => ({
  type: action.ROLE_DELETE_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode
});

export const userAddStart = (tenantCode, payload, tenantId, realm) => ({
  type: action.USER_ADD_START,
  payload: payload,
  tenantId: tenantId,
  tenantCode: tenantCode,
  realm: realm
});

export const roleAddStart = (tenantCode, payload) => ({
  type: action.ROLE_ADD_START,
  payload: payload,
  tenantCode: tenantCode
});

export const groupAddStart = (tenantCode, payload) => ({
  type: action.GROUP_ADD_START,
  payload: payload
});

export const userAddSuccess = (response) => ({
  type: action.USER_ADD_SUCCESS,
  response: response
});

export const fetchUserListingFormStart = () => ({
  type: action.USER_LISTING_FORM_FETCH_START
});

export const fetchUserListingFormSuccess = (formDefinition) => ({
  type: action.USER_LISTING_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchGroupListingFormStart = () => ({
  type: action.GROUP_LISTING_FORM_FETCH_START
});

export const fetchTenantHeaderFormStart = () => ({
  type: action.TENANT_HEADER_FORM_FETCH_START
});

export const fetchTenantHeaderFormSuccess = (formDefinition) => ({
  type: action.TENANT_HEADER_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchTenantHeaderFormFailure = (error) => ({
  type: action.TENANT_HEADER_FORM_FETCH_FAILURE,
  atAction: action.TENANT_HEADER_FORM_FETCH_FAILURE,
  payload: error
});

export const fetchGroupListingFormSuccess = (formDefinition) => ({
  type: action.GROUP_LISTING_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchResourceListingFormStart = () => ({
  type: action.RESOURCE_LISTING_FORM_FETCH_START
});

export const fetchResourceListingFormSuccess = (formDefinition) => ({
  type: action.RESOURCE_LISTING_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchRoleListingFormStart = () => ({
  type: action.ROLE_LISTING_FORM_FETCH_START
});

export const fetchRoleListingFormSuccess = (formDefinition) => ({
  type: action.ROLE_LISTING_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchRoleAddFormStart = () => ({
  type: action.ROLE_ADD_FORM_FETCH_START
});

export const fetchRoleAddFormSuccess = (formDefinition) => ({
  type: action.ROLE_ADD_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchUserAddFormStart = () => ({
  type: action.USER_ADD_FORM_FETCH_START
});

export const fetchUserAddFormSuccess = (formDefinition) => ({
  type: action.USER_ADD_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchGroupAddFormStart = () => ({
  type: action.GROUP_ADD_FORM_FETCH_START
});

export const fetchGroupAddFormSuccess = (formDefinition) => ({
  type: action.GROUP_ADD_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchResourceAddFormStart = () => ({
  type: action.RESOURCE_ADD_FORM_FETCH_START
});

export const fetchResourceAddFormSuccess = (formDefinition) => ({
  type: action.RESOURCE_ADD_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const tenantTabsUpdateStart = (tabsAccess) => ({
  type: action.TENANT_TABS_UPDATE_START,
  tabsAccess: tabsAccess
});

export const tenantTabsUpdateSuccess = (tabsAccess) => ({
  type: action.TENANT_TABS_UPDATE_SUCCESS,
  tabsAccess: tabsAccess
});

export const tenantAddFormfetchStart = () => ({
  type: action.TENANT_ADD_FORM_FETCH_START
});

export const tenantAddFormfetchSuccess = (formDefinition) => ({
  type: action.TENANT_ADD_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const tenantAddStart = (tenantCode, payload, flowablePayload, user) => ({
  type: action.TENANT_ADD_START,
  payload: payload,
  flowablePayload: flowablePayload,
  tenantCode: tenantCode,
  user: user
});

export const tenantAddSuccess = (response) => ({
  type: action.TENANT_ADD_SUCCESS,
  response: response
});

export const tenantAddFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: action.TENANT_ADD_SUCCESS,
  error: error
});

export const tenantEditStart = (tenantCode, payload) => ({
  type: action.TENANT_EDIT_START,
  payload: payload,
  tenantCode: tenantCode
});

export const tenantEditSuccess = (response) => ({
  type: action.TENANT_EDIT_SUCCESS,
  response: response
});

export const tenantGetStart = () => ({
  type: action.TENANT_GET_START
});

export const tenantGetSuccess = (response) => ({
  type: action.TENANT_GET_SUCCESS,
  response: response
});

export const fetchTenantListFormStart = () => ({
  type: action.TENANT_LIST_FORM_FETCH_START
});

export const fetchTenantListFormSuccess = (formDefinition) => ({
  type: action.TENANT_LIST_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchTenantRoleListStart = (tenantCode) => ({
  type: action.TENANT_ROLE_FETCH_START,
  tenantCode: tenantCode
});

export const fetchTenantRoleListSuccess = (data) => ({
  type: action.TENANT_ROLE_FETCH_SUCCESS,
  data: data
});

export const fetchTenantResourceListStart = (tenantCode) => ({
  type: action.TENANT_RESOURCE_FETCH_START,
  tenantCode: tenantCode
});

export const fetchTenantResourceListSuccess = (data) => ({
  type: action.TENANT_RESOURCE_FETCH_SUCCESS,
  data: data
});

export const saveTenantRolePrivilegeStart = (data) => ({
  type: action.TENANT_ROLE_PRIVILEGE_SAVE_START,
  data: data
});

export const saveTenantRolePrivilegeSuccess = () => ({
  type: action.TENANT_ROLE_PRIVILEGE_SAVE_SUCCESS
});

export const saveTenantRolePrivilegeFailure = () => ({
  type: action.TENANT_ROLE_PRIVILEGE_SAVE_FAILURE
});

export const setTenantRolePrivilegeDataForEditStart = (data) => ({
  type: action.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_START,
  data: data
});

export const setTenantRolePrivilegeDataForEditSuccess = (data) => ({
  type: action.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_SUCCESS,
  data: data
});

export const fetchTenantStart = () => ({
  type: action.TENANT_FETCH_START
});

export const fetchTenantSuccess = (tenant) => ({
  type: action.TENANT_FETCH_SUCCESS,
  tenant: tenant
});

export const addDataMaskFormStart = (payload, tenantId) => ({
  type: action.DATA_MASK_ADD_START,
  payload: payload,
  tenantId: tenantId
});

export const userResetPasswordStart = (payload, realm) => ({
  type: action.RESET_PASSWORD_START,
  payload: payload,
  realm: realm
});
