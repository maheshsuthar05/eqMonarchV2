import { NAVIGATION_START } from 'app/store/actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../store/actions';

function* navigation(action) {
  const { history, url, routeState } = action;
  try {
    if (routeState) {
      history.push(url, routeState);
    } else {
      history.push(url);
    }
    yield put(actions.navigationSuccess('success'));
  } catch (error) {
    yield put(actions.navigationFailure(error.message));
  }
}

function* watchNavigation() {
  yield takeLatest(NAVIGATION_START, navigation);
}

export default watchNavigation;
