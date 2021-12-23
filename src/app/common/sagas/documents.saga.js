import { put, takeLatest, call } from 'redux-saga/effects';
import { documentServices } from 'app/common/services/documents.service';
import {
  getDocumentsListSuccess,
  getDocumentsListStart
} from 'app/common/store/actions';
import {
  DOCUMENTS_DELETE_START,
  DOCUMENTS_DELETE_SUCCESS,
  DOCUMENTS_LIST_START
} from 'app/common/store/actionTypes';
import { closeDialog } from 'app/store/actions';

function* documentDelete(action) {
  const { fileURL, fileCategoryType, propId } = action;
  try {
    yield call(documentServices.deleteDocument, fileURL, fileCategoryType);
    yield put({ type: DOCUMENTS_DELETE_SUCCESS });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Document Deleted Successfully'
    });
    yield put(getDocumentsListStart(propId));
    yield put(closeDialog());
  } catch (error) {
    yield put({ type: DOCUMENTS_DELETE_SUCCESS });
    yield put(closeDialog());
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to delete the document',
      atAction: DOCUMENTS_DELETE_START
    });
  }
}

function* getDocumentsList(action) {
  const { propertyId } = action;
  try {
    const {
      _embedded: { eqFiles: propertyDocList }
    } = yield call(documentServices.getDocumentsList, propertyId);
    yield put(getDocumentsListSuccess(propertyDocList));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch the document list',
      atAction: DOCUMENTS_LIST_START
    });
  }
}

export function* watchDocumentDelete() {
  yield takeLatest(DOCUMENTS_DELETE_START, documentDelete);
}

export function* watchGetDocumentsList() {
  yield takeLatest(DOCUMENTS_LIST_START, getDocumentsList);
}
