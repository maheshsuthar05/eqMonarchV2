import * as Actions from '../actionTypes';

const INITIAL_STATE = {
  stateUS: {},
  stateUSMap: new Map(),
  deliverableMatrix: {},
  deliverableMatrixMap: new Map(),
  evictionType: {},
  evictionTypeMap: new Map(),
  enumData: {},
  enumDataMap: new Map(),
  propertyType: {},
  propertyTypeMap: new Map(),
  taskType: {},
  taskTypeMap: new Map(),
  agentType: {},
  agentTypeMap: new Map()
};

const predefinedListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.GET_STATE_US_SUCCESS:
      return {
        ...state,
        stateUS: action.payload,
        stateUSMap: action.stateUSMap
      };
    case Actions.GET_DELIVERABLE_MATRIX_SUCCESS:
      return {
        ...state,
        deliverableMatrix: action.payload,
        deliverableMatrixMap: action.deliverableMatrixMap
      };
    case Actions.GET_EVICTION_TYPE_SUCCESS:
      return {
        ...state,
        evictionType: action.payload,
        evictionTypeMap: action.evictionTypeMap
      };      
    case Actions.GET_PROPERTY_TYPE_SUCCESS:
      return {
        ...state,
        propertyType: action.payload,
        propertyTypeMap: action.propertyTypeMap
      };      
    case Actions.GET_TASK_DATA_SUCCESS:
      return {
        ...state,
        taskType: action.payload,
        taskTypeMap: action.taskTypeMap
      };      
    case Actions.GET_AGENT_TYPE_SUCCESS:
      return {
        ...state,
        agentType: action.payload,
        agentTypeMap: action.agentTypeMap
      };      
    default:
      return state;
  }
};

export default predefinedListReducer;
