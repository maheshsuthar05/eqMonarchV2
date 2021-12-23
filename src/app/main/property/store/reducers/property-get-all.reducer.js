import * as Actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  inProgress: false,
  caseInstanceId: null,
  property: [],
  error: undefined
};


const getAllPropertyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FETCH_LIST_OF_PROPERTIES:
      return {
        ...state,
        inProgress: true
      };
    case Actions.GET_LIST_OF_PROPERTIES:
      return {
        ...state,
        inProgress: false,
        property: [...state.property, ...action.json]
      };
    default:
      return state;
  }
};

export default getAllPropertyReducer;
