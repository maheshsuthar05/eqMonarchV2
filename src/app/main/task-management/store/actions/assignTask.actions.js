import * as Actions from '../actionTypes';

export const assignTaskOpenPayload = (caseInstanceId) => ({
  type: Actions.REQUEST_OPEN_ASSIGN_TASK_PAYLOAD,
  caseInstanceId
});

export const assignTaskClosePayload = (caseInstanceId) => ({
  type: Actions.REQUEST_CLOSE_ASSIGN_TASK_PAYLOAD,
  caseInstanceId
});
