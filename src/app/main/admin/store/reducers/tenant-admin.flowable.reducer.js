import _ from '@lodash';
import * as Actions from '../actionTypes';

const initialState = {};

const TenantAdminFlowableReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FLOWABLE_TANENT_ADMIN_FORMDEF:
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

export default TenantAdminFlowableReducer;
