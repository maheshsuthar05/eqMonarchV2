import {
  ROLE_ADD_FORM_FETCH_START,
  ROLE_ADD_FORM_FETCH_SUCCESS,
  ROLE_ADD_START_FAILURE,
  ROLE_VIEW_START_FAILURE,
  ROLE_EDIT_START_FAILURE,
  ROLE_ADD_SUCCESS,
  ROLE_ADD_START,
  ROLE_EDIT_SUCCESS,
  ROLE_EDIT_START,
  ROLE_VIEW_SUCCESS
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined
};

const roleAddReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROLE_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case ROLE_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };

    case ROLE_ADD_START:
      return {
        ...state,
        inProgress: true
      };

    case ROLE_ADD_SUCCESS:
      return {
        ...state,
        inProgress: false
      };

    case ROLE_ADD_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

      case ROLE_VIEW_SUCCESS:
        return {
          ...state,
          response: action.response
        };

    case ROLE_VIEW_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

    case ROLE_EDIT_START:
      return {
        ...state,
        inProgress: true
      };

    case ROLE_EDIT_SUCCESS:
      return {
        ...state,
        inProgress: false
      };

    case ROLE_EDIT_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };

    default:
      return state;
  }
};

export default roleAddReducer;
