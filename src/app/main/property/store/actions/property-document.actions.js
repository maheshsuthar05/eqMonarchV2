import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const getFileCategoryType=(rowPayload)=>({
  type:actions.PROPERTY_FILE_CATEGORY_TYPE,
  rowPayload
})
export const getPropertyPreviewFileData=(propertyId)=>({
  type:actions.PROPERTY_DOCUMENT_PREVIEW_FILE_DATA,
  propertyId
})
export const getPropertyPreviewFileDataSuccess=(payload)=>({
  type:actions.PROPERTY_DOCUMENT_PREVIEW_FILE_DATA_SUCCESS,
  payload
})
export const resetPreviewFileData=()=>({
  type:actions.RESET_PREVIEW_FILE_DATA
})
export const fetchPropertyDocumentUploadForm = () => ({
  type: actions.PROPERTY_DOCUMENT_UPLOAD_FORM
});

export const fetchPropertyDocumentPreviewForm = () => ({
  type: actions.PROPERTY_DOCUMENT_PREVIEW_FORM
});

export const fetchPropertyDocumentUploadFormSuccess = (payload) => ({
  type: actions.PROPERTY_DOCUMENT_UPLOAD_FORM_SUCCESS,
  payload
});

export const fetchPropertyDocumentPreviewFormSuccess = (payload) => ({
  type: actions.PROPERTY_DOCUMENT_PREVIEW_FORM_SUCCESS,
  payload
});

export const fetchPropertyDocumentFormStart = () => ({
  type: actions.PROPERTY_DOCUMENT_FORM_FETCH_START
});

export const fetchPropertyDocumentFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_DOCUMENT_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchPropertyDocumentFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DOCUMENT_FORM_FETCH_SUCCESS,
  payload: error
});

export const documentDeleteStart = (
  tenantCode,
  deleteFileURL,
  fileCategoryType,
  deleteToaster
) => ({
  type: actions.PROPERTY_DOCUMENT_DELETE_START,
  deleteFileURL: deleteFileURL,
  tenantCode: tenantCode,
  fileCategoryType: fileCategoryType,
  deleteToaster: deleteToaster
});

export const documentDeleteSuccess = (response) => ({
  type: actions.PROPERTY_DOCUMENT_DELETE_SUCCESS,
  response: response
});

export const documentDeleteFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DOCUMENT_UPLOAD_SUCCESS,
  error: error
});

export const documentUploadStart = (
  tenantCode,
  payload,
  fileCategoryType,
  investorId,
  propertyId,
  uploadToaster
) => ({
  type: actions.PROPERTY_DOCUMENT_UPLOAD_START,
  payload: payload,
  tenantCode: tenantCode,
  fileCategoryType: fileCategoryType,
  investorId: investorId,
  propertyId: propertyId,
  uploadToaster: uploadToaster
});

export const documentUploadSuccess = (response) => ({
  type: actions.PROPERTY_DOCUMENT_UPLOAD_SUCCESS,
  response: response
});

export const documentUploadFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DOCUMENT_UPLOAD_SUCCESS,
  error: error
});

export const documentDownloadStart = (fileURL, viewType) => ({
  type: actions.PROPERTY_DOCUMENT_DOWNLOAD_START,
  fileURL: fileURL,
  viewType: viewType
});

export const documentDownloadSuccess = () => ({
  type: actions.PROPERTY_DOCUMENT_DOWNLOAD_SUCCESS
});

export const documentDownloadFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DOCUMENT_DOWNLOAD_SUCCESS,
  error: error
});

export const documentTabReloadStart = () => ({
  type: actions.PROPERTY_DOCUMENT_TAB_RELOAD_START
});

export const documentTabReloadSuccess = () => ({
  type: actions.PROPERTY_DOCUMENT_TAB_RELOAD_SUCCESS
});

export const getS3FileDataStart = (fileCatType,propertyId) => ({
  type: actions.GET_FILES_S3_START,
  fileCatType,
  propertyId
});

export const getS3FileDataSuccess = (payload) => ({
  type: actions.GET_FILES_S3_SUCCESS,
  payload
});
