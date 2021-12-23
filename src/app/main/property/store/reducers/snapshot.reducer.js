import * as actions from './../actionTypes';

const INITIAL_STATE = {
  openTask: {
    status: false,
    count: 0
  },
  completedTask: {
    status: false,
    count: 0
  },
  TeamOpenTask: {
    status: false,
    count: 0
  },
  TeamCompletedTask: {
    status: false,
    count: 0
  },
  offer: {
    status: false,
    count: 0
  }
};

const snapshotReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_OPEN_TASK_COUNT:
      return {
        ...state,
        openTask: {
          status: true,
          count: action.total
        }
      };
    case actions.GET_COMPLETED_TASK_COUNT:
      return {
        ...state,
        completedTask: {
          status: true,
          count: action.total
        }
      };
    case actions.GET_TEAM_OPEN_TASK_COUNT:
      return {
        ...state,
        TeamOpenTask: {
          status: true,
          count: action.total
        }
      };
    case actions.GET_TEAM_COMPLETED_TASK_COUNT:
      return {
        ...state,
        TeamCompletedTask: {
          status: true,
          count: action.total
        }
      };
    case actions.GET_OFFER_COUNT:
      return {
        ...state,
        offer: {
          status: true,
          count: action.total
        }
      };
    default:
      return state;
  }
};

export default snapshotReducer;
