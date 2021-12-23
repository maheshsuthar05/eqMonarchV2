import * as Actions from '../actionTypes';
import * as FlowableActions from 'app/config/flowable-core/store/actionTypes';

export const fetchRules = (id) => ({
  type: Actions.FETCH_RULE_GROUP,
  taskGroupId: id
});

export const fetchDecisionTable = (tenantId, investorGroup, taskGroup) => ({
  type: Actions.FETCH_DECISION_TABLE,
  tenantId: tenantId,
  investorGroup: investorGroup,
  taskGroup: taskGroup
});

export const getRuleDataForModification = (rowData) => ({
  type: Actions.GET_RULE_DATA_FOR_MODIFICATOIN,
  rowData: rowData
});

export const updateDecisionTable = (tenantId, decisionId, playload) => ({
  type: Actions.UPDATE_DECISION_TABLE,
  data: playload,
  tenantId: tenantId,
  decisionId: decisionId
});

export const fetchRuleManagementSearchHeader = (tenantId) => ({
  type: FlowableActions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION,
  tenantId: tenantId,
  key: 'ruleManagementHeader',
  latest: true
});

export const fetchInvestorGroup = () => ({
  type: Actions.FETCH_INVESTOR_GROUP
});

