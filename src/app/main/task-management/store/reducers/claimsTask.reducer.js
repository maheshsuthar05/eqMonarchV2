import {
  buildAditionalDataForCloseTask,
  buildAditionalDataForOpenTask,
  buildCloseClaimTaskPayload,
  buildOpenClaimTaskPayload
} from '../actions/tasks.actions';
import * as Actions from '../actionTypes';

const initialState = {
  isClaimsTaskProcessed: false,
  payload: null,
  additionalData: null,
  claimSuccess: false
};

const claimsTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REQUEST_OPEN_CLAIM_TASK_PAYLOAD: {
      return {
        ...initialState
      };
    }
    case Actions.REQUEST_CLOSE_CLAIM_TASK_PAYLOAD: {
      return {
        ...initialState
      };
    }
    case Actions.FETCH_OPEN_CLAIM_TASK_PAYLOAD: {
      return {
        ...state,
        isClaimsTaskProcessed: true,
        payload: buildOpenClaimTaskPayload(
          action.caseInstanceId,
          action.groups,
          action.tenantId
        ),
        additionalData: buildAditionalDataForOpenTask()
      };
    }
    case Actions.FETCH_CLOSE_TEAM_TASK_PAYLOAD: {
      return {
        ...state,
        isClaimsTaskProcessed: true,
        payload: buildCloseClaimTaskPayload(
          action.caseInstanceId,
          action.groups,
          action.tenantId
        ),
        additionalData: buildAditionalDataForCloseTask()
      };
    }
    case Actions.PROCESS_TASK_CLAIM_SUCCESS:
      return {
        ...state,
        claimSuccess: true
      };
    default:
      return state;
  }
};

export default claimsTaskReducer;
