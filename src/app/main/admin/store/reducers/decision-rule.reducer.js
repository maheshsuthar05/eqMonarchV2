import * as actions from '../actionTypes';
import * as decisionRuleUtil from 'app/main/admin/tenant/business-rule/util/decision-rule.util';

const INITIAL_STATE = {
  stateAction: false,
  formDefinition: null,
  error: undefined,
  investorGroups: [],
  investorGroup: undefined
};

const getDecisionRuleFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_INVESTOR_GROUP:
      return INITIAL_STATE;
    case actions.UPDATE_DECISION_TABLE:
      return {
        ...state,
        stateAction: false,
        loading: true
      };
    case actions.FETCH_DECISION_TABLE:
      return {
        ...state,
        loading: true,
        tenantId: action.tenantId,
        investorGroup: action.investorGroup,
        taskGroup: action.taskGroup
      };
    case actions.FETCH_DECISION_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        stateAction: true,
        decisionTables: action.decisionTables
      };
    case actions.FETCH_DECISION_TABLE_FAILURE:
      return {
        ...state,
        loading: false
      };
    case actions.FETCH_RULE_GROUP:
      return {
        ...state,
        loading: true,
        taskGroupId: action.taskGroupId
      };
    case actions.FETCH_RULE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: decisionRuleUtil.parseDecisionTablePlayload(action.playload, action.parentId),
        originalPlayLoad: action.playload
      };
    case actions.FETCH_RULE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        stateAction: false,
        error: action.error
      };
    case actions.GET_RULE_DATA_FOR_MODIFICATOIN:
      return {
        ...state,
        rowData: action.rowData
      };
    case actions.FETCH_INVESTOR_GROUP_SUCCESS:
      return {
        ...state,
        investorGroups: action.playload
      }
    case actions.UPDATE_DECISION_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        lastestDecisionTable: action.lastestDecisionTable
      }
    case actions.UPDATE_DECISION_TABLE_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default getDecisionRuleFormReducer;
