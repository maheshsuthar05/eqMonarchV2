import * as Actions from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as action from '../store/actions';
import * as appActions from 'app/store/actions/actionTypes';
function* fetchTenantListForm() {
  try {
    const formDefinition = yield call(tenantApi.getTenantListFormDefination);
    yield put(action.fetchTenantListFormSuccess(formDefinition));
  } catch (error) {
    yield put({ type: 'API_CALL_ERROR', error: error.response.message });
  }
}

export function* watchFetchTenantListForm() {
  yield takeLatest(Actions.TENANT_LIST_FORM_FETCH_START, fetchTenantListForm);
}

function* fetchTenant() {
  try {
    const tenant = yield call(tenantApi.getTenantList);
    yield put(action.fetchTenantSuccess(tenant));
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Error while Fetching Tenant Details'
    });
  }
}

export function* watchFetchTenant() {
  yield takeLatest(Actions.TENANT_FETCH_START, fetchTenant);
}
