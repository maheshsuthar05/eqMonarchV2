import {
  USER_ADD_FORM_FETCH_START,
  USER_ADD_FORM_FETCH_SUCCESS,
  USER_ADD_START_FAILURE,
  USER_VIEW_START_FAILURE,
  USER_EDIT_START_FAILURE,
  USER_DELETE_START_FAILURE,
  USER_ADD_RESPONSE,
  USER_ADD_START,
  USER_ADD_SUCCESS,
  USER_EDIT_START,
  USER_EDIT_SUCCESS,
  USER_ACCESS_TAB,
  USER_CANCEL_BUTTON,
  USER_LIST_ROW_DATA
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: null,
  addUserResponse: {},
  userAccess: false,
  currentUser: null,
  userRowData:{}
};

const userAddReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LIST_ROW_DATA:
      return{
        ...state,
        userRowData:action.payload
      }
    case USER_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case USER_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case USER_ADD_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    case USER_VIEW_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case USER_EDIT_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case USER_DELETE_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case USER_ADD_RESPONSE:
      return {
        ...state,
        addUserResponse: action.payload,
        userAccess: true
      };
    case USER_ACCESS_TAB:
      return {
        ...state,
        userAccess: action.payload
      };
    case USER_ADD_START:
      return {
        ...state,
        inProgress: true,
        currentUser: null
      };
    case USER_ADD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        currentUser: action.currentUser
      };
    case USER_EDIT_START:
      return {
        ...state,
        inProgress: true,
        currentUser: null
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        inProgress: false,
        currentUser: action.currentUser
      };
    case USER_CANCEL_BUTTON:
      return {
        ...state,
        inProgress: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default userAddReducer;
