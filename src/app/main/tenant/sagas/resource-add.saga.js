import {
  RESOURCE_ADD_START,
  RESOURCE_VIEW_START,
  RESOURCE_EDIT_START,
  RESOURCE_DELETE_START,
  RESOURCE_LISTING_FORM_FETCH_START,
  RESOURCE_DOWNLOAD_FILE,
  RESOURCE_UPLOAD_FILE,
  RESOURCE_ADD_FORM_FETCH_START,
  RESOURCE_DELETE_SUCCESS,
  RESOURCE_SINK_START,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_EDIT_SUCCESS,
  RESOURCE_UPLOAD_FILE_SUCCESS
} from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as actions from '../store/actions';
import { closeModal } from 'app/store/actions';

function* resourceAdd(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.resourceAdd, tenantCode, payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Resource added successfully'
      }),
      yield put({ type: RESOURCE_ADD_SUCCESS }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Add resource failed'
    });
    yield put({
      type: 'RESOURCE_ADD_START_FAILURE'
    });
    yield put(closeModal());
  }
}

export function* watchResourceAdd() {
  yield takeLatest(RESOURCE_ADD_START, resourceAdd);
}

function* resourceView(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.resourceView, tenantCode, payload);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'View resource failed'
    });
    yield put({
      type: 'RESOURCE_VIEW_START_FAILURE'
    });
  }
}

export function* watchResourceView() {
  yield takeLatest(RESOURCE_VIEW_START, resourceView);
}

function* resourceEdit(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.resourceEdit, tenantCode, payload);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Resource edited successfully'
      }),
      yield put({ type: RESOURCE_EDIT_SUCCESS }),
      yield put(closeModal())
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Edit resource failed'
    });
    yield put({
      type: 'RESOURCE_EDIT_START_FAILURE'
    });
    yield put(closeModal());
  }
}

export function* watchResourceEdit() {
  yield takeLatest(RESOURCE_EDIT_START, resourceEdit);
}

function* resourceDelete(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.resourceDelete, tenantCode, payload);
    yield [
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Resource deleted successfully'
      }),
      yield put({
        type: RESOURCE_DELETE_SUCCESS
      })
    ];
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Delete resource failed'
    });
    yield put({
      type: 'RESOURCE_DELETE_START_FAILURE'
    });
  }
}

export function* watchResourceDelete() {
  yield takeLatest(RESOURCE_DELETE_START, resourceDelete);
}

function* getResourceListingForm() {
  try {
    const formDefinition = yield call(tenantApi.getResourceListFormDefinition);
    yield put(actions.fetchResourceListingFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Resource listing form load failed',
      atAction: RESOURCE_LISTING_FORM_FETCH_START
    });
  }
}

export function* watchGetResourceListingForm() {
  yield takeLatest(RESOURCE_LISTING_FORM_FETCH_START, getResourceListingForm);
}

function* getResourceAddForm() {
  try {
    const formDefinition = yield call(tenantApi.getResourceAddFormDefinition);
    yield put(actions.fetchResourceAddFormSuccess(formDefinition));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Resource add form load failed',
      atAction: RESOURCE_ADD_FORM_FETCH_START
    });
  }
}

export function* watchGetResourceAddForm() {
  yield takeLatest(RESOURCE_ADD_FORM_FETCH_START, getResourceAddForm);
}

function* uploadResourceFile(action) {
  const { tenantCode, payload } = action;
  try {
    yield call(tenantApi.uploadFile, tenantCode, payload);
    yield put(closeModal())
    yield put({
      type: RESOURCE_UPLOAD_FILE_SUCCESS,
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'File Uploaded successfully'
    });
  } catch (error) {
    yield put(closeModal())
    yield put({
      type: 'API_CALL_ERROR',
      error: error.message,
      atAction: RESOURCE_UPLOAD_FILE
    });
  }
}

export function* watchUploadResourceFile() {
  yield takeLatest(RESOURCE_UPLOAD_FILE, uploadResourceFile);
}

function* downloadResourceFile() {
  try {
    yield call(tenantApi.downloadFile);
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: RESOURCE_DOWNLOAD_FILE
    });
  }
}

export function* watchDownloadResourceFile() {
  yield takeLatest(RESOURCE_DOWNLOAD_FILE, downloadResourceFile);
}

function* resourceSink() {
  try {
    const sinkResponse = yield call(tenantApi.resourceSink);
    if (sinkResponse)
      yield put({ type: 'API_CALL_SUCCESS', message: sinkResponse.data });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: e.message,
      atAction: RESOURCE_SINK_START
    });
  }
}

export function* watchResourceSink() {
  yield takeLatest(RESOURCE_SINK_START, resourceSink);
}
