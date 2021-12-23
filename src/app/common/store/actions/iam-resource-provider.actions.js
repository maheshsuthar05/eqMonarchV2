import * as Actions from '../actionTypes';

export const navigationResourceStart = (action) => ({
  type: Actions.NAVIGATION_RESOURCE_START,
  resourceIds: action.resourceIds,
  tenantCode: action.tenantCode,
  realm: action.realm,
  from: action.from
});

export const navigationResourceSucess = (resources) => ({
  type: Actions.NAVIGATION_RESOURCE_SUCCESS,
  resources: resources
});

export const contextResourceStart = (action) => ({
  type: Actions.CONTEXT_RESOURCE_START,
  tenantCode: action.tenantCode,
  realm: action.realm,
  url: action.url
});

export const contextResourceSucess = (resources) => ({
  type: Actions.CONTEXT_RESOURCE_SUCCESS,
  resources: resources
});
