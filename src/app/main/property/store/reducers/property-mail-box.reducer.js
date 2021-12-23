import * as Actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  legacyDetails: {},
  legacyFlag: false,
  legacyMessage: {},
  stateAction: false
};

const getPropertyMailBoxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.PROPERTY_GET_LEGACY_MESSAGES_SUCCESS:
      return {
        ...state,
        legacyMessage: action.payload,
        stateAction:true
      };
    case Actions.PROPERTY_GET_LEGACY_DETAILS:
      return {
        ...state,
        legacyDetails: action.details,
        legacyFlag: true
      };
    case Actions.PROPERTY_GET_BACK_LEGACY_DETAILS:
      return {
        ...state,
        legacyFlag: false
      };
    default:
      return state;
  }
};

export default getPropertyMailBoxReducer;
