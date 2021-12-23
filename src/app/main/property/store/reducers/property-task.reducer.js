import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  taskInstanceId: null,
  taskType: null,
  taskOpenFormDefinition: null,
  taskCloseFormDefinition: null,
  taskFormValue: null,
  payload: null,
  response: null,
  instanceDiagram: null,
  instanceDiagramUrl: null,
  parentDiagramUrl: null,
  openInstanceDiagram: null,
  closeInstanceDiagram: null,
  instanceDiagramImageUrl: null,
  parentInstanceDiagram: null,
  parentInstanceDiagramImageUrl: null,
  parentRootInstance: null,
  isAllCompleted: false,
  customData: { payload: null, additionalData: null },
  variables: null,
  propertyXrefDetails: null
};

const propertyTaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_NAVIGATION_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_NAVIGATION_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case actions.PROPERTY_NAVIGATION_FAILURE:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case actions.PROPERTY_TASK_DETAILS_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true,
        isAllCompleted: false
      };
    case actions.PROPERTY_TASK_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        isAllCompleted: true,
        parentRootInstance: null,
        propertyXrefDetails: null
      };
    case actions.PROPERTY_TASK_DETAILS_FETCH_FAILURE:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        isAllCompleted: true
      };
    case actions.PROPERTY_INSTANCE_DETAILS_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_INSTANCE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case actions.PROPERTY_INSTANCE_DETAILS_FETCH_FAILURE:
      return {
        ...state,
        stateAction: true,
        inProgress: false
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        instanceDiagram: {
          ...state.instanceDiagram,
          ...action.instanceDiagram
        }
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        instanceDiagramUrl: action.instanceDiagramUrl
      };
    case actions.PROPERTY_INSTANCE_DIAGRAM_URL_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false
      };
    case actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        parentDiagramUrl: action.parentDiagramUrl
      };
    case actions.PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false
      };
    case actions.PROPERTY_TASK_OPEN_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true,
        customData: {}
      };
    case actions.PROPERTY_TASK_OPEN_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        taskOpenFormDefinition: {
          ...state.taskOpenFormDefinition,
          ...action.taskOpenFormDefinition
        }
      };
    case actions.PROPERTY_TASK_CLOSE_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_CLOSE_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        taskCloseFormDefinition: {
          ...state.taskCloseFormDefinition,
          ...action.taskCloseFormDefinition
        }
      };
    case actions.PROPERTY_TASK_FORM_VALUE_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_FORM_VALUE_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        taskFormValue: {
          ...state.taskFormValue,
          ...action.taskFormValue
        }
      };
    case actions.PROPERTY_TASK_UPDATE_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true,
        payload: {
          ...state.payload,
          ...action.payload
        }
      };
    case actions.PROPERTY_TASK_UPDATE_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        response: {
          ...state.response,
          ...action.response
        }
      };
    case actions.PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        openInstanceDiagram: {
          ...state.openInstanceDiagram,
          ...action.openInstanceDiagram
        }
      };
    case actions.PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        closeInstanceDiagram: {
          ...state.closeInstanceDiagram,
          ...action.closeInstanceDiagram
        }
      };
    case actions.PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        instanceDiagramImageUrl: action.instanceDiagramImageUrl
      };
    case actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        parentInstanceDiagram: {
          ...state.parentInstanceDiagram,
          ...action.parentInstanceDiagram
        }
      };
    case actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        parentInstanceDiagramImageUrl: action.parentInstanceDiagramImageUrl
      };
    case actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_START:
      return {
        ...state,
        stateAction: false,
        inProgress: true
      };
    case actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        parentRootInstance: {
          ...state.parentRootInstance,
          ...action.parentRootInstance
        }
      };
    case actions.PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        inProgress: false
      };
    case actions.PROPERTY_CUSTOM_TASK_OPEN_LOGIC_SUCCESS:
      return {
        ...state,
        customData: {
          ...state.customData,
          payload: action.customData.payload,
          additionalData: action.customData.additionalData
        },
        variables: action.variables
      };
    case actions.PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_SUCCESS:
      return {
        ...state,
        stateAction: true,
        inProgress: false,
        propertyXrefDetails: {
          ...state.propertyXrefDetails,
          ...action.propertyXrefDetails
        }
      };

    default:
      return state;
  }
};

export default propertyTaskReducer;
