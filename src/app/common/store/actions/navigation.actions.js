import {
  API_CALL_ERROR,
  NAVIGATION_START,
  NAVIGATION_SUCCESS
} from 'app/store/actions/actionTypes';

export const navigationStart = (history, url, routeState) => ({
  type: NAVIGATION_START,
  history: history,
  url: url,
  routeState: routeState
});

export const navigationSuccess = (status) => ({
  type: NAVIGATION_SUCCESS,
  status: status
});

export const navigationFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: NAVIGATION_SUCCESS,
  error: error
});
