import * as Actions from '../actionTypes';

const initialState = {
  tabIndex: 0,
  stateAction: false,
  formDefinition: null,
  error: undefined,
  offerDetails: null,
  offerDetailsLoaded: false,
  offerContacts: [],
  offerContatsLoaded: false,
  updateInProgress: false,
  closePopup: false,
  reloadOfferListing: false
};

const offerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_OFFER_DETAILS: {
      return {
        ...state,
        offerDetails: action.offerDetails,
        offerDetailsLoaded: true
      };
    }
    case Actions.GET_OFFER_DETAILS_START: {
      return {
        ...state,
        offerDetails: null,
        offerDetailsLoaded: false
      };
    }

    case Actions.SAVE_OFFER_DETAILS: {
      return {
        ...action.payload
      };
    }
    case Actions.UPDATE_OFFER_DETAILS_START: {
      return {
        ...state,
        updateInProgress: true,
        closePopup: false,
        reloadOfferListing: false
      };
    }
    case Actions.UPDATE_OFFER_DETAILS_SUCCESS: {
      return {
        ...state,
        stateAction: false,
        updateInProgress: false,
        closePopup: true,
        reloadOfferListing: true
      };
    }
    case Actions.UPDATE_OFFER_DETAILS_FAILURE: {
      return {
        ...state,
        updateInProgress: false,
        closePopup: true,
        reloadOfferListing: true
      };
    }
    case Actions.PROPERTY_OFFER_DETAILS_CURRENT_TAB_SUCCESS: {
      return {
        ...state,
        tabIndex: action.tabIndex
      };
    }
    case Actions.EDIT_OFFER_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case Actions.EDIT_OFFER_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: action.formDefinition
      };
    case Actions.EDIT_OFFER_FORM_FETCH_COMPLETED_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: action.formDefinition
      };

    case Actions.EDIT_OFFER_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    case Actions.EDIT_OFFER_FORM_FETCH_RESET_SUCCESS:
      return {
        ...state,
        stateAction: false,
        formDefinition: null
      };
    case Actions.EDIT_OFFER_FORM_FETCH_RESET_START:
      return {
        ...state,
        stateAction: false,
        formDefinition: null
      };
    case Actions.OFFER_CONTACTS_FETCH_START:
      return {
        ...state,
        offerContacts: [],
        offerContatsLoaded: false
      };
    case Actions.OFFER_CONTACTS_FETCH_SUCCESS:
      return {
        ...state,
        offerContacts: action.offerContacts,
        offerContatsLoaded: true
      };
    case Actions.OFFER_CONTACTS_FETCH_FAILURE:
      return {
        ...state,
        offerContacts: [],
        offerContatsLoaded: false
      };
    default: {
      return state;
    }
  }
};

export default offerDetailsReducer;
