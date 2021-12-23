import * as actions from '../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  previewAction:false,
  formDefinition: null,
  error: undefined,
  uploadInProgress: false,
  deleteInProgress: false,
  uploadForm:null,
  previewForm:null,
  previewFileData:[],
  rowPayload:{},
  fileDatas: null,
  s3InProgress: false
};

const getPropertyDocumentFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_FILE_CATEGORY_TYPE:
      return{
        ...state,
        rowPayload:action.rowPayload
      }
    case actions.PROPERTY_DOCUMENT_PREVIEW_FILE_DATA_SUCCESS:
      return {
        ...state,
        previewFileData:action.payload
      }
      case actions.RESET_PREVIEW_FILE_DATA:
        return {
          ...state,
          previewFileData:[],rowPayload:{}
        }  
    case actions.PROPERTY_DOCUMENT_UPLOAD_FORM:
      return {
        ...state,
        stateAction: false
      };
    case actions.PROPERTY_DOCUMENT_UPLOAD_FORM_SUCCESS:
      return {
        ...state,
        stateAction: true,
        uploadForm: {
          ...state.uploadForm,
          ...action.payload
        }
      };
      case actions.PROPERTY_DOCUMENT_PREVIEW_FORM:
        return {
          ...state,
          previewAction: false
        };
      case actions.PROPERTY_DOCUMENT_PREVIEW_FORM_SUCCESS:
        return {
          ...state,
          previewAction: true,
          previewForm: {
            ...state.previewForm,
            ...action.payload
          }
        };
    case actions.PROPERTY_DOCUMENT_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.PROPERTY_DOCUMENT_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case actions.PROPERTY_DOCUMENT_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_DOCUMENT_DELETE_START:
      return {
        ...state,
        stateAction: true,
        deleteInProgress: true
      };
    case actions.PROPERTY_DOCUMENT_DELETE_SUCCESS:
      return {
        ...state,
        stateAction: true,
        deleteInProgress: false,
        response: {
          ...state.response,
          ...action.response
        }
      };
    case actions.PROPERTY_DOCUMENT_DELETE_FAILURE:
      return {
        ...state,
        deleteInProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_DOCUMENT_UPLOAD_START:
      return {
        ...state,
        uploadInProgress: true,
        stateAction: true
      };
    case actions.PROPERTY_DOCUMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadInProgress: false,
        stateAction: true,
        response: {
          ...state.response,
          ...action.response
        }
      };
    case actions.PROPERTY_DOCUMENT_UPLOAD_FAILURE:
      return {
        ...state,
        uploadInProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_DOCUMENT_TAB_RELOAD_START:
      return {
        ...state,
        inProgress: true
      };
    case actions.PROPERTY_DOCUMENT_TAB_RELOAD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        uploadInProgress: false,
        deleteInProgress: false
      };
    case actions.GET_FILES_S3_START:
      return {
        ...state,
        s3InProgress: false
      };
    case actions.GET_FILES_S3_SUCCESS:
      return {
        ...state,
        s3InProgress: true,
        fileDatas: action.payload
      };
    default:
      return state;
  }
};

export default getPropertyDocumentFormReducer;
