import { call, put, takeLatest, all } from 'redux-saga/effects';

import { fileUploadApi } from '../services/fileUploadService';
import * as Actions from 'app/store/actions/actionTypes';

function* postFileToMap(payload) {
  try {
    yield all([
      yield payloadAttachmentData(payload),
      yield put({ type: Actions.FINISHED_UPLOAD }),
      yield put({ type: 'API_CALL_SUCCESS', message: 'Upload Completed' })
    ]);
  } catch (error) {
    yield put({
      type: Actions.API_CALL_ERROR,
      error: 'Upload failed',
      atAction: Actions.POST_UPLOAD_ATTACHMENT
    });
  }
}

function* postFileToApi(item, data, operationType) {
  const json = yield call(fileUploadApi.upload, item, data, operationType);
  yield put({ type: Actions.GET_UPLOAD_ATTACHMENT, json: json });
}

function* payloadAttachmentData(payload) {
  payload.hasOwnProperty('messageAttachments')
    ? yield all(
        payload.data.messageAttachments.map((item) =>
          postFileToApi(item, payload.data)
        )
      )
    : yield fetchFileByPropertyAndArray(payload.data);
}

function* fetchFileByPropertyAndArray(data) {
  yield all(
    Object.keys(data).map((keys) => {
      if (Array.isArray(data[keys])) {
        return fetchThruArrayKeys(data[keys], data, keys);
      }
      return false;
    })
  );
}

function* fetchThruArrayKeys(data, payload, operationType) {
  yield all(
    data.map((obj) => {
      if (obj.status === 6) {
        return postFileToApi(obj, payload, operationType);
      }
      return false;
    })
  );
}

function* fileUploadWatcher() {
  yield takeLatest(Actions.POST_UPLOAD_ATTACHMENT, postFileToMap);
}

export default fileUploadWatcher;
