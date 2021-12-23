import { TENANT_TABS_UPDATE_START } from 'app/main/tenant/store/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import * as actions from '../store/actions';

function* tenantTabsUpdate(action) {
  const { tabsAccess } = action;
  yield put(actions.tenantTabsUpdateSuccess(tabsAccess));
}

export function* watchTenantTabsUpdate() {
  yield takeLatest(TENANT_TABS_UPDATE_START, tenantTabsUpdate);
}
