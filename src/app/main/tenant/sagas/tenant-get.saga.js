import { TENANT_GET_START } from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as action from '../store/actions';

function* getTenantById(state) {
  try {
    const response = yield call(tenantApi.getTenantList);
    yield put(action.tenantGetSuccess(response));
  } catch (error) {
    yield put({ type: 'API_CALL_ERROR', error: error.response.message });
  }
}

export function* watchGetTenantById() {
  yield takeLatest(TENANT_GET_START, getTenantById);
}
