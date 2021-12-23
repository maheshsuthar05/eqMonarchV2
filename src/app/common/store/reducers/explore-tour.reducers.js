import {
    EXPLORE_TOUR_SUCCESS
  } from 'app/store/actions/actionTypes';
  
  const INITIAL_STATE = {
    exploreData:[],
    exploreFlag:false
  };
  
  const exploreTourReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EXPLORE_TOUR_SUCCESS:
        return {
          ...state,
          exploreData:action.payload,
          exploreFlag:true
        };
      default:
        return state;
    }
  };
  
  export default exploreTourReducer;
  