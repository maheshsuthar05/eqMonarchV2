import _ from '@lodash';
import * as Actions from '../actionTypes';

const initialState = {};

const propertyFlowableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.PROPERTY_FLOWABLE_FORMDEF:
      return {
        ...state,
        [action.fileName]: {
          formDef: action.formDef,
          processed: !_.isEmpty(action.formDef)
        }
      };
    default:
      return state;
  }
};

export default propertyFlowableReducer;
