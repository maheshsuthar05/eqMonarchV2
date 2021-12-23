import _ from '@lodash';
import * as Actions from 'app/common/store/actionTypes';

const initialState = {};

const commonFlowableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.COMMON_FORMDEFIINITION:
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

export default commonFlowableReducer;
