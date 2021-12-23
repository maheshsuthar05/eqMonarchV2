import * as actions from './../actionTypes';

export const fetchOpenTaskCount = (caseInstanceId) => ({
  type: actions.INITIATE_OPEN_TASK_COUNT,
  caseInstanceId
});

export const fetchCompletedTaskCount = (caseInstanceId) => ({
  type: actions.INITIATE_COMPLETED_TASK_COUNT,
  caseInstanceId
});

export const fetchOfferCount = (propertyId) => ({
  type: actions.INITIATE_OFFER_COUNT,
  propertyId
});

export const fetchTeamOpenTaskCount = (caseInstanceId) => ({
  type: actions.INITIATE_TEAM_OPEN_TASK_COUNT,
  caseInstanceId
});

export const fetchTeamCompletedTaskCount = (caseInstanceId) => ({
  type: actions.INITIATE_TEAM_COMPLETED_TASK_COUNT,
  caseInstanceId
});
