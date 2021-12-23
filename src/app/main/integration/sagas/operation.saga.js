import { put, call, all, takeLatest, select } from 'redux-saga/effects';
import * as Actions from '../store/actionTypes';
import { operation } from '../services';
import { apiServices } from 'app/config/api';
import * as fileUploadActions from 'app/store/actions/actionTypes';
import { fileUploadApi } from 'app/services/fileUploadService';

function* fetchData(req) {
  try {
    const response = yield call(operation.get, req.routeParams);
    yield put({
      type: Actions.FETCH_OPERATIONS,
      payload: response._embedded
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch operation details',
      atAction: Actions.GET_OPERATIONS
    });
  }
}

function* saveData(data) {
  try {
    yield all([
      yield call(operation.save, data.payload, data.routeParams.serviceId),
      yield put({
        type: Actions.GET_OPERATIONS,
        routeParams: data.routeParams
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.operationName} Added Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Add ${data.payload.operationName}`,
      atAction: Actions.INSERT_NEW_OPERATION
    });
    yield put({ type: Actions.GET_OPERATIONS, routeParams: data.routeParams });
  }
}

function* editData(data) {
  try {
    yield all([
      yield call(operation.update, data.payload, data.routeParams.serviceId),
      yield put({
        type: Actions.GET_OPERATIONS,
        routeParams: data.routeParams
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.operationName} Updated Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Update ${data.payload.serviceName}`,
      atAction: Actions.EDIT_OPERATION
    });
    yield put({
      type: Actions.GET_OPERATIONS,
      routeParams: data.routeParams
    });
  }
}

function* fetchById(data) {
  try {
    const response = yield call(operation.getById, data.payload.operationsId);
    yield put({
      type: Actions.FETCH_OPERATION_BY_ID,
      payload: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to fetch ${data.payload.operationName} details`,
      atAction: Actions.GET_OPERATION_BY_ID
    });
  }
}

function* fetchMapping(data) {
  try {
    const response = yield call(
      operation.getMappingByOperationId,
      data.payload
    );
    yield put({
      type: Actions.FETCH_MAPPING_BY_OPERATION,
      payload: response._embedded
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Mapping details',
      atAction: Actions.GET_MAPPING_BY_OPERATION
    });
  }
}

function* saveMapping(data) {
  try {
    yield call(
      operation.saveMappingByOperationId,
      data.payload,
      data.operationsId
    );
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Mapping Added Successfully'
    });
    yield put({ type: Actions.GET_ALL_MAPPING });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Add ${data.payload.appKey}`,
      atAction: Actions.SAVE_MAPPINGS_BY_OPERATION
    });
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
  }
}

function* updateMapping(data) {
  try {
    yield call(
      operation.updateMappingByOperationId,
      data.payload,
      data.operationsId
    );
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Mapping Updated Successfully'
    });
    yield put({ type: Actions.GET_ALL_MAPPING });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Update ${data.payload.appKey}`,
      atAction: Actions.UPDATE_MAPPINGS_BY_OPERATION
    });
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
  }
}

function* deleteMapping(data) {
  try {
    yield call(
      operation.deleteMappingByOperationId,
      data.payload,
      data.operationsId
    );
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Mapping Deleted Successfully'
    });
    yield put({ type: Actions.GET_ALL_MAPPING });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Delete ${data.payload.appKey}`,
      atAction: Actions.DELETE_MAPPINGS_BY_OPERATION
    });
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: data.operationsId
    });
  }
}

function* updateInputOperation(data) {
  try {
    const modifiedData = yield dataBindingOperations(data);
    yield call(
      operation.updateOperationDetailByPayload,
      modifiedData,
      data.key,
      data.operationId
    );
    yield put({
      type: Actions.GET_OPERATIONS,
      routeParams: data.routeParams
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `${data.key} ${data.operation} Successfully`
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to add ${data.key}`,
      atAction: Actions.UPDATE_INPUT_OPERATION
    });
  }
}

function* dataBindingOperations(data) {
  const index = yield all(
    data.oldData.findIndex((x) => x.id === data.newData.id)
  );
  if (data.operation === 'Add') {
    data.newData.id = data.randomId;
    data.oldData.push(data.newData);
  }
  if (data.operation === 'Update') {
    data.oldData[index] = data.newData;
  }
  if (data.operation === 'Delete') {
    data.oldData.splice(index, 1);
  }
  return data.oldData;
}

function* getTemplateForm() {
  try {
    const json = yield fetch(apiServices.api.getTemplateForm).then(
      (response) => {
        return response.json();
      }
    );
    yield put({ type: Actions.FETCH_TEMPLATE_FORM, json: json });
  } catch (error) {}
}

function* delById(data) {
  try {
    yield all([
      yield call(operation.delById, data.payload.operationsId),

      yield put({
        type: Actions.GET_OPERATIONS,
        routeParams: data.routeParams
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${data.payload.operationsName} Deleted Successfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Delete ${data.payload.serviceName}`,
      atAction: Actions.DELETE_OPERATION
    });
    yield put({
      type: Actions.GET_OPERATIONS,
      routeParams: data.routeParams
    });
  }
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
function* postFileToApi(item, data, operationType) {
  const json = yield call(fileUploadApi.upload, item, data, operationType);
  yield put({ type: fileUploadActions.GET_UPLOAD_ATTACHMENT, json: json });
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

function* updateTemplates(payload) {
  try {
    yield payloadAttachmentData({ data: payload.fileUpload });
    yield put({ type: fileUploadActions.FINISHED_UPLOAD });
    yield put({ type: 'API_CALL_SUCCESS', message: 'Upload Completed' });
    const attachments = yield select(
      ({ fileUpload }) => fileUpload.uploadDetails
    );
    let finalData = {
      inputTemplateLocation: [],
      outputTemplateLocation: []
    };
    if (attachments.completed) {
      finalData.inputTemplateLocation = [];
      finalData.outputTemplateLocation = [];
      attachments.messageAttachments.map((data) => {
        if (data.operationType === 'InputAttachments') {
          finalData.inputTemplateLocation.push(data);
        }

        if (data.operationType === 'OutputAttachments') {
          finalData.outputTemplateLocation.push(data);
        }
        return false;
      });
    }
    const modifiedData = yield dataBindingTemplate(payload.data, finalData);
    yield call(operation.updateTemplatePayload, modifiedData);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Template Updated Successfully`
    });
    yield put({ type: 'UPLOAD_DONE' });
    yield put({ type: fileUploadActions.RESET_UPLOAD_FILE });
    yield put({
      type: Actions.GET_OPERATIONS,
      routeParams: payload.routeParams
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Unable to Update Templates`,
      atAction: Actions.UPDATE_TEMPLATE
    });
  }
}

