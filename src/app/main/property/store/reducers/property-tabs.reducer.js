import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  tabsAccess: null
};

const propertyTabsUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_TABS_UPDATE_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TABS_UPDATE_SUCCESS:
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

export default propertyTabsUpdateReducer;
