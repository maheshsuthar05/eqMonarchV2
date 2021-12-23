import {
  NAVIGATION_FAILURE,
  NAVIGATION_START,
  NAVIGATION_SUCCESS
} from 'app/store/actions/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  error: undefined
};

const navigationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NAVIGATION_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case NAVIGATION_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case NAVIGATION_FAILURE:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default navigationReducer;
