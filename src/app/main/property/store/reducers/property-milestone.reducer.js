import * as actions from '../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  milestoneData: {},
  error: undefined
};

const getPropertyMilestoneReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_MILESTONE_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.PROPERTY_MILESTONE_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        milestoneData: action.milestoneData
      };
    case actions.PROPERTY_MILESTONE_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        milestoneData: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default getPropertyMilestoneReducer;
