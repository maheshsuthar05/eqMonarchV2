import * as actions from 'app/main/property/store/actionTypes';

const INITIAL_STATE = {
  uploadFlag: false,
  downloadFlag: false,
  errorFileDetails:[],
  tableRefresh: false
};

const propertyBulkImportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.PROPERTY_GET_ERROR_FILE_DETAILS_SUCCESS:
      return {
        ...state,
        errorFileDetails:action.payload
      }
    case actions.PROPERTY_TEMPLATE_LIST_REFRESH:
      return{
        ...state,
        tableRefresh: true
      }  
    case actions.PROPERTY_TEMPLATE_UPLOAD_START:
      return {
        ...state,
        uploadFlag: true,
      };
    case actions.PROPERTY_TEMPLATE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadFlag: false,
        tableRefresh: false
      };
    case actions.PROPERTY_TEMPLATE_DOWNLOAD_START:
      return {
        ...state,
        downloadFlag: true
      };
    case actions.PROPERTY_TEMPLATE_DOWNLOAD_SUCCESS:
      return {
        ...state,
        downloadFlag: false
      };
    default: {
      return state;
    }
  }
};

export default propertyBulkImportReducer;
