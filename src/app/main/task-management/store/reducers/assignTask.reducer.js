import * as Actions from '../actionTypes';
import {
  buildAditionalDataForCloseTask,
  buildAditionalDataForOpenTask,
  buildAssignCloseTaskPayload,
  buildAssignOpenTaskPayload
} from '../actions/tasks.actions';

const initialState = {
  isAssignTaskProcessed: false,
  payload: null,
  additionalData: null,
  claimSuccess: false,
  refresh: false
};

const assignTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REQUEST_OPEN_ASSIGN_TASK_PAYLOAD: {
      return {
        ...initialState
      };
    }
    case Actions.REQUEST_CLOSE_ASSIGN_TASK_PAYLOAD: {
      return {
        ...initialState
      };
    }
    case Actions.FETCH_OPEN_ASSIGN_TASK_PAYLOAD: {
      return {
        ...state,
        isAssignTaskProcessed: true,
        payload: buildAssignOpenTaskPayload(
          action.caseInstanceId,
          action.tenantId,
          action.roles
        ),
        additionalData: buildAditionalDataForOpenTask()
      };
    }
    case Actions.FETCH_CLOSE_ASSIGN_TASK_PAYLOAD: {
      return {
        ...state,
        isAssignTaskProcessed: true,
        payload: buildAssignCloseTaskPayload(
          action.caseInstanceId,
          action.tenantId
        ),
        additionalData: buildAditionalDataForCloseTask()
      };
    }
    case Actions.OPEN_TASK_REFRESH: {
      return {
        ...state,
        refresh: action.refresh
      };
    }
    default:
      return state;
  }
};

export default assignTaskReducer;
