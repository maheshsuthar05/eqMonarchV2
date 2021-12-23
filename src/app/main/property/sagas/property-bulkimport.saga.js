import { call, put, takeLatest } from 'redux-saga/effects';
import { bulkImportApi } from '../services/bulkimport.api';
import * as actions from 'app/main/property/store/actionTypes';
import { closeModal } from 'app/store/actions';

function* uploadTemplate(action) {
  const { tenantCode, payload, fileCategoryType } = action;
  try {
    yield call(
      bulkImportApi.uploadTemplate,
      tenantCode,
      payload,
      fileCategoryType
    );
    yield put(closeModal());
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Template has been uploaded successfully`
    });
    yield put({ type: actions.PROPERTY_TEMPLATE_UPLOAD_SUCCESS });
    yield put({ type: actions.PROPERTY_TEMPLATE_LIST_REFRESH });
  } catch (error) {
    yield put(closeModal());
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Could not able to upload template.',
      atAction: actions.PROPERTY_TEMPLATE_UPLOAD_START
    });
    yield put({ type: actions.PROPERTY_TEMPLATE_UPLOAD_SUCCESS });
  }
}

function* downloadTemplate(action) {
  const { s3Url } = action;
  try {
    yield call(bulkImportApi.downloadTemplate, s3Url);
    yield put({ type: actions.PROPERTY_TEMPLATE_DOWNLOAD_SUCCESS });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Could not able to download template.',
      atAction: actions.PROPERTY_TEMPLATE_DOWNLOAD_START
    });
  }
}

function* getErrorFileDetails(action) {
  const { batchId } = action;
  try {
    const getError = yield call(bulkImportApi.getErrorFileDetails, batchId);
    yield put({
      type: actions.PROPERTY_GET_ERROR_FILE_DETAILS_SUCCESS,
      payload: getError._embedded.eqFiles
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Could not able to fetch error details.',
      atAction: actions.PROPERTY_GET_ERROR_FILE_DETAILS_START
    });
  }
}

export function* watchGetErrorFileDetails() {
  yield takeLatest(
    actions.PROPERTY_GET_ERROR_FILE_DETAILS_START,
    getErrorFileDetails
  );
}

export function* watchPropertyDownloadTemplate() {
  yield takeLatest(actions.PROPERTY_TEMPLATE_DOWNLOAD_START, downloadTemplate);
}

export function* watchPropertyUploadTemplate() {
  yield takeLatest(actions.PROPERTY_TEMPLATE_UPLOAD_START, uploadTemplate);
}
