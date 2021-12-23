import { PROPERTY_TABS_UPDATE_START } from 'app/main/property/store/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import * as propertyActions from '../store/actions';

function* propertyTabsUpdate(action) {
  const { tabsAccess } = action;
  yield put(propertyActions.propertyTabsUpdateSuccess(tabsAccess));
}

export function* watchPropertyTabsUpdate() {
  yield takeLatest(PROPERTY_TABS_UPDATE_START, propertyTabsUpdate);
}
