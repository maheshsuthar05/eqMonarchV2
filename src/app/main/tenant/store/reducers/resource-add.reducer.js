import {
  RESOURCE_ADD_FORM_FETCH_START,
  RESOURCE_ADD_FORM_FETCH_SUCCESS,
  RESOURCE_ADD_START_FAILURE,
  RESOURCE_VIEW_START_FAILURE,
  RESOURCE_EDIT_START_FAILURE,
  RESOURCE_ADD_START,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_EDIT_START,
  RESOURCE_EDIT_SUCCESS
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined
};

const resourceAddReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESOURCE_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };

    case RESOURCE_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };

    case RESOURCE_ADD_START:
      return {
        ...state,
        inProgress: true
      };

    case RESOURCE_ADD_SUCCESS:
      return {
        ...state,
        inProgress: false
      };

    case RESOURCE_ADD_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

    case RESOURCE_VIEW_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

    case RESOURCE_EDIT_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

    case RESOURCE_EDIT_START_FAILURE:
      return {
        ...state,
        inProgress: false
      };

    case RESOURCE_EDIT_SUCCESS:
      return {
        ...state,
        inProgress: false
      };

    default:
      return state;
  }
};

export default resourceAddReducer;
