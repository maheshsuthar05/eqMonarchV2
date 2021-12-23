import * as actionTypes from 'app/main/tenant/store/actionTypes';
import { closeModal } from 'app/store/actions';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';

function* roleList(action) {
  try {
    const response = yield call(tenantApi.getRoleList, action.tenantCode);

    yield put({
      type: actionTypes.TENANT_ROLE_FETCH_SUCCESS,
      data: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Role Listing failed',
      atAction: actionTypes.TENANT_ROLE_FETCH_START
    });
  }
}

export function* watchRoleList() {
  yield takeLatest(actionTypes.TENANT_ROLE_FETCH_START, roleList);
}

function* resourceList(action) {
  try {
    const response = yield call(tenantApi.getResourceList, action.tenantCode);

    yield put({
      type: actionTypes.TENANT_RESOURCE_FETCH_SUCCESS,
      data: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Resource Listing failed',
      atAction: actionTypes.TENANT_RESOURCE_FETCH_START
    });
  }
}

export function* watchResouceList() {
  yield takeLatest(actionTypes.TENANT_RESOURCE_FETCH_START, resourceList);
}

function* rolePrivilegeSave(action) {
  try {
    if (action.data.action.toLowerCase() === 'new') {
      yield call(tenantApi.roleAdd, null, action.data.payload);
    } else {
      yield call(tenantApi.roleEdit, null, action.data.payload);
    }
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Role Privilege saved successfully'
      }),
      yield put({
        type: actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_SUCCESS
      }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield all([
      yield put(closeModal()),
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Role Privilege save failed!',
        atAction: actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_START
      }),
      yield put({
        type: actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_FAILURE
      })
    ]);
  }
}

export function* watchRolePrivilegeSave() {
  yield takeLatest(
    actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_START,
    rolePrivilegeSave
  );
}

function* rolePrivilegeDataForEdit(action) {
  try {
    yield put({
      type: actionTypes.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_SUCCESS,
      data: action.data
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Setting Resource Privilege Data for Edit failed',
      atAction: actionTypes.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_START
    });
  }
}

export function* watchRolePrivilegeDataForEdit() {
  yield takeLatest(
    actionTypes.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_START,
    rolePrivilegeDataForEdit
  );
}
