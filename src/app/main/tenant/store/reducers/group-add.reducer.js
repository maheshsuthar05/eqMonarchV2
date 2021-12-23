import {
  GROUP_ADD_FORM_FETCH_START,
  GROUP_ADD_FORM_FETCH_SUCCESS,
  GROUP_ADD_START_FAILURE,
  GROUP_VIEW_START_FAILURE,
  GROUP_EDIT_START_FAILURE,
  GROUP_ADD_START,
  GROUP_ADD_SUCCESS,
  GROUP_EDIT_DATA
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined
};

const groupAddReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case GROUP_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case GROUP_ADD_START:
      return {
        ...state,
        inProgress: true
      };
    case GROUP_ADD_SUCCESS:
      return {
        ...state,
        inProgress: false
      };
    case GROUP_ADD_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case GROUP_VIEW_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case GROUP_EDIT_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case GROUP_EDIT_DATA:
      return {
        ...state,
        stateAction: true,
        response: action.response
      };
    default:
      return state;
  }
};

export default groupAddReducer;
