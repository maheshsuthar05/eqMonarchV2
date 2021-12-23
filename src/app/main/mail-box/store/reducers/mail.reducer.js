import * as Actions from '../actionTypes';

const initialState = {
  mailList: null,
  processed: false
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_MAIL: {
      return {
        ...state,
        mailList: action.payload,
        processed: true
      };
    }
    case Actions.RESET_MAIL: {
      return {
        ...state,
        mailList: null,
        processed: false
      };
    }
    default:
      return state;
  }
};

export default mailReducer;
