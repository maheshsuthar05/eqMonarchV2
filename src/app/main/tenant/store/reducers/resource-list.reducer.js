import * as actionTypes from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined,
  uploadFile: false,
  uploadFileTime: false,
  resourceList: {
    loading: true,
    data: []
  }
};

const resourceListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.RESOURCE_MODAL_CLOSE:
      return {
        ...state,
        uploadFile: action.payload
      };
    case actionTypes.RESOURCE_LIST_REFRESH_TIME:
      return {
        ...state,
        uploadFileTime: action.payload
      };
    case actionTypes.RESOURCE_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actionTypes.RESOURCE_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case actionTypes.RESOURCE_DELETE_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actionTypes.RESOURCE_DELETE_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true
      };
    case actionTypes.RESOURCE_UPLOAD_FILE:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actionTypes.RESOURCE_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true
      };
    case actionTypes.TENANT_RESOURCE_FETCH_START:
      return {
        ...state,
        resourceList: { loading: true, data: [] }
      };
    case actionTypes.TENANT_RESOURCE_FETCH_SUCCESS:
      return {
        ...state,
        resourceList: { loading: false, data: action.data }
      };
    case actionTypes.RESOURCE_DELETE_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.error,
        stateAction: true,
      };
    default:
      return state;
  }
};

export default resourceListReducer;
