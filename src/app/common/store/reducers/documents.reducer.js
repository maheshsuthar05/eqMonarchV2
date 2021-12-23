import {
  DOCUMENTS_DELETE_SUCCESS,
  DOCUMENTS_DELETE_START,
  DOCUMENTS_LIST_SUCCESS
} from 'app/common/store/actionTypes';

const INITIAL_STATE = {
  deleteFlag: false,
  documentsList:[]
};

const documentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DOCUMENTS_LIST_SUCCESS:
      return{
        ...state,
        documentsList:action.payload
      }
    case DOCUMENTS_DELETE_START:
      return {
        ...state,
        deleteFlag: true
      };
    case DOCUMENTS_DELETE_SUCCESS:
      return {
        ...state,
        deleteFlag: false
      };
    default:
      return state;
  }
};

export default documentsReducer;
