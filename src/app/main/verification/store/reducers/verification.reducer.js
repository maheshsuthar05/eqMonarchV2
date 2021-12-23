import * as Actions from './../actions';
import history from '@history';

const INITIAL_STATE = {
  verified: false,
  location: {
    pathName: history.location.pathname,
    userType: ''
  }
};

const verificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.VERIFIED_USER_ROUTE:
      return {
        ...state,
        verified: true,
        location: {
          pathName: action.location.pathname,
          userType: action.location.userType
        }
      };
    default:
      return state;
  }
};

export default verificationReducer;
