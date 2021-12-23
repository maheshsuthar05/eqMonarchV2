import { put, takeLatest, all } from 'redux-saga/effects';
import * as actions from 'app/common/store/actionTypes';
import _ from '@lodash';

function* getChangelogRequestPayload(action) {
  try {
    const requestFilters = [];
    yield all(
      _.map(action.payload, (res) => {
        if (!_.isUndefined(res) && !_.isNull(res) && !_.isEmpty(res)) {
          requestFilters.push({
            columnKey: 'OBJECT_ID.keyword',
            columnValue: res
          });
        }
      })
    );

    const requestPayload = {
      from: 0,
      size: 100,
      sortFieldName: 'UPDATED_DATE',
      sortOrder: 'DESC',
      filters: requestFilters
    };
    yield put({
      type: actions.REQUEST_CHANGE_LOG_PAYLOAD_SUCCESS,
      payload: requestPayload
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch the property changelog',
      atAction: actions.REQUEST_CHANGE_LOG_PAYLOAD_START
    });
  }
}

export function* watchGetChangelogRequestPayload() {
  yield takeLatest(
    actions.REQUEST_CHANGE_LOG_PAYLOAD_START,
    getChangelogRequestPayload
  );
}
