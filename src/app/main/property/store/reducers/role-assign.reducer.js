import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  formDefination: null,
  error: undefined,
  fetchedRolesUser: null,
  dataLoading: false,
  updateAction: false
};

const getUserListingFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.ASSIGNED_USER_ROLE_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.ASSIGNED_USER_ROLE_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefination: {
          ...state.formDefination,
          ...action.payload
        }
      };
    case actions.ASSIGNED_USER_ROLE_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefination: null,
        error: action.error
      };
    case actions.USER_ROLE_FETCH_START:
      return {
        ...state,
        dataLoading: false
      };
    case actions.USER_ROLE_FETCH_SUCCESS:
      return {
        ...state,
        dataLoading: true,
        fetchedRolesUser: {
          ...state.fetchedRolesUser,
          ...action.payload
        }
      };
    case actions.USER_ROLE_FETCH_FAILURE:
      return {
        ...state,
        dataLoading: false,
        fetchedRolesUser: null,
        error: action.error
      };
    case actions.USER_ROLE_UPDATE_START:
      return {
        ...state,
        updateAction: true
      };
    case actions.USER_ROLE_UPDATE_SUCCESS:
      return {
        ...state,
        updateAction: false,
        payload: action.payload
      };
    case actions.USER_ROLE_UPDATE_FAILURE:
      return {
        ...state,
        updateAction: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default getUserListingFormReducer;
