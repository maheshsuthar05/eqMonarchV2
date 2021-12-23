import * as Actions from 'app/store/actions/monarch';

const initialState = {
  processed: false,
  grid: {}
};

const grid = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SAVE_GRID_LAYOUT: {
      return {
        ...state,
        processed: true,
        grid: action.payload
      };
    }
    case Actions.CLEAR_GRID_LAYOUT: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export default grid;
