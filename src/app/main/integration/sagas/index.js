import { all } from 'redux-saga/effects';

import {
  serviceWatcher,
  saveServiceWatcher,
  deleteServiceWatcher,
  editServiceWatcher,
  serviceByIdWatcher,
  getServiceUploadFormWatcher,
  getServiceListDownloadWatcher,
  getServiceListUploadWatcher
} from './service.saga';

import {
  operationWatcher,
  saveOperationWatcher,
  updateOperationWatcher,
  operationByIdWatcher,
  operationMappingWatcher,
  updateInputOperationWatcher,
  getTemplateFormWatcher,
  deleteOperationWatcher,
  saveOperationMappingWatcher,
  updateOperationMappingWatcher,
  deleteOperationMappingWatcher,
  testOperationWatcher,
  updateTemplateWatcher,
  mappingPublishedWatcher,
  getAllMappingOperation
} from './operation.saga';

export default function* integrationSaga() {
  yield all([
    getServiceListUploadWatcher(),
    getServiceListDownloadWatcher(),
    getServiceUploadFormWatcher(),
    serviceWatcher(),
    saveServiceWatcher(),
    deleteServiceWatcher(),
    editServiceWatcher(),
    serviceByIdWatcher(),
    operationWatcher(),
    saveOperationWatcher(),
    updateOperationWatcher(),
    operationByIdWatcher(),
    operationMappingWatcher(),
    updateInputOperationWatcher(),
    getTemplateFormWatcher(),
    deleteOperationWatcher(),
    saveOperationMappingWatcher(),
    updateOperationMappingWatcher(),
    deleteOperationMappingWatcher(),
    testOperationWatcher(),
    updateTemplateWatcher(),
    mappingPublishedWatcher(),
    getAllMappingOperation()
  ]);
}
