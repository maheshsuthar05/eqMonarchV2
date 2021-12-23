import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  propertyId: null,
  response: null,
  error: undefined
};

const propertyAddReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_ADD_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.PROPERTY_ADD_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };
    case actions.PROPERTY_ADD_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_ADD_START:
      return {
        ...state,
        inProgress: true,
        stateAction: true
      };
    case actions.PROPERTY_ADD_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        response: {
          ...state.response,
          ...action.response
        }
      };
    case actions.PROPERTY_ADD_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default propertyAddReducer;
