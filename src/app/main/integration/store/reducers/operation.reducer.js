import * as Actions from '../actionTypes';

const initialState = {
  loading: true,
  data: [],
  searchText: '',
  dataById: {},
  mappingById: {},
  formLoad: false,
  formData: {},
  rowData:{},
  mapping:[]
};

const operationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_MAPPING_SUCCESS:{
      return {
        ...state,
        mapping:action.payload
      }
    }
    case Actions.GET_OPERATIONS: {
      return {
        ...state,
        data: [],
        loading: true
      };
    }
    case Actions.FETCH_OPERATIONS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        page: action.page
      };
    }
    case Actions.EDIT_OPERATION: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.INSERT_NEW_OPERATION: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.DELETE_OPERATION: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.SET_OPERATIONS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
        loading: true
      };
    }
    case Actions.FETCH_OPERATION_BY_ID: {
      return {
        ...state,
        loading: false,
        dataById: action.payload
      };
    }
    case Actions.FETCH_MAPPING_BY_OPERATION: {
      return {
        ...state,
        loading: false,
        mappingById: action.payload
      };
    }
    case Actions.UPDATE_INPUT_OPERATION: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.FETCH_TEMPLATE_FORM: {
      return {
        ...state,
        formLoad: true,
        formData: action.json
      };
    }
    case Actions.GET_OPERATION_TESTING_SUCCESS:{
      return{
        ...state,
        rowData:action.payload
      }
    }
    case Actions.UPDATE_TEMPLATE: {
      return {
        ...state,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
};

export default operationReducer;
