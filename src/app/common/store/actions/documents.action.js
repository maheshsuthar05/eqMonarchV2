import {
  DOCUMENTS_DELETE_START,
  DOCUMENTS_LIST_START,
  DOCUMENTS_LIST_SUCCESS
} from 'app/common/store/actionTypes';

export const documentsDeleteStart = (fileURL, fileCategoryType, propId) => ({
  type: DOCUMENTS_DELETE_START,
  fileURL,
  fileCategoryType,
  propId
});

export const getDocumentsListStart = (propertyId) => ({
  type: DOCUMENTS_LIST_START,
  propertyId
});

export const getDocumentsListSuccess = (payload) => ({
  type: DOCUMENTS_LIST_SUCCESS,
  payload
});
