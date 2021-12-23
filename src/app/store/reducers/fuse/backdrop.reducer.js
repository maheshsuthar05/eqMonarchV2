import * as Actions from 'app/store/actions/fuse';

const initialState = {
  state: false
};

const backdrop = (state = initialState, action) => {
  switch (action.type) {
    case Actions.OPEN_BACKDROP: {
      return {
        ...state,
        state: true
      };
    }
    case Actions.CLOSE_BACKDROP: {
      return {
        ...state,
        state: false
      };
    }
    default: {
      return state;
    }
  }
};

export default backdrop;
