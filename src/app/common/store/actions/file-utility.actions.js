import * as Actions from '../actionTypes';

export const downloadFileStart = (fileUrl) => ({
  type: Actions.DOWNLOAD_FILE_START,
  fileUrl
});

export const checkTemplateStart = (templateDetails) => ({
  type: Actions.CHECK_TEMPLATE_START,
  templateDetails: templateDetails
});

export const generateFileStart = (data) => ({
  type: Actions.GENERATE_FILE_START,
  data: data
});

export const setFileUrlStart = (fileUrl) => ({
  type: Actions.SET_FILE_URL_START,
  fileUrl: fileUrl
});
