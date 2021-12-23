import * as Actions from './../actionTypes';

const initialState = {
  stateAction: false,
  completed: false,
  vendorPartyData: [],
  vendorPartyDataComplete: false
};

const manageVendorApprovedReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_VENDOR_LIST_BY_PRODUCT_CLEAR:
      return initialState;
    case Actions.FETCH_VENDOR_LIST_BY_PRODUCT:
      return {
        ...state,
        completed: false
      };
    case Actions.FETCH_VENDOR_LIST_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        completed: true,
        vendorPartyData: action.payload
      };
    default:
      return state;
  }
};

export default manageVendorApprovedReducer;
