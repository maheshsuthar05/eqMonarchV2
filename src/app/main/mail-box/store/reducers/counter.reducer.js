import * as Actions from '../actionTypes';

const initialState = {
  count: ''
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_MAILS_UNREAD_COUNT: {
      return {
        ...state
      };
    }
    case Actions.GET_MAILS_UNREAD_COUNT: {
      return {
        ...state,
        count: action.count
      };
    }
    default:
      return state;
  }
};

export default mailReducer;
