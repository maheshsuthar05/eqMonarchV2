import { put, takeLatest, call, all } from 'redux-saga/effects';

import * as Actions from '../store/actionTypes';
import { messageApi } from '../services/message.service';

function* fetchMessageComposeData(payload) {
  try {
    const json = yield call(
      messageApi.message,
      payload.data,
      //payload.attachment
    );
    yield all([
      yield put({ type: Actions.GET_MAIL_COMPOSE_DATA, json: json }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Message sent successfully'
      })
    ]);
  } catch (error) {
    console.log(error);
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Message sent Failed',
      atAction: Actions.POST_MAIL_COMPOSE_DATA
    });
  }
}

function* messageWatcher() {
  yield takeLatest(Actions.POST_MAIL_COMPOSE_DATA, fetchMessageComposeData);
}

export default messageWatcher;
