import * as actionTypes from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  dataForEdit: {
    loading: true,
    data: {}
  },
  saveInProgress: false,
  closePopup: false
};

const rolePrivilegeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_START:
      return {
        ...state,
        saveInProgress: true,
        closePopup: false
      };
    case actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_SUCCESS:
      return {
        ...state,
        saveInProgress: false,
        closePopup: true
      };
    case actionTypes.TENANT_ROLE_PRIVILEGE_SAVE_FAILURE:
      return {
        ...state,
        saveInProgress: false,
        closePopup: true
      };
    case actionTypes.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_START:
      return {
        ...state,
        dataForEdit: { loading: true, data: {} },
        closePopup: false
      };
    case actionTypes.TENANT_ROLE_PRIVILEGE_DATA_FOR_EDIT_SUCCESS:
      return {
        ...state,
        dataForEdit: { loading: false, data: action.data },
        closePopup: false
      };
    default:
      return state;
  }
};

export default rolePrivilegeReducer;
