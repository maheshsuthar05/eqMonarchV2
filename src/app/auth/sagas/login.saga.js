import { put, takeLatest, call } from 'redux-saga/effects';
import * as Actions from '../store/actionTypes';
import loginService from '../services/forgerockService';
import { forgerock } from 'app/config/api';
import { _cookies, FETCH_COOKIES } from 'app/auth/store/actions';
import { verifyRedirection } from 'app/main/verification/store/actions';
import { partyService } from 'app/services/party/party.service';
import _ from '@lodash';
import { saveUserState } from '../store/reducers/user.reducer';

function* loginUser(action) {
  try {
    // Login
    const response = yield call(
      loginService.loginUser,
      action.username,
      action.password
    );
    yield _cookies.setCookies({
      [forgerock.cookie.iPlanetDirectoryPro]: response.data.tokenId
    });

    yield put({
      type: Actions.LOGIN_SUCCESS,
      response: response,
      username: action.username
    });
    // Profile

    yield put(verifyRedirection());
  } catch (error) {
    yield put({
      type: Actions.LOGIN_ERROR,
      error,
      atAction: Actions.LOGIN_SUCCESS
    });
  }
}

function* sessionFetcher(arg) {
  try {
    // Profile
    const profile = yield call(loginService.userProfile);
    // TODO Remove all hardcoded values
    const loginCookieData = yield _cookies.setLoginCookieData(profile);
    // setting cookies
    yield _cookies.setCookies(loginCookieData.cookieDataSet);
    const party = yield call(
      partyService.getPartyAndRoleByUserId,
      loginCookieData.cookieDataSet.username,
      loginCookieData.loginDataSet.selectedTenant
    );
    const roles = yield call(partyService.getRolesByPartyId, party.partyId);
    const loginedUserPayload = yield {
      roles: yield _.map(roles._embedded.roles, 'partyRoleType'),
      data: {
        displayName: loginCookieData.cookieDataSet.name,
        email: loginCookieData.cookieDataSet.email,
        shortcuts: '', //['calendar', 'mail', 'contacts', 'todo'],
        userName: loginCookieData.cookieDataSet.username,
        id: loginCookieData.cookieDataSet.username,
        encodedValue: _cookies.encodeBase64(
          loginCookieData.loginDataSet.tenantIds
        ),
        userType: loginCookieData.cookieDataSet.userType
      },
      tenantIds: loginCookieData.loginDataSet.tenantIds,
      tenantCode: loginCookieData.cookieDataSet.tenantCode,
      realm: profile.realm,
      selectedTenant: loginCookieData.loginDataSet.selectedTenant
    };

    yield put({
      type: Actions.SET_INITIAL_USER_PROFILE_SETTINGS,
      payload: loginedUserPayload
    });

    yield saveUserState(loginedUserPayload);

    yield put({
      type: 'NAVIGATION_RESOURCE_START',
      tenantCode: loginCookieData.loginDataSet.defaultTenantCode,
      realm: profile.realm,
      from: 'sessionFetcher'
    });
  } catch (e) {
    console.log('sessionFetcher', e);
    return e;
  }
}

function* loginWatcher() {
  yield takeLatest(Actions.LOGIN_SUBMIT, loginUser);
}

function* sessionWatcher() {
  yield takeLatest(FETCH_COOKIES, sessionFetcher);
}

export default { loginWatcher, sessionWatcher };
