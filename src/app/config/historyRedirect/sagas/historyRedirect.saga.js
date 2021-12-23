import { call, takeLatest } from 'redux-saga/effects';
import * as Actions from './../store/actionTypes';
import history from '@history';

function* historyRedirect(arg) {
  try {
    yield call(forwardTo, arg.pathName);
  } catch (error) {}
}

function* forwardTo(location) {
  yield history.push({ path: location });
}

export default function* historyRedirectWatcher() {
  yield takeLatest(Actions.PAGE_REDIRECTION, historyRedirect);
}
