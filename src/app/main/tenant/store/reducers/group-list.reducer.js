import {
  GROUP_LISTING_FORM_FETCH_START,
  GROUP_LISTING_FORM_FETCH_SUCCESS,
  GROUP_DELETE_START,
  GROUP_DELETE_SUCCESS,
  GROUP_DELETE_START_FAILURE
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined
};

const groupListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GROUP_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case GROUP_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case GROUP_DELETE_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case GROUP_DELETE_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case GROUP_DELETE_START_FAILURE:
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

export default groupListReducer;
