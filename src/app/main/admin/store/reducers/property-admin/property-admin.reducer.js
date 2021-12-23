import * as actions from '../../actionTypes';

const INITIAL_STATE = {
  globalRolesList: [],
  globalRolesListFlag: false,
  updateProgressFlag: true,
  partiesList: [],
  tableRefresh: false,
  partyRoleTypeList: [],
  partyRoleTypeFlag: false,
  inprogress: false
};

const getPropertyAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PARTY_ROLE_TYPE_LISTDATA_CLEAN: {
      return {
        ...state,
        partyRoleTypeList: []
      };
    }
    case actions.GET_TEAM_ROLE_SUCCESS:
      return {
        ...state,
        partyRoleTypeList: action.payload,
        partyRoleTypeFlag: true
      };
    case actions.STATE_ROLE_REFRESH_TABLE:
      return {
        ...state,
        tableRefresh: action.payload,
        [action.key]: action.payload
      };
    case actions.GET_ALL_PARTIES_BY_PARTYID_SUCCESS:
      return {
        ...state,
        partiesList: action.payload
      };
    case actions.UPDATE_DEFAULT_GLOBAL_ROLES_FLAG:
      return {
        ...state,
        updateProgressFlag: action.payload,
        inprogress: true
      };
    case actions.GET_ALL_DEFAULT_GLOBAL_ROLES_SUCCESS:
      const roleSortedList = action.payload.sort((prevValue, nextValue) => {
        let prevValueRoleType = prevValue.partyRoleType.toLowerCase();
        let nextValueRoleType = nextValue.partyRoleType.toLowerCase();
        if (prevValueRoleType > nextValueRoleType) {
          return 1;
        }
        if (prevValueRoleType < nextValueRoleType) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        globalRolesList: roleSortedList,
        globalRolesListFlag: true
      };
    default:
      return state;
  }
};

export default getPropertyAdminReducer;
