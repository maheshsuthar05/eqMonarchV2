import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyTaskListingFormStart = (taskType) => ({
  type: actions.PROPERTY_TASK_LISTING_FORM_FETCH_START,
  taskType: taskType
});

export const fetchPropertyTaskListingFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_TASK_LISTING_FORM_FETCH_SUCCESS,
  payload: formDefinition
});

export const fetchPropertyTaskListingFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_TASK_LISTING_FORM_FETCH_SUCCESS,
  error: error
});
