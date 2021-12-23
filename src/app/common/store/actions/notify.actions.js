import {
  API_CALL_ERROR,
  API_CALL_SUCCESS
} from 'app/store/actions/actionTypes';

export const notifySuccess = (successMessage) => ({
  type: API_CALL_SUCCESS,
  message: successMessage
});

export const notifyError = (errorMessage) => ({
  type: API_CALL_ERROR,
  error: errorMessage
});
