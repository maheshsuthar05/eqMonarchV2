import {
    put,
    takeLatest
} from 'redux-saga/effects';

import * as Actions from '../store/actionTypes';
import { flowable } from 'app/config/api';

function* fetchFlowableMailComposeData(action) {
    try {
      const source =
        action?.source === undefined || action.source === ''
          ? ''
          : action?.source.toUpperCase();
      const json = yield fetch(flowable.api.mailCompose(source)).then(
        (response) => {
          return response.json();
        }
      );
      yield put({ type: Actions.FETCH_MAIL_COMPOSE_FORM, json: json });
    } catch (error) {
      yield put({
        type: 'API_CALL_ERROR',
        error: error.message,
        atAction: Actions.FETCH_MAIL_COMPOSE_FORM
      });
    }
  }

function* composeWatcher() {
    yield takeLatest(Actions.GET_MAIL_COMPOSE_FORM, fetchFlowableMailComposeData);
}

export default composeWatcher;