import * as Actions from '../actionTypes';
import _ from '@lodash';

const initialState = {
  isFormProcessed: false,
  formDefinition: []
};

const jsonFormDefinitionReducer = (state = initialState, action) => {
  switch (action.type) {
    // case Actions.FLOWABLE_DEFINITION_BY_JSON_CLEAR:
    //   return initialState;
    case Actions.FLOWABLE_DATA_DEFINITION_BY_JSON:
      return {
        ...state,
        isFormProcessed: action.completed,
        formDefinition: [...state.formDefinition, action.json],
        [action.fileName]: {
          formDef: action.formDef,
          processed: !_.isEmpty(action.formDef)
        }
      };
    default:
      return state;
  }
};

export default jsonFormDefinitionReducer;
