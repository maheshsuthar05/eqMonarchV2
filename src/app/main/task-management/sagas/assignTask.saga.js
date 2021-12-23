import * as User from 'app/store/actions';
import { put, takeLatest, select } from 'redux-saga/effects';
import * as Actions from '../store/actionTypes';

function* fetchOpenAssignTaskPayload(arg) {
  try {
    const user = yield select(({ auth }) => auth.user);
    const userTenantCode = yield select(User.getUserTenentCode);
    yield put({
      type: Actions.FETCH_OPEN_ASSIGN_TASK_PAYLOAD,
      caseInstanceId: arg.caseInstanceId,
      tenantId: userTenantCode,
      roles: user.roles
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Task fetch failed',
      atAction: Actions.REQUEST_OPEN_ASSIGN_TASK_PAYLOAD
    });
  }
}

function* fetchCloseAssignTaskPayload(arg) {
  try {
    const userTenantCode = yield select(User.getUserTenentCode);
    yield put({
      type: Actions.FETCH_CLOSE_ASSIGN_TASK_PAYLOAD,
      caseInstanceId: arg.caseInstanceId,
      tenantId: userTenantCode
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Task fetch failed',
      atAction: Actions.REQUEST_CLOSE_ASSIGN_TASK_PAYLOAD
    });
  }
}

export function* closeAssignTaskPayload() {
  yield takeLatest(
    Actions.REQUEST_CLOSE_ASSIGN_TASK_PAYLOAD,
    fetchCloseAssignTaskPayload
  );
}

export function* openAssignTaskPayload() {
  yield takeLatest(
    Actions.REQUEST_OPEN_ASSIGN_TASK_PAYLOAD,
    fetchOpenAssignTaskPayload
  );
}
