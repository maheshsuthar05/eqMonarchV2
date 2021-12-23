import {
  TENANT_GET_START,
  TENANT_GET_SUCCESS
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  tenantDetails: null,
  stateAction: false
};

const tenantGetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TENANT_GET_START:
      return {
        ...state,
        stateAction: false,
      };

    case TENANT_GET_SUCCESS:
      return {
        ...state,
        stateAction: true,
        tenantDetails: {
          ...state.tenantDetails,
          ...action.response
        }
      };
    default:
      return state;
  }
};

export default tenantGetReducer;
