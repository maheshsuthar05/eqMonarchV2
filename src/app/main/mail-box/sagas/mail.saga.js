import { put, takeLatest, call } from 'redux-saga/effects';

import * as Actions from '../store/actionTypes';
import { messageApi } from '../services/message.service';

function* fetchById(routeParams) {
  try {
    const jsonById = yield call(messageApi.getById, routeParams);
    yield put({
      type: Actions.GET_MAIL,
      routeParams: routeParams,
      payload: jsonById
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Message',
      atAction: Actions.GET_MAILS
    });
  }
}

function* updateById(routeParams) {
  try {
    yield call(messageApi.updateById, routeParams.routeParams.mailId);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Message update failed',
      atAction: Actions.GET_MAILS
    });
  }
}

export function* mailByIdWatcher() {
  yield takeLatest(Actions.FETCH_MAIL_BY_ID, fetchById);
}

export function* updateMailById() {
  yield takeLatest(Actions.UPDATE_MAIL_BY_ID, updateById);
}
