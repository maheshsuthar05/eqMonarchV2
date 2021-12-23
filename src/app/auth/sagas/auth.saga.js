import history from '@history';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import resourceService from '../services/resourceService';
import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions';
import { contextInfo } from 'app/common/helpers/common-helper';
import Cookies from 'js-cookie';

function* dashboardCurrentTenant(action) {
  try {
    const externalDetails = yield call(
      resourceService.getExternalURLs,
      action.tenantCode
    );
    const contextData = contextInfo();
    if (
      contextData.userType === undefined ||
      contextData.userType.trim() === '' ||
      contextData.userType.trim().toLowerCase() === 'servicer'
    ) {
      yield all([
        yield put({
          type: appActions.TENANT_FETCH_START
        }),
        yield put({
          type: Actions.DASHBOARD_CURRENT_TENANT_SUCCESS,
          externalURLs: externalDetails.externalURLs,
          datastudioAuth: externalDetails.dataStudioAuth
        })
      ]);
    } else {
      yield put({
        type: Actions.DASHBOARD_CURRENT_TENANT_SUCCESS,
        externalURLs: externalDetails.externalURLs,
        datastudioAuth: externalDetails.dataStudioAuth
      });
    }
  } catch (error) {
    yield put({
      type: Actions.API_CALL_ERROR,
      error: error.message,
      atAction: Actions.DASHBOARD_CURRENT_TENANT_SUCCESS
    });
  }
}

function* dashboardCurrentTenantWatcher() {
  yield takeLatest(
    Actions.DASHBOARD_CURRENT_TENANT_START,
    dashboardCurrentTenant
  );
}

function* dashboardSelectedResource(action) {
  try {
    yield put({
      type: Actions.DASHBOARD_SET_SELECTED_RESOURCE_SUCCESS,
      selectedResource: action.selectedResource
    });
    history.push(action.selectedResource.url);
  } catch (error) {
    yield put({
      type: Actions.API_CALL_ERROR,
      error: error.message,
      atAction: Actions.DASHBOARD_SET_SELECTED_RESOURCE_SUCCESS
    });
  }
}

function* dashboardSelectedResourceWatcher() {
  yield takeLatest(
    Actions.DASHBOARD_SET_SELECTED_RESOURCE_START,
    dashboardSelectedResource
  );
}

function* datastudioRedirect(action) {
  try {
    if (action.tenantCodeChange) {
      Cookies.remove('metabase.SESSION', {
        path: '/',
        domain: '.altisource.com'
      });
    }
    const response = yield call(
      resourceService.authRedirectURLs,
      action.authDetails[0].username,
      action.authDetails[0].password
    );
    if (response?.id) {
      yield put({
        type: Actions.DATASTUDIO_REDIRECT_SUCCESS,
        rediect: true
      });
    }
  } catch (error) {
    yield put({
      type: Actions.DATASTUDIO_REDIRECT_FAILURE
    });
  }
}

function* datastudioRedirectWatcher() {
  yield takeLatest(Actions.DATASTUDIO_REDIRECT_START, datastudioRedirect);
}

export default {
  dashboardCurrentTenantWatcher,
  dashboardSelectedResourceWatcher,
  datastudioRedirectWatcher
};
