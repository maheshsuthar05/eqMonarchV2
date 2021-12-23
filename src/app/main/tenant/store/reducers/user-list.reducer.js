import {
  USER_LISTING_FORM_FETCH_START,
  USER_LISTING_FORM_FETCH_SUCCESS,
  USER_DELETE_START,
  USER_DELETE_SUCCESS,
  USER_DELETE_START_FAILURE
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined
};

const userListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case USER_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
      case USER_DELETE_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
      case USER_DELETE_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
      case USER_DELETE_START_FAILURE:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    default:
      return state;
  }
};

export default userListReducer;
