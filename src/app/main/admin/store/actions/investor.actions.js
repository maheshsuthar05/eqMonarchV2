import * as Actions from '../actionTypes';

export const searchInvestor = () => ({
  type: Actions.SERACH_INVESTOR_LIST_START
});

export const searchInvestorGroups = () => ({
  type: Actions.SERACH_INVESTOR_GROUPS
});

export const saveInvestorToGroup = (investor, refresh) => ({
  type: Actions.SAVE_INVESTOR_TO_GROUP,
  investor,
  refresh
});

export const createInvestorGroup = (investorGroup, refesh) => ({
  type: Actions.CREATE_INVESTOR_GROUP,
  investorGroup,
  refesh
});

export const deleteInvestorGroupById = (id) => ({
  type: Actions.DELETE_INVESTOR_GROUP_BY_ID,
  id: id
});

export const getUnassignedInvestor = () => ({
  type: Actions.FETCH_UNASSIGNED_INVESTOR
});

export const getFormInvestorToGroup = () => ({
  type: Actions.FETCH_FORM_INVESTOR_TO_GROUP
});

export const getFormInvestorGroupCreation = () => ({
  type: Actions.FETCH_FORM_INVESTOR_GROUP_CREATION
});

export const getFormForInvestorGroupList = () => ({
  type: Actions.FETCH_FORM_INVESTOR_GROUP_LIST
});

export const findInvestorByInvestorGroup = (investorGroup) => ({
  type: Actions.FIND_INVESTOR_BY_INVESTOR_GROUP,
  investorGroup: investorGroup
});

export const updateInvestorGroup = (payload, refresh) => ({
  type: Actions.UPDATE_INVESTOR_GROUP,
  payload,
  refresh
});

export const createRuleById = (id) => ({
  type: Actions.CREATE_RULE_FOR_ID,
  id: id
});

export const getFormForInvestorList = () => ({
  type: Actions.FETCH_FORM_INVESTOR_LIST
});
