import { put, takeLatest, call } from 'redux-saga/effects';

import * as PropertyActions from '../store/actionTypes';
import { propertyApi } from '../services/property.api';

function* getAllProperties() {
  try {
    const json = yield call(propertyApi.getAllByTenantID);
    yield put({ type: PropertyActions.GET_LIST_OF_PROPERTIES, json: json });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to fetch all properties',
      atAction: PropertyActions.FETCH_LIST_OF_PROPERTIES
    });
  }
}

function* propertyGetAllWatcher() {
  yield takeLatest(PropertyActions.FETCH_LIST_OF_PROPERTIES, getAllProperties);
}

export default propertyGetAllWatcher;
