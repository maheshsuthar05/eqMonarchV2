import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  formDefinition: null,
  property: null,
  propertyId: null,
  payload: null,
  response: null,
  error: undefined
};

const propertyUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_UPDATE_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.PROPERTY_UPDATE_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: {
          ...state.formDefinition,
          ...action.formDefinition
        }
      };
    case actions.PROPERTY_UPDATE_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case actions.PROPERTY_UPDATE_START:
      return {
        ...state,
        inProgress: true,
        stateAction: true,
        payload: {
          ...state.payload,
          ...action.payload
        }
      };
    case actions.PROPERTY_UPDATE_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        response: {
          ...state.response,
          ...action.response
        }
      };
    case actions.PROPERTY_UPDATE_FAILURE:
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

export default propertyUpdateReducer;
