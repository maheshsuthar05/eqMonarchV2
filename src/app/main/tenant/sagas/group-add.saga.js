import {
  GROUP_ADD_START,
  GROUP_ADD_SUCCESS,
  GROUP_EDIT_START,
  GROUP_EDIT_SUCCESS,
  GROUP_VIEW_START,
  GROUP_DELETE_START,
  GROUP_LISTING_FORM_FETCH_START,
  GROUP_ADD_FORM_FETCH_START,
  GROUP_DELETE_SUCCESS,
  GROUP_EDIT_DATA
} from 'app/main/tenant/store/actionTypes';
import { closeModal } from 'app/store/actions';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as actions from '../store/actions';

function* groupAdd(action) {
  try {
    yield call(tenantApi.groupAdd, action.tenantCode, action.payload);
    yield call(
      tenantApi.groupAssociateUsers,
      action.tenantCode,
      action.payload
    );
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Property Role added successfully'
      }),
      yield put({
        type: GROUP_ADD_SUCCESS
      }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Add Property Role failed'
      }),
      yield put({
        type: 'GROUP_ADD_START_FAILURE'
      }),
      yield put(closeModal())
    ]);
  }
}

export function* watchGroupAdd() {
  yield takeLatest(GROUP_ADD_START, groupAdd);
}

function* groupView(action) {
  try {
    const response = yield call(
      tenantApi.groupView,
      action.tenantCode,
      action.payload
    );
    response.selectedList = [];
    response.selectedList = yield all(
      response.members.uniqueMember.map((user) => {
        return {
          displayName: user,
          id: user
        };
      })
    );
    yield put({ type: GROUP_EDIT_DATA, response });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'View Property Role failed'
    });
    yield put({
      type: 'GROUP_VIEW_START_FAILURE'
    });
  }
}

export function* watchGroupView() {
  yield takeLatest(GROUP_VIEW_START, groupView);
}

function* groupEdit(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.groupEdit, tenantCode, payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Property Role edited successfully'
      }),
      yield put({
        type: GROUP_EDIT_SUCCESS
      }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Property Role group failed'
      }),
      yield put({
        type: 'GROUP_EDIT_START_FAILURE'
      }),
      yield put(closeModal())
    ]);
  }
}

export function* watchGroupEdit() {
  yield takeLatest(GROUP_EDIT_START, groupEdit);
}

function* groupDelete(action) {
  try {
    yield call(tenantApi.groupDelete, action.tenantCode, action.payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Property Role deleted successfully'
      }),
      yield put({ type: GROUP_DELETE_SUCCESS })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Delete Property Role failed'
      }),
      yield put({
        type: 'GROUP_DELETE_START_FAILURE'
      })
    ]);
  }
}

export function* watchGroupDelete() {
  yield takeLatest(GROUP_DELETE_START, groupDelete);
}

function* getGroupListingForm() {
  try {
    const formDefinition = yield call(tenantApi.getGroupListFormDefinition);
    yield put(actions.fetchGroupListingFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Property Role listing form load failed',
      atAction: GROUP_LISTING_FORM_FETCH_START
    });
  }
}

export function* watchGetGroupListingForm() {
  yield takeLatest(GROUP_LISTING_FORM_FETCH_START, getGroupListingForm);
}

function* getGroupAddForm() {
  try {
    const formDefinition = yield call(tenantApi.getGroupAddFormDefinition);
    yield put(actions.fetchGroupAddFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Property Role add form load failed',
      atAction: GROUP_ADD_FORM_FETCH_START
    });
  }
}

export function* watchGetGroupAddForm() {
  yield takeLatest(GROUP_ADD_FORM_FETCH_START, getGroupAddForm);
}
