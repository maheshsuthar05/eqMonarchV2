import * as types from '../actions/actionTypes';

const initialState = {
  apiCallsInProgress: 0,
  error: {
    isError: false,
    message: [],
    atAction: ''
  },
  success: {
    isSuccess: false,
    message: []
  }
};

const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) === '_SUCCESS';
};

const resetMessages = (state, action) => {
  let response = {};
  if (action.action === 'error' && state.hasOwnProperty('isError')) {
    response = {
      ...state,
      message: state.message.slice(action.index + 1)
    };

    response.isError = response.message.length ? response.isError : false;
    response.atAction = response.message.length ? response.atAction : '';

    return response;
  }

  if (action.action === 'success' && state.hasOwnProperty('isSuccess')) {
    response = {
      ...state,
      message: state.message.slice(action.index + 1)
    };

    response.isSuccess = response.message.length ? response.isSuccess : false;

    return response;
  }

  return state;
};

const apiCallStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BEGIN_API_CALL:
      return state + 1;
    case types.API_CALL_ERROR:
      return {
        ...state,
        apiCallsInProgress: actionTypeEndsInSuccess(action.type),
        error: {
          isError: action?.showError ? action.showError : false,
          message: [...state.error.message, action.error],
          atAction: action.atAction
        }
      };
    case types.API_CALL_SUCCESS:
      return {
        ...state,
        success: {
          isSuccess: true,
          message: [...state.success.message, action.message]
        }
      };
    case types.REST_API_MESSAGES:
      return {
        ...state,
        error: resetMessages(state.error, action),
        success: resetMessages(state.success, action)
      };
    default:
      return state;
  }
};

export default apiCallStatusReducer;
