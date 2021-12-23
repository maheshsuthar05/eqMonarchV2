import { put, takeLatest } from 'redux-saga/effects';
import * as Actions from 'app/store/actions/actionTypes';

function* flwFormRefresh() {
  try {
    yield put({
      type: Actions.FLOWABLE_FORM_REFRESH_SUCCESS,
      payload: true
    });
    yield put({
      type: Actions.FLOWABLE_FORM_REFRESH_SUCCESS,
      payload: false
    });
  } catch (error) {}
}

function* flowableFormRefreshWatcher() {
  yield takeLatest(Actions.FLOWABLE_FORM_REFRESH_START, flwFormRefresh);
}

export default flowableFormRefreshWatcher;
