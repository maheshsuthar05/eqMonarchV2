import * as actions from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  formDefinition: null,
  stateAction: false,
  tenant: null,
  loadedTenant: false
};

const tenantListFormFetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.TENANT_LIST_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };

    case actions.TENANT_LIST_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };
    case actions.TENANT_FETCH_START:
      return {
        ...state,
        tenant: null,
        loadedTenant: false
      };
    case actions.TENANT_FETCH_SUCCESS:
      return {
        ...state,
        tenant: action.tenant,
        loadedTenant: true
      };
    default:
      return state;
  }
};

export default tenantListFormFetchReducer;
