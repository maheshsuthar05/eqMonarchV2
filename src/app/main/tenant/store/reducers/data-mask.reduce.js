import {
  DATA_MASK_ADD_START,
  DATA_MASK_ADD_SUCCESS,
  DATA_MASK_ADD_FAILURE
} from 'app/main/tenant/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  formDefinition: null,
  error: undefined,
  loading: true
};

const dataMaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_MASK_ADD_START:
      return {
        ...state,
        loading: false
      };
    case DATA_MASK_ADD_SUCCESS:
      return {
        ...state,
        loading: true
      };
    case DATA_MASK_ADD_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default dataMaskReducer;
