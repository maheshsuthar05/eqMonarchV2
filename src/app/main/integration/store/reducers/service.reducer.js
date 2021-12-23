import * as Actions from '../actionTypes';

const initialState = {
  loading: true,
  data: [],
  searchText: '',
  serviceByID: '',
  serviceUploadFormData:{}
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_SERVICES: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        page: action.page
      };
    }
    case Actions.EDIT_SERVICE: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.INSERT_NEW_SERVICE: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.DELETE_SERVICE: {
      return {
        ...state,
        loading: true
      };
    }
    case Actions.SET_SERVICES_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
        loading: true
      };
    }
    case Actions.FETCH_SERVICES_BY_ID: {
      return {
        ...state,
        serviceByID: action.payload
      };
    }
    case Actions.FETCH_SERVICE_UPLOAD_FORM:{
      return{
        ...state,
        serviceUploadFormData:action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default serviceReducer;
