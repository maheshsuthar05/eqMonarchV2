import * as actions from 'app/main/vendor/store/actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  contactDetails: '',
  licenseInfo: '',
  formData: null,
  vendorProfileInformation:{},
  formRefresh:false
};

const vendorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.VENDOR_PROFILE_FORM_REFRESH:{
      return{
        ...state,
        formRefresh:action.payload
      }
    }
    case actions.GET_VENDOR_PROFILE_INFORMATION_SUCCESS:
      return{
        ...state,
        vendorProfileInformation:action.payload
      }
    case actions.GET_USERS_CONTACT_SUCCESS:
      return {
        ...state,
        stateAction: false,
        contactDetails: action.response
      };
    case actions.FETCH_LICENSE_INFO_SUCCESS:
      return {
        ...state,
        stateAction: false,
        licenseInfo: action.licenseDetails
      };

    case 'GET_CHILD_FORM_DATA':
      return {
        ...state,
        formData: action.payload
      };

    case 'GET_CHILD_FORM_DATA_CLEAR':
      return {
        ...state,
        formData: null
      };
    default:
      return state;
  }
};

export default vendorReducer;
