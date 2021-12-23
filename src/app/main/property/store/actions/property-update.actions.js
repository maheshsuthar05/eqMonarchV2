import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyUpdateFormStart = (tenantCode) => ({
  type: actions.PROPERTY_UPDATE_FORM_FETCH_START,
  tenantCode: tenantCode
});

export const fetchPropertyUpdateFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_UPDATE_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchPropertyUpdateFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_UPDATE_FORM_FETCH_SUCCESS,
  error: error
});

export const propertyUpdateStart = (tenantCode, payload) => ({
  type: actions.PROPERTY_UPDATE_START,
  payload: payload,
  tenantCode: tenantCode,
});

export const propertyUpdateSuccess = (response) => ({
  type: actions.PROPERTY_UPDATE_SUCCESS,
  response: response
});

export const propertyUpdateFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_UPDATE_SUCCESS,
  error: error
});
