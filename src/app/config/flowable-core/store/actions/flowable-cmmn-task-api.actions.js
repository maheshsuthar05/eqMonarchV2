import * as Actions from '../actionTypes';

export const flowableCmmnTask = (payload, task) => ({
  type: Actions.FLOWABLE_GET_CMMN_API_TASK,
  payload
});
