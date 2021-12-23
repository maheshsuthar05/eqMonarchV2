import * as actions from 'app/main/property/store/actionTypes';

export const templateUploadStart = (tenantCode, payload, fileCategoryType) => ({
  type: actions.PROPERTY_TEMPLATE_UPLOAD_START,
  payload,
  tenantCode,
  fileCategoryType
});

export const templateDownloadStart = (s3Url) => ({
  type: actions.PROPERTY_TEMPLATE_DOWNLOAD_START,
  s3Url
});

export const getErrorFileDetails = (batchId) => ({
  type: actions.PROPERTY_GET_ERROR_FILE_DETAILS_START,
  batchId
});
