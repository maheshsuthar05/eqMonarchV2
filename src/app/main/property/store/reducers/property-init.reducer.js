import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  caseInstanceId: null,
  stageOverview: null,
  caseDefinition: null,
  error: undefined
};

const propertyInitReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_INIT_FETCH_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false,
        caseInstanceId: action.caseInstanceId
      };
    case actions.PROPERTY_INIT_FETCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        stageOverview: {
          ...state.stageOverview,
          ...action.stageOverview
        },
        caseDefinition: {
          ...state.caseDefinition,
          ...action.caseDefinition
        }
      };
    case actions.PROPERTY_INIT_FETCH_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        error: action.error
      };
    case actions.PROPERTY_STAGE_OVERVIEW_FETCH_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false,
        caseInstanceId: action.caseInstanceId
      };
    case actions.PROPERTY_STAGE_OVERVIEW_FETCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        stageOverview: {
          ...state.stageOverview,
          ...action.stageOverview
        }
      };
    case actions.PROPERTY_STAGE_OVERVIEW_FETCH_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        error: action.error
      };
    case actions.PROPERTY_CASE_DEFINITION_FETCH_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false
      };
    case actions.PROPERTY_CASE_DEFINITION_FETCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        caseDefinition: {
          ...state.caseDefinition,
          ...action.caseDefinition
        }
      };
    case actions.PROPERTY_CASE_DEFINITION_FETCH_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default propertyInitReducer;
