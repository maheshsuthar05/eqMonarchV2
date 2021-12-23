import * as Actions from '../actionTypes';

const initialState = {
  login: {
    isAuthenticated: false,
    isLoginFailed: false
  }
};

const flowableControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FLOWABLE_CONTROL_LOGIN:
      return {
        ...state,
        login: { ...state.login, isAuthenticated: false, isLoginFailed: false }
      };
    case Actions.FLOWABLE_CONTROL_LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, isAuthenticated: true }
      };
    case Actions.FLOWABLE_CONTROL_LOGIN_FAILED:
      return {
        ...state,
        login: { ...state.login, isAuthenticated: false, isLoginFailed: true }
      };
    default:
      return state;
  }
};

export default flowableControlReducer;
