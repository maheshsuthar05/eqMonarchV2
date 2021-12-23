import {
    TENANT_TABS_UPDATE_START,
    TENANT_TABS_UPDATE_SUCCESS
  } from 'app/main/tenant/store/actionTypes';
  
  const INITIAL_STATE = {
    stateAction: false,
    inProgress: false,
    tabsAccess: null
  };
  
  const tenantTabsUpdateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TENANT_TABS_UPDATE_START:
        return {
          ...state,
          stateAction: false,
          inProgress: true
        };
      case TENANT_TABS_UPDATE_SUCCESS:
        return {
          ...state,
          stateAction: true,
          inProgress: false,
          tabsAccess: action.tabsAccess
        };
      default:
        return state;
    }
  };
  
  export default tenantTabsUpdateReducer;
  