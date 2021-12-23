import * as actions from '../actionTypes';

const INITIAL_STATE = {
  status: false,
  formDefinition: null,
  error: undefined,
  allProcessIntances: {
    data: [],
    processed: false
  }
};

const getPropertyHeaderFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_HEADER_FORM_FETCH_START:
      return {
        ...state,
        status: false
      };
    case actions.PROPERTY_HEADER_FORM_FETCH_SUCCESS:
      return {
        ...state,
        status: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };
      case actions.PROPERTY_GET_ALL_PROCESS_INSTANCES:
      return {
        ...state,
        allProcessIntances: {
          data: [],
          processed: false
        }
      };
    case actions.PROPERTY_GET_ALL_PROCESS_INSTANCES_SUCCESS:
      return {
        ...state,
        allProcessIntances: { data: action.allProcessIntances, processed: true }
      };
    case actions.PROPERTY_HEADER_FORM_FETCH_FAILURE:
      return {
        ...state,
        status: false,
        formDefinition: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default getPropertyHeaderFormReducer;
