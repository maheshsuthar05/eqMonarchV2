import * as actions from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  addEditFormData: {},
  roleUsers: [],
  tableRefresh: false,
  partyRoleTypeList: []
};

const tenantPropertyRoleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_TENANT_PROPERTY_ROLES_SUCCESS:
      return {
        ...state,
        partyRoleTypeList: action.payload
      };
    case actions.TENANT_PROPERTY_ROLES_TABLE_REFRESH:
      return {
        ...state,
        tableRefresh: action.payload
      };
    case actions.TENANT_PROPERTY_ROLES_USERS_SUCCESS:
      return {
        ...state,
        roleUsers: action.payload
      };
    case actions.TENANT_ADD_EDIT_PROPERTY_ROLE_FORM_DATA:
      return {
        ...state,
        addEditFormData: action.payload
      };
    default:
      return state;
  }
};

export default tenantPropertyRoleReducer;
