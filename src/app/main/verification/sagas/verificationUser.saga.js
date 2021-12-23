//CHECK_FOR_REGISTERED_USERS

import * as Actions from './../store/actions';
import { put, takeLatest, delay } from 'redux-saga/effects';
import history from '@history';
import { forgerock } from 'app/config/api';
import { _cookies } from 'app/store/actions';

function* verificationRoute(action) {
  try {
    yield delay(1000);
    const location = yield getPathInfoByUserType(action);
    history.push({
      pathname: location.pathname,
      state: { userType: _cookies.getCookies(forgerock.cookie.userType) }
    });
    yield put({
      type: Actions.VERIFIED_USER_ROUTE,
      location
    });
  } catch (error) {}
}

const getPathInfoByUserType = (resource) => {
  switch (_cookies.getCookies(forgerock.cookie.userType)) {
    case 'vendorunverified':
      return {
        pathname: `/verification/process`,
        userType: _cookies.getCookies(forgerock.cookie.userType)
      };
    case 'agentunverified':
      return {
        pathname: `/verification/process`,
        userType: _cookies.getCookies(forgerock.cookie.userType)
      };
    case 'vendor':
      return {
        pathname: `/vendor/details`,
        userType: _cookies.getCookies(forgerock.cookie.userType)
      };
    case 'agent':
      return {
        pathname: `/agent/details`,
        userType: _cookies.getCookies(forgerock.cookie.userType)
      };
    default:
      return {
        pathname: `/home/dashboard`,
        userType: _cookies.getCookies(forgerock.cookie.userType)
      };
  }
};

export default function* watchVerificationUser() {
  yield takeLatest(Actions.CHECK_FOR_VERIFIED_USER, verificationRoute);
}
