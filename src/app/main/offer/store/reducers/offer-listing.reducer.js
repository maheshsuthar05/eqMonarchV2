import * as actions from '../actionTypes';

const INITIAL_STATE = {
  stateAction: false,
  formDefinition: null,
  error: undefined
};

const getOfferListingFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.OFFER_LISTING_FORM_FETCH_START:
      return {
        ...state,
        stateAction: false
      };
    case actions.OFFER_LISTING_FORM_FETCH_SUCCESS:
      return {
        ...state,
        stateAction: true,
        formDefinition: action.formDefinition
      };
    case actions.OFFER_LISTING_FORM_FETCH_FAILURE:
      return {
        ...state,
        stateAction: false,
        formDefinition: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default getOfferListingFormReducer;
