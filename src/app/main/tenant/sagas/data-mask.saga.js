import {
  DATA_MASK_ADD_START,
  DATA_MASK_ADD_SUCCESS,
  DATA_MASK_ADD_FAILURE
} from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';

function* addDataMask(action) {
  try {
    yield call(tenantApi.addDataMask, action.payload);
    yield all([
      yield put({
        type: DATA_MASK_ADD_SUCCESS
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Mask added successfully'
      })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Data mask add failed'
      }),
      yield put({
        type: DATA_MASK_ADD_FAILURE
      })
    ]);
  }
}

export function* watchAddDataMask() {
  yield takeLatest(DATA_MASK_ADD_START, addDataMask);
}
