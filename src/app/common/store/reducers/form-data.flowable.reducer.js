import * as Actions from 'app/common/store/actionTypes';

const INITIAL_STATE = {
  dataTableRowData: {},
  formData: {}
};

const formDataFlowableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.FLOWABLE_FORM_DATA_TABLE_ROW_SELECTED_DATA:
      return {
        ...state,
        dataTableRowData: action.payload
      };
    case Actions.GET_FLOWABLE_FORM_DATA_START:
      return {
        ...state,
        formData: action.payload
      };
    default:
      return state;
  }
};

export default formDataFlowableReducer;
