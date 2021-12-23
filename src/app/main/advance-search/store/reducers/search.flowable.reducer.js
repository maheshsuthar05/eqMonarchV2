import _ from '@lodash';
import * as Actions from '../actionTypes';

const initialState = {};

const SearchFlowableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SEARCH_FORMDEFIINITION:
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

export default SearchFlowableReducer;
