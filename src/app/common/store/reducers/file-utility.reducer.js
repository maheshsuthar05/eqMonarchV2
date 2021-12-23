import * as Actions from '../actionTypes';

const INITIAL_STATE = {
  uploadFlag: false,
  downloadFlag: false,
  errorFileDetails: [],
  templateFlag: false,
  fileGenerated: false,
  templateDetails: {},
  fileUrl: '',
  fileDetails: {}
};

const downloadFile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.RESET_FILE_UTILITY:
      return INITIAL_STATE;
    case Actions.DOWNLOAD_FILE_START:
      return {
        ...state,
        downloadFlag: true
      };
    case Actions.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        downloadFlag: false
      };
    case Actions.CHECK_TEMPLATE_START:
      return {
        ...state,
        templateDetails: {},
        templateFlag: false
      };
    case Actions.CHECK_TEMPLATE_SUCCESS:
      return {
        ...state,
        templateDetails: action.templateDetails,
        templateFlag: true
      };
    case Actions.GENERATE_FILE_START:
      return {
        ...state,
        fileGenerated: false,
        fileUrl: '',
        fileDetails: {}
      };
    case Actions.GENERATE_FILE_SUCCESS:
      return {
        ...state,
        fileGenerated: true,
        fileUrl: action.fileUrl,
        fileDetails: action.fileDetails
      };
    case Actions.SET_FILE_URL_START:
      return {
        ...state,
        fileGenerated: false,
        fileUrl: ''
      };
    case Actions.SET_FILE_URL_SUCCESS:
      return {
        ...state,
        fileGenerated: true,
        fileUrl: action.fileUrl
      };
    default: {
      return state;
    }
  }
};

export default downloadFile;
