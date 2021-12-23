import * as actions from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { mailBox } from '../services/mail-box.api';

export function* getPropertyLegacyMessage() {
  try {
    const legacy = yield call(mailBox.legacyMessage);
    yield put({
      type: actions.PROPERTY_GET_LEGACY_MESSAGES_SUCCESS,
      payload: legacy
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch legacy message details',
      atAction: actions.PROPERTY_GET_LEGACY_MESSAGES_START
    });
  }
}

export function* watchGetPropertyLegacyMessage() {
  yield takeLatest(
    actions.PROPERTY_GET_LEGACY_MESSAGES_START,
    getPropertyLegacyMessage
  );
}
