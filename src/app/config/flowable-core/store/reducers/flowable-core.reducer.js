import * as Actions from '../actionTypes';
import _ from '@lodash';

const initialState = {
  isFormProcessing: true,
  json: '',
  task: {
    id: ''
  },
  processInstance: {
    id: ''
  },
  formFinalAction: false,
  formFinalPayload: {
    post: false,
    data: []
  },
  saveAndCompleteSuccess: false,
  coreTaskCompleted: false,
  coreTaskSkipped: false,
  unclaimed: false,
  triggerEventSuccess: false,
  pauseSuccess: false,
  unPauseSuccess: false,
  refresh: true
};

const flowableCoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FLOWABLE_GET_FORM_BY_CASE_DEFINITION_ID:
      return {
        ...state,
        isFormProcessing: true,
        formFinalAction: false
      };
    case Actions.FLOWABLE_GET_DEFINITION:
      return {
        ...state,
        isFormProcessing: false,
        json: action.payload.data,
        taskId: {
          id: action.taskId
        },
        processInstance: {
          id: action.processInstanceId
        },
        formFinalAction: action.formFinalAction,
        localFormFinalAction: action.localFormFinalAction,
        [action.formAction]: {
          formDef: action.payload,
          processed: !_.isEmpty(action.payload)
        },
        [action.payload.key]: {
          ...state,
          formDef: action.payload,
          processed: !_.isEmpty(action.payload)
        }
      };
    case Actions.FLOWABLE_FINISHED_ALL_TASKS:
      return {
        ...state,
        formFinalPayload: {
          post: action.post,
          data: [action.formFinalPayload]
        }
      };
    case Actions.FLOWABLE_CORE_SAVE_AND_COMPLETE_LATER_SUCCESS:
      return {
        ...state,
        saveAndCompleteSuccess: true
      };
    case Actions.FLOWABLE_CORE_API_COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        coreTaskCompleted: true
      };
    case Actions.FLOWABLE_CORE_API_SKIP_TASK_SUCCESS:
      return {
        ...state,
        coreTaskSkipped: true
      };
    case Actions.FLOWABLE_CORE_API_UNCLAIM_TASK_SUCCESS:
      return {
        ...state,
        unclaimed: true
      };
    case Actions.FLOWABLE_CORE_API_UNCLAIM_TASK_RESET:
      return {
        ...state,
        unclaimed: false
      };
    case Actions.RESET_FLOWABLE_PROCESS_STATE_SUCCESS: {
      return initialState;
    }
    case Actions.FLOWABLE_TRIGGER_EVENT_BY_EXECUTION_ID_SUCCESS: {
      return {
        ...state,
        triggerEventSuccess: true
      };
    }
    case Actions.FLOWABLE_CORE_API_UNPAUSE_TASK:
      return {
        ...state,
        unPauseSuccess: false
      };
    case Actions.FLOWABLE_CORE_API_UNPAUSE_TASK_SUCCESS:
      return {
        ...state,
        unPauseSuccess: true
      };
    case Actions.FLOWABLE_CORE_API_PAUSE_TASK:
      return {
        ...state,
        pauseSuccess: false
      };
    case Actions.FLOWABLE_CORE_API_PAUSE_TASK_SUCCESS:
      return {
        ...state,
        pauseSuccess: true
      };
    default:
      return state;
  }
};

export default flowableCoresReducer;
