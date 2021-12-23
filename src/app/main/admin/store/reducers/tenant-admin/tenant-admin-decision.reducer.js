import * as actions from '../../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  error: undefined,
  loading: false
};

const adminDecisionTableFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_DECISION_TABLE_ADMIN:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_DECISION_TABLE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminDecisionTable: action.adminDecisionTable
      };

    case actions.FETCH_RULES_ADMIN:
      return {
        ...state,
        loading: false
      };
    case actions.FETCH_RULES_ADMIN_SUCCESS:
      return {
        ...state,
        loading: true,
        // data: decisionRuleUtil.parseDecisionTablePlayload(
        //   action.payload,
        //   action.parentId
        // ),
        // originalPayLoad: action.payload
        data: action.payload
      };
    default:
      return state;
  }
};

export default adminDecisionTableFormReducer;
