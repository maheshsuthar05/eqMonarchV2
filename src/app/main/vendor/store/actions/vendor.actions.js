import * as action from 'app/main/vendor/store/actionTypes';

export const fetchUserContactStart = (realm, userId) => ({
  type: action.GET_USERS_CONTACT_START,
  realm,
  userId
});

export const fetchUserContactSuccess = (response) => ({
  type: action.GET_USERS_CONTACT_SUCCESS,
  response
});

export const updatePartyLicenseInfoStart = (tenantCode, args) => ({
  type: action.UPDATE_PARTY_LICENSE_INFO,
  tenantCode,
  args
});

export const fetchLicenseInfoStart = (tenantCode, userName) => ({
  type: action.FETCH_LICENSE_INFO_START,
  tenantCode,
  userName
});

export const fetchLicenseSuccess = (response) => ({
  type: action.FETCH_LICENSE_INFO_SUCCESS,
  response
});
