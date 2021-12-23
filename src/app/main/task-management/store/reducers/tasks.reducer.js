import * as Actions from '../actionTypes';
import { taskDetailsButtons } from 'app/common/constants';

const initialState = {
  formStatus: false,
  formDefinition: {},
  display: {
    view: false,
    details: ''
  },
  customData: { payload: null, additionalData: null },
  variables: null,
  parentProcessInstance: null,
  taskButtons: taskDetailsButtons
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REQUEST_TASK_DETAIL_FORM_BY_TASKID:
      return {
        ...state,
        formStatus: false,
        customData: {}
      };
    case Actions.FETCH_TASK_DETAIL_FORM_BY_TASKID:
      return {
        ...state,
        formDefinition: action.payload,
        customData: {
          ...state.customData,
          payload: action.customData.payload,
          additionalData: action.customData.additionalData
        },
        variables: action.variables,
        parentProcessInstance: action.parentProcessInstance?.data[0],
        formStatus: true
      };
    case Actions.SHOW_TASK_DETAILS:
      return {
        ...state,
        display: {
          view: true,
          details: action.details
        }
      };
    case Actions.RESET_TASK_DETAILS:
      return {
        ...initialState
      };
    case Actions.RESET_TASK_BUTTONS:
      return {
        ...state,
        taskButtons: { ...initialState.taskButtons }
      };
    case Actions.SHOW_TASK_BUTTONS:
      return {
        ...state,
        taskButtons: action.taskButtons
      };
    default:
      return state;
  }
};

export default tasksReducer;
