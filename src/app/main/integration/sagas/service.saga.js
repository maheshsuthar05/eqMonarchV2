import { put, call, all, takeLatest } from 'redux-saga/effects';
import * as Actions from '../store/actionTypes';
import { services } from '../services';
import { apiServices } from 'app/config/api';

function* fetchData(req) {
  try {
    const {
      page: { totalElements: size }
    } = yield call(services.get, req.page, req.size);
    const response = yield call(services.get, req.page, size);
    yield put({
      type: Actions.FETCH_SERVICES,
      payload: response._embedded,
      page: response.page
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch service details',
      atAction: Actions.GET_SERVICES
    });
  }
}

function* saveService(data) {
  try {
    yield all([
      yield call(services.save, data.payload),
      yield put({ type: Actions.GET_SERVICES }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.serviceName} Added Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Add ${data.payload.serviceName}`,
      atAction: Actions.INSERT_NEW_SERVICE
    });
    yield put({ type: Actions.GET_SERVICES });
  }
}

function* deleteService(data) {
  try {
    yield all([
      yield call(services.delById, data.payload.serviceId),
      yield put({ type: Actions.GET_SERVICES }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.serviceName} Deleted Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Delete ${data.payload.serviceName}`,
      atAction: Actions.DELETE_SERVICE
    });
    yield put({ type: Actions.GET_SERVICES });
  }
}

function* editService(data) {
  try {
    yield all([
      yield call(services.update, data.payload),
      yield put({ type: Actions.GET_SERVICES }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.serviceName} Updated Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Update ${data.payload.serviceName}`,
      atAction: Actions.EDIT_SERVICE
    });
    yield put({ type: Actions.GET_SERVICES });
  }
}

function* fetchByID(req) {
  try {
    const response = yield call(services.getByID, req.payload.serviceId);
    yield put({
      type: Actions.FETCH_SERVICES_BY_ID,
      payload: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch service details',
      atAction: Actions.GET_SERVICES_BY_ID
    });
  }
}

function* getServiceUploadForm() {
  try {
    const json = yield fetch(apiServices.api.getServiceUploadForm).then(
      (response) => {
        return response.json();
      }
    );
    yield put({ type: Actions.FETCH_SERVICE_UPLOAD_FORM, payload: json });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch service upload form',
      atAction: Actions.GET_SERVICE_UPLOAD_FORM
    });
  }
}

function* getServiceListDownload(action) {
  const { id } = action;
  try {
    yield call(services.serviceListDownlod, id);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to download service list',
      atAction: Actions.GET_SERVICE_LIST_DOWNLOAD
    });
  }
}

function* getServiceListUpload(action) {
  const { payload } = action;
  try {
    yield all([
      yield call(services.serviceListUpload, payload),
      yield put({ type: Actions.GET_SERVICES }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Service List has been uploaded successfully'
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to upload service details',
      atAction: Actions.GET_SERVICE_LIST_UPLOAD
    });
  }
}

export function* serviceWatcher() {
  yield takeLatest(Actions.GET_SERVICES, fetchData);
}

export function* saveServiceWatcher() {
  yield takeLatest(Actions.INSERT_NEW_SERVICE, saveService);
}

export function* deleteServiceWatcher() {
  yield takeLatest(Actions.DELETE_SERVICE, deleteService);
}

export function* editServiceWatcher() {
  yield takeLatest(Actions.EDIT_SERVICE, editService);
}

export function* serviceByIdWatcher() {
  yield takeLatest(Actions.GET_SERVICES_BY_ID, fetchByID);
}

export function* getServiceUploadFormWatcher() {
  yield takeLatest(Actions.GET_SERVICE_UPLOAD_FORM, getServiceUploadForm);
}

export function* getServiceListDownloadWatcher() {
  yield takeLatest(Actions.GET_SERVICE_LIST_DOWNLOAD, getServiceListDownload);
}

export function* getServiceListUploadWatcher() {
  yield takeLatest(Actions.GET_SERVICE_LIST_UPLOAD, getServiceListUpload);
}
