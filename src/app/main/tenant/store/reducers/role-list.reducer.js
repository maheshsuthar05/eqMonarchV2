import * as actionTypes from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  response: null,
  error: undefined,
  roleList: {
    loading: true,
    data: []
  }
};

const roleListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ROLE_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actionTypes.ROLE_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        formDefinition: {
          ...state.formDefinition,
          ...action.payload
        }
      };
    case actionTypes.ROLE_DELETE_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false
      };
    case actionTypes.ROLE_DELETE_START_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true
      };
    case actionTypes.ROLE_DELETE_START_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        error: action.error
      };
    case actionTypes.TENANT_ROLE_FETCH_START:
      return {
        ...state,
        roleList: { loading: true, data: [] }
      };
    case actionTypes.TENANT_ROLE_FETCH_SUCCESS:
      return {
        ...state,
        roleList: { loading: false, data: action.data }
      };
    default:
      return state;
  }
};

export default roleListReducer;
