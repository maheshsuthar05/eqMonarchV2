import * as actions from '../../actionTypes';

const INITIAL_STATE = {
  taskFormData: {},
  partyRolesList: []
};

const taskAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_PARTY_ROLE_TYPE_LIST_SUCCESS:
      return {
        ...state,
        partyRolesList: action.payload
      };
    case actions.TENANT_ADMIN_TASK_PROPERTIES_FORM_DATA:
      return {
        ...state,
        taskFormData: action.payload
      };
    default:
      return state;
  }
};

export default taskAdminReducer;
