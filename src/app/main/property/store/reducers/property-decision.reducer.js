import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  error: undefined,
  decisions: null,
  guidances: null,
  statuses: null,
  results: null
};

const propertyDecisionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_DECISION_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_DECISION_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };
    case actions.PROPERTY_DECISION_LISTING_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_DECISIONS_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_DECISIONS_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        decisions: {
          ...state.decisions,
          ...action.decisions
        }
      };
    case actions.PROPERTY_DECISIONS_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false,
        error: action.error
      };
    case actions.PROPERTY_DECISION_GUIDANCES_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_DECISION_GUIDANCES_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        guidances: {
          ...state.guidances,
          ...action.guidances
        }
      };
    case actions.PROPERTY_DECISION_GUIDANCES_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false,
        error: action.error
      };
    case actions.PROPERTY_DECISION_STATUSES_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_DECISION_STATUSES_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        statuses: {
          ...state.statuses,
          ...action.statuses
        }
      };
    case actions.PROPERTY_DECISION_STATUSES_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false,
        error: action.error
      };
    case actions.PROPERTY_DECISION_RESULTS_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_DECISION_RESULTS_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        results: {
          ...state.results,
          ...action.results
        }
      };
    case actions.PROPERTY_DECISION_RESULTS_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default propertyDecisionReducer;
