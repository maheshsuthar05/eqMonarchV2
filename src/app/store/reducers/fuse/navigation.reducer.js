import * as Actions from '../../actions/fuse';

const initialState = [];

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_NAVIGATION: {
      return [...state];
    }
    case Actions.SET_NAVIGATION: {
      return [...action.navigation];
    }
    case Actions.RESET_NAVIGATION: {
      return [...initialState];
    }
    default: {
      return state;
    }
  }
};

export default navigation;
