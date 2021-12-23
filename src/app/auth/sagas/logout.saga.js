import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as Actions from '../store/actionTypes';
import Cookies from 'js-cookie';
import { forgerock } from 'app/config/api';
import famService from 'app/auth/services/forgerockService';
import { contextInfo } from 'app/common/helpers/common-helper';

function* logoutSaga() {
  const contextData = contextInfo();
  try {
    if (
      Cookies.get(forgerock.cookie.iPlanetDirectoryPro) !== undefined ||
      contextData.jwtToken !== ''
    ) {
      yield call(famService.logoutUser);
    }
    yield all(
      Object.keys(forgerock.cookie).map((key) => {
        Cookies.remove(forgerock.cookie[key]);
        return key;
      })
    );
    Cookies.remove('vendorTaskSearchTenant');
    Cookies.remove('iPlanetDirectoryPro', {
      path: '/',
      domain: '.altisource.com'
    });
  } catch (error) {
    yield put({
      type: Actions.API_CALL_ERROR,
      error: error.message,
      atAction: Actions.USER_LOGGED_OUT
    });
  }
}

function* logoutWatcher() {
  yield takeLatest(Actions.USER_LOGGED_OUT, logoutSaga);
}

function* clearUserCookie() {
  try {
    yield all(
      Object.keys(forgerock.cookie).map((key) => {
        Cookies.remove(forgerock.cookie[key]);
        return key;
      })
    );
    Cookies.remove('iPlanetDirectoryPro', {
      path: '/',
      domain: '.altisource.com'
    });
  } catch (error) {
    yield put({
      type: Actions.API_CALL_ERROR,
      error: error.message,
      atAction: Actions.USER_LOGGED_OUT
    });
  }
}

export function* clearUserCookieWatcher() {
  yield takeLatest(Actions.USER_INVALID_SESSION, clearUserCookie);
}
export default logoutWatcher;
