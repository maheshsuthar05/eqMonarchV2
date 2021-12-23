import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  caseInstanceId: null,
  property: null,
  error: undefined
};

const getPropertyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_FETCH_START:
      return {
        ...state,
        inProgress: true,
        stateAction: false,
        caseInstanceId: action.caseInstanceId
      };
    case actions.PROPERTY_FETCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        stateAction: true,
        property: {
          ...state.property,
          ...action.property
        }
      };
    case actions.PROPERTY_FETCH_FAILURE:
      return {
        ...state,
        inProgress: false,
        stateAction: false,
        property: null,
        caseInstanceId: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default getPropertyReducer;
