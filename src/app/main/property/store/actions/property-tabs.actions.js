import * as actions from 'app/main/property/store/actionTypes';

export const propertyTabsUpdateStart = (tabsAccess) => ({
  type: actions.PROPERTY_TABS_UPDATE_START,
  tabsAccess: tabsAccess
});

export const propertyTabsUpdateSuccess = (tabsAccess) => ({
  type: actions.PROPERTY_TABS_UPDATE_SUCCESS,
  tabsAccess: tabsAccess
});
