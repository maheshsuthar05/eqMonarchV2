import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchAssignedUserRoleFormStart = () => {
  return {
    type: actions.ASSIGNED_USER_ROLE_FORM_FETCH_START
  };
};

export const fetchAssignedUserRoleFormsSuccess = (formDefination) => {
  return {
    type: actions.ASSIGNED_USER_ROLE_FORM_FETCH_SUCCESS,
    payload: formDefination
  };
};

export const fetchAssignedUserRoleFormfail = (error) => {
  return {
    type: API_CALL_ERROR,
    atAction: actions.ASSIGNED_USER_ROLE_FORM_FETCH_FAILURE,
    error: error
  };
};

export const fetchAssignedUserRoleStart = (propertyId) => {
  return {
    type: actions.USER_ROLE_FETCH_START,
    propertyId: propertyId
  };
};

export const fetchAssignedUserRoleSuccess = (response) => {
  return {
    type: actions.USER_ROLE_FETCH_SUCCESS,
    payload: response
  };
};

export const fetchAssignedUserRolefail = (error) => {
  return {
    type: API_CALL_ERROR,
    atAction: actions.USER_ROLE_FETCH_FAILURE,
    error: error
  };
};

export const updateUsersRolesStart = (payload, propertyId) => {
  return {
    type: actions.USER_ROLE_UPDATE_START,
    payload: payload,
    propertyId: propertyId,
  };
};

export const updateUsersRolesSuccess = (response) => {
  return {
    type: actions.USER_ROLE_UPDATE_SUCCESS,
    response: response
  };
};

export const updateUsersRolesFail = (error) => {
  return {
    type: API_CALL_ERROR,
    atAction: actions.USER_ROLE_UPDATE_FAILURE,
    error: error
  };
};
