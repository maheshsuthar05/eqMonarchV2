import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyHeaderFormStart = (tenantCode) => ({
  type: actions.PROPERTY_HEADER_FORM_FETCH_START,
  tenantCode: tenantCode
});

export const fetchPropertyHeaderFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_HEADER_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchPropertyHeaderFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_HEADER_FORM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyProcessIntances = (data) => ({
  type: actions.PROPERTY_GET_ALL_PROCESS_INSTANCES,
  data: data
});
