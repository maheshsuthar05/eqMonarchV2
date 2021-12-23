import { API_CALL_ERROR } from 'app/store/actions/actionTypes';
import * as actions from '../actionTypes';

export const fetchOfferListingFormStart = () => ({
  type: actions.OFFER_LISTING_FORM_FETCH_START
});

export const fetchOfferListingFormSuccess = (formDefinition) => ({
  type: actions.OFFER_LISTING_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchOfferListingFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.OFFER_LISTING_FORM_FETCH_SUCCESS,
  payload: error
});