function* dataBindingTemplate(data, attachments) {
  yield all([
    attachments.inputTemplateLocation.map((iFile) => {
      data.inputTemplateLocation.push(iFile);
      return iFile;
    }),
    attachments.outputTemplateLocation.map((oFile) => {
      data.outputTemplateLocation.push(oFile);
      return oFile;
    })
  ]);
  return data;
}

function* updateMappingPublished(payload) {
  try {
    yield call(operation.mappingPublish, payload);
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: payload.data.operationId
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `${payload.data.appKey} ${payload.action} Successfully`
    });
    yield put({ type: Actions.GET_ALL_MAPPING });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Failed to ${payload.action}`,
      atAction: Actions.UPDATE_MAPPING_PUBLISHED
    });
    yield put({
      type: Actions.GET_MAPPING_BY_OPERATION,
      payload: payload.data.operationId
    });
  }
}

function* getTestingApi(action) {
  try {
    const { payload } = action;
    yield put({ type: Actions.GET_OPERATION_TESTING_SUCCESS, payload });
  } catch (e) {
    yield put({ type: 'API_CALL_ERROR', error: e.message });
  }
}

function* getAllMap() {
  try {
    const {
      page: { totalElements: size }
    } = yield call(operation.getOperationMapping);
    const response = yield call(operation.getOperationMapping, size);
    yield put({
      type: Actions.GET_ALL_MAPPING_SUCCESS,
      payload: response._embedded.operationRouteMappings
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Mapping details',
      atAction: 'GET_ALL_MAPPING'
    });
  }
}

export function* operationWatcher() {
  yield takeLatest(Actions.GET_OPERATIONS, fetchData);
}

export function* saveOperationWatcher() {
  yield takeLatest(Actions.INSERT_NEW_OPERATION, saveData);
}

export function* updateOperationWatcher() {
  yield takeLatest(Actions.EDIT_OPERATION, editData);
}

export function* operationByIdWatcher() {
  yield takeLatest(Actions.GET_OPERATION_BY_ID, fetchById);
}

export function* operationMappingWatcher() {
  yield takeLatest(Actions.GET_MAPPING_BY_OPERATION, fetchMapping);
}

export function* getAllMappingOperation() {
  yield takeLatest(Actions.GET_ALL_MAPPING, getAllMap);
}
export function* saveOperationMappingWatcher() {
  yield takeLatest(Actions.SAVE_MAPPINGS_BY_OPERATION, saveMapping);
}

export function* updateOperationMappingWatcher() {
  yield takeLatest(Actions.UPDATE_MAPPINGS_BY_OPERATION, updateMapping);
}

export function* deleteOperationMappingWatcher() {
  yield takeLatest(Actions.DELETE_MAPPINGS_BY_OPERATION, deleteMapping);
}

export function* updateInputOperationWatcher() {
  yield takeLatest(Actions.UPDATE_INPUT_OPERATION, updateInputOperation);
}

export function* getTemplateFormWatcher() {
  yield takeLatest(Actions.GET_TEMPLATE_FORM, getTemplateForm);
}

export function* deleteOperationWatcher() {
  yield takeLatest(Actions.DELETE_OPERATION, delById);
}

export function* testOperationWatcher() {
  yield takeLatest(Actions.GET_OPERATION_TESTING_START, getTestingApi);
}
export function* updateTemplateWatcher() {
  yield takeLatest(Actions.INSERT_TEMPLATE, updateTemplates);
}

export function* mappingPublishedWatcher() {
  yield takeLatest(Actions.UPDATE_MAPPING_PUBLISHED, updateMappingPublished);
}
