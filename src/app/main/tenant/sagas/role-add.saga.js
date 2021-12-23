import {
  ROLE_ADD_START,
  ROLE_VIEW_START,
  ROLE_EDIT_START,
  ROLE_EDIT_SUCCESS,
  ROLE_DELETE_START,
  ROLE_LISTING_FORM_FETCH_START,
  ROLE_ADD_FORM_FETCH_START,
  ROLE_ADD_SUCCESS,
  ROLE_DELETE_START_SUCCESS
} from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as actions from '../store/actions';
import { closeModal } from 'app/store/actions';

function* roleAdd(action) {
  try {
    action.payload.actionValues = {
      GET: 'true',
      GRANT: 'true'
    };

    action.payload.resources = [''];
    action.payload.selectedPrivileges = undefined;
    action.payload.listOfUsers = [];
    if (action.payload.selectedUsers) {
      action.payload.selectedUsers.map((element) => {
        action.payload.listOfUsers.push(element.id);
        return element;
      });
    }
    action.payload.selectedUsers = undefined;
    action.payload.listOfGroups = [];
    if (action.payload.selectedGroups) {
      action.payload.selectedGroups.map((element) => {
        action.payload.listOfGroups.push(element.universalId);
        return element;
      });
    }
    action.payload.selectedGroups = undefined;
    yield call(tenantApi.roleAdd, action.tenantCode, action.payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Access Group added successfully'
      }),
      yield put({
        type: ROLE_ADD_SUCCESS
      }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Access Group add failed.${error.response.data.message}`,
      atAction: ROLE_ADD_START
    });
    yield put({
      type: 'ROLE_ADD_START_FAILURE'
    });
    yield put(closeModal());
  }
}

export function* watchRoleAdd() {
  yield takeLatest(ROLE_ADD_START, roleAdd);
}

function* roleView(action) {
  try {
    let response = yield call(
      tenantApi.roleView,
      action.tenantCode,
      action.payload
    );
    response.selectedPrivileges = [];
    response.resources.map((rec) => {
      response.selectedPrivileges.push({ name: rec });
      return rec;
    });
    response.selectedGroups = [];
    const groupsResponse = yield call(
      tenantApi.groupList,
      action.tenantCode,
      action.payload
    );
    response.listOfGroups.map((rec) => {
      response.selectedGroups.push(
        groupsResponse.find((ele) => ele.universalId === rec)
      );
      return rec;
    });
    response.selectedUsers = [];
    const usersResponse = yield call(
      tenantApi.userList,
      action.tenantCode,
      action.payload
    );
    response.listOfUsers.map((rec) => {
      response.selectedUsers.push(
        usersResponse.data.find((ele) => ele.id === rec)
      );
      return rec;
    });
    yield put({
      type: 'ROLE_VIEW_SUCCESS',
      response: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'View Access Group failed'
    });
    yield put({
      type: 'ROLE_VIEW_START_FAILURE'
    });
  }
}

export function* watchRoleView() {
  yield takeLatest(ROLE_VIEW_START, roleView);
}

function* roleEdit(action) {
  try {
    action.payload.actionValues = {
      GET: 'true',
      GRANT: 'true'
    };
    action.payload.resources = [];
    if (action.payload.selectedPrivileges) {
      action.payload.selectedPrivileges.map((element) => {
        action.payload.resources.push(element.name);
        return element;
      });
    }
    action.payload.selectedPrivileges = undefined;
    action.payload.listOfUsers = [];
    if (action.payload.selectedUsers) {
      action.payload.selectedUsers.map((element) => {
        action.payload.listOfUsers.push(element.id);
        return element;
      });
    }
    action.payload.selectedUsers = undefined;
    yield call(tenantApi.roleEdit, action.tenantCode, action.payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Access Group edited successfully'
      }),
      yield put({
        type: ROLE_EDIT_SUCCESS
      }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Edit Access Group failed'
    });
    yield put({
      type: 'ROLE_EDIT_START_FAILURE'
    });
    yield put(closeModal());
  }
}

export function* watchRoleEdit() {
  yield takeLatest(ROLE_EDIT_START, roleEdit);
}

function* roleDelete(action) {
  try {
    yield call(tenantApi.roleDelete, action.tenantCode, action.payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Access Group deleted successfully'
      }),
      yield put({ type: ROLE_DELETE_START_SUCCESS })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Delete Access Group failed'
    });
    yield put({
      type: 'ROLE_DELETE_START_FAILURE'
    });
  }
}

export function* watchRoleDelete() {
  yield takeLatest(ROLE_DELETE_START, roleDelete);
}

function* getRoleListingForm() {
  try {
    const formDefinition = yield call(tenantApi.getRoleListFormDefinition);
    yield put(actions.fetchRoleListingFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Access Group listing form load failed',
      atAction: ROLE_LISTING_FORM_FETCH_START
    });
  }
}

export function* watchGetRoleListingForm() {
  yield takeLatest(ROLE_LISTING_FORM_FETCH_START, getRoleListingForm);
}

function* getRoleAddForm() {
  try {
    const formDefinition = yield call(tenantApi.getRoleAddFormDefinition);
    yield put(actions.fetchRoleAddFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Access Group add form load failed',
      atAction: ROLE_ADD_FORM_FETCH_START
    });
  }
}

export function* watchGetRoleAddForm() {
  yield takeLatest(ROLE_ADD_FORM_FETCH_START, getRoleAddForm);
}
