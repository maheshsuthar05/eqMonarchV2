import {
  TENANT_ADD_FORM_FETCH_START,
  TENANT_ADD_FORM_FETCH_SUCCESS,
  TENANT_EDIT_START,
  TENANT_EDIT_SUCCESS
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  formDefinition: null,
  stateAction: false,
  tenantEdit: false,
  response: null
};

const tenantAddFormFetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TENANT_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };

    case TENANT_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };

    case TENANT_EDIT_START:
      return {
        ...state,
        stateAction: false,
        tenantEdit: true,
        response: null
      };

    case TENANT_EDIT_SUCCESS:
      return {
        ...state,
        stateAction: true,
        tenantEdit: false,
        response: {
          ...state.response,
          ...action.response
        }
      };
    default:
      return state;
  }
};

export default tenantAddFormFetchReducer;
