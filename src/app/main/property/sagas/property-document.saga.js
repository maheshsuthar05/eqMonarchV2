import * as actions from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { documentApi } from '../services/document.api';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';
import { closeModal } from 'app/store/actions';

function* getPropertyPreviewFileData(action) {
  const { propertyId } = action;
  try {
    const documentList = yield call(documentApi.propertyPreviewFileData, {
      propertyId
    });
    const meesageDocumentList = yield call(
      documentApi.propertyPreviewFileData,
      { fileCatType: 'message', propertyId }
    );
    const {
      _embedded: { eqFiles: messageDocList }
    } = meesageDocumentList;
    const messageFilterList = messageDocList.filter(
      (res) => res.fileCategoryType === 'Message'
    );
    const {
      _embedded: { eqFiles: propertyDocList }
    } = documentList;
    const propertyModifiedList = propertyDocList.concat(messageFilterList);
    yield put(
      propertyActions.getPropertyPreviewFileDataSuccess(propertyModifiedList)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch the document list',
      atAction: actions.PROPERTY_DOCUMENT_PREVIEW_FILE_DATA
    });
  }
}

export function* watchGetPropertyPreviewFileData() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_PREVIEW_FILE_DATA,
    getPropertyPreviewFileData
  );
}

export function* getPropertyDocumentUploadForm() {
  try {
    const formDefinition = yield call(documentApi.propertyDocumentUploadForm);
    yield put(
      propertyActions.fetchPropertyDocumentUploadFormSuccess(formDefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property upload form',
      atAction: actions.PROPERTY_DOCUMENT_UPLOAD_FORM
    });
  }
}

export function* watchGetPropertyDocumentUploadForm() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_UPLOAD_FORM,
    getPropertyDocumentUploadForm
  );
}

export function* getPropertyDocumentPreviewForm() {
  try {
    const formDefinition = yield call(documentApi.propertyDocumentPreviewForm);
    yield put(
      propertyActions.fetchPropertyDocumentPreviewFormSuccess(formDefinition)
    );
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch property preview form',
      atAction: actions.PROPERTY_DOCUMENT_PREVIEW_FORM
    });
  }
}

export function* watchGetPropertyDocumentPreviewForm() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_PREVIEW_FORM,
    getPropertyDocumentPreviewForm
  );
}

function* getPropertyDocumentForm() {
  try {
    const formDefinition = yield call(
      documentApi.getPropertyDocumentFormDefinition
    );
    yield put(propertyActions.fetchPropertyDocumentFormSuccess(formDefinition));
  } catch (error) {
    yield put(propertyActions.fetchPropertyDocumentFormFailure(error.message));
  }
}

export function* watchGetPropertyDocumentForm() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_FORM_FETCH_START,
    getPropertyDocumentForm
  );
}

function* deletePropertyDocument(action) {
  try {
    const deleteResponse = yield call(
      documentApi.deletePropertyDocument,
      action.tenantCode,
      action.deleteFileURL,
      action.fileCategoryType
    );

    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'File deleted successfully.'
    });
    yield put(propertyActions.documentDeleteSuccess(deleteResponse));
    yield put(propertyActions.documentTabReloadStart());
    yield put(propertyActions.documentTabReloadSuccess());
  } catch (error) {
    yield put(propertyActions.documentTabReloadSuccess());
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Could not delete file. Please contact system Admin.',
      atAction: actions.PROPERTY_DOCUMENT_DELETE_START
    });
  }
}

export function* watchDeletePropertyDocument() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_DELETE_START,
    deletePropertyDocument
  );
}

function* uploadPropertyDocument(action) {
  try {
    const uploadResponse = yield call(
      documentApi.uploadPropertyDocument,
      action.tenantCode,
      action.payload,
      action.fileCategoryType,
      action.investorId,
      action.propertyId
    );

    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'File uploaded successfully.'
    });
    yield put(propertyActions.documentUploadSuccess(uploadResponse));
    yield put(propertyActions.documentTabReloadStart());
    yield put(propertyActions.documentTabReloadSuccess());
    yield put(closeModal());
  } catch (error) {
    yield put(propertyActions.documentTabReloadSuccess());
    yield put(closeModal());
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Could not upload file. Please contact system Admin.',
      atAction: actions.PROPERTY_DOCUMENT_UPLOAD_START
    });
  }
}

export function* watchUploadPropertyDocument() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_UPLOAD_START,
    uploadPropertyDocument
  );
}

function* downloadPropertyDocument(action) {
  try {
    window.open(`${action.fileURL}?view=${action.viewType}`, '_blank');
    yield put(propertyActions.documentDownloadSuccess());
  } catch (error) {
    yield put(propertyActions.documentDownloadFailure(error.message));
  }
}

export function* watchDownloadPropertyDocument() {
  yield takeLatest(
    actions.PROPERTY_DOCUMENT_DOWNLOAD_START,
    downloadPropertyDocument
  );
}

function* getS3FileData(action) {
  const { fileCatType, propertyId } = action;
  try {
    const response = yield call(
      propertyApi.getS3FileData,
      fileCatType,
      propertyId
    );

    yield put({
      type: actions.GET_FILES_S3_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'File fetch failed',
    });
  }
}

export function* watchGetS3FileData() {
  yield takeLatest(
    actions.GET_FILES_S3_START,
    getS3FileData
  );
}