import {
  USER_ADD_START,
  USER_VIEW_START,
  USER_EDIT_START,
  USER_DELETE_START,
  USER_LISTING_FORM_FETCH_START,
  USER_ADD_FORM_FETCH_START,
  USER_DELETE_SUCCESS,
  USER_DELETE_START_FAILURE,
  USER_ADD_SUCCESS,
  USER_EDIT_SUCCESS,
  RESET_PASSWORD_START,
  USER_LIST_ROW_DATA
} from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as actions from '../store/actions';
import { closeModal } from 'app/store/actions';

function* userAdd(action) {
  try {
    const response = yield call(
      tenantApi.userAdd,
      action.tenantCode,
      action.payload.userList
    );
    yield put({ type: 'USER_ADD_RESPONSE', payload: response });
    if (response.hasOwnProperty('_id')) {
      if (response.inetUserStatus[0] === 'Active') {
        yield all([
          call(tenantApi.resetPasswordApi, response.uid[0], action.realm),
          put(closeModal()),
          put({
            type: 'API_CALL_SUCCESS',
            message:
              'User added successfully.We have sent the Password reset link. Please Check Your MailBox'
          }),
          put({ type: USER_ADD_SUCCESS })
        ]);
      } else {
        yield all([
          put(closeModal()),
          put({
            type: 'API_CALL_SUCCESS',
            message: 'User added successfully'
          }),
          put({ type: USER_ADD_SUCCESS })
        ]);
      }
    }
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: error.response.data.message
    });
    yield put({
      type: 'USER_ADD_START_FAILURE',
      error: error.response.data.message
    });
    yield put(closeModal());
  }
}

function* userView(action) {
  try {
    const response = yield call(
      tenantApi.userView,
      action.tenantCode,
      action.payload
    );
    yield put({
      type: USER_LIST_ROW_DATA,
      payload: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'View user failed'
    });
    yield put({
      type: 'USER_VIEW_START_FAILURE'
    });
  }
}

function* userEdit(arg) {
  try {
    yield call(tenantApi.userEdit, arg.tenantCode, arg.payload.userList);
    yield put(closeModal());
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'User edited successfully'
    });

    yield put({ type: USER_EDIT_SUCCESS });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Edit user failed'
    });
    yield put({
      type: 'USER_EDIT_START_FAILURE'
    });
    yield put(closeModal());
  }
}

function* userDelete(action) {
  try {
    const getUser = yield call(
      tenantApi.userGet,
      action.tenantCode,
      action.payload.id
    );
    getUser['inetUserStatus'] =
      action.status === 'Inactivate' ? 'Inactive' : 'Active';
    const response = yield call(tenantApi.userEdit, action.tenantCode, getUser);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `User ${response.inetUserStatus}`
      }),
      yield put({
        type: USER_DELETE_SUCCESS
      })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Unable to perform any Action'
      }),
      yield put({
        type: USER_DELETE_START_FAILURE
      })
    ]);
  }
}

export function* watchUserDelete() {
  yield takeLatest(USER_DELETE_START, userDelete);
}

function* getUserListingForm() {
  try {
    const formDefinition = yield call(tenantApi.getUserListFormDefinition);
    yield put(actions.fetchUserListingFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'User listing form load failed',
      atAction: USER_LISTING_FORM_FETCH_START
    });
  }
}

function* getUserAddForm() {
  try {
    const formDefinition = yield call(tenantApi.getUserAddFormDefinition);
    yield put(actions.fetchUserAddFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'User add form load failed',
      atAction: USER_ADD_FORM_FETCH_START
    });
  }
}

function* resetPassword(arg) {
  try {
    if (arg.payload.inetUserStatus === 'Inactive') {
      yield put({
        type: 'API_CALL_ERROR',
        error: 'User is inactive. Please activate to set the password',
        showError: true
      });
    } else {
      yield call(tenantApi.resetPasswordApi, arg.payload.id, arg.realm);
      yield put({
        type: 'API_CALL_SUCCESS',
        message:
          'We have sent the Password reset link. Please Check Your MailBox'
      });
    }
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.response.data.message
    });
  }
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_START, resetPassword);
}
export function* watchGetUserAddForm() {
  yield takeLatest(USER_ADD_FORM_FETCH_START, getUserAddForm);
}
export function* watchUserAdd() {
  yield takeLatest(USER_ADD_START, userAdd);
}
export function* watchUserView() {
  yield takeLatest(USER_VIEW_START, userView);
}
export function* watchUserEdit() {
  yield takeLatest(USER_EDIT_START, userEdit);
}
export function* watchGetUserListingForm() {
  yield takeLatest(USER_LISTING_FORM_FETCH_START, getUserListingForm);
}
