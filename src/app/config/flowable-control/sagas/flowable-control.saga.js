import { put, takeLatest, call } from 'redux-saga/effects';
import { flowableControl } from '../services';
import * as Actions from '../store/actionTypes';
import { contextInfo } from 'app/common/helpers/common-helper';

function* flowableControlLogin(args) {
  try {
    const data = yield call(flowableControl.getLoginCredential);
    yield call(
      flowableControl.login,
      contextInfo().username,
      data?.user?.password
    );
    yield put({
      type: Actions.FLOWABLE_CONTROL_LOGIN_SUCCESS
    });
  } catch (error) {
    yield put({
      type: Actions.FLOWABLE_CONTROL_LOGIN_FAILED
    });
  }
}

export function* flowableControlLoginWatcher(args) {
  yield takeLatest(Actions.FLOWABLE_CONTROL_LOGIN, flowableControlLogin);
}
