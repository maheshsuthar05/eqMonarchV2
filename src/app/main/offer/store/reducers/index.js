import { combineReducers } from 'redux';
import offerDetailsReducer from './offer-details.reducer';
import offerListReducer from './offer-list-property.reducer';
import getOfferListingFormReducer from './offer-listing.reducer';
import OfferFlowableReducer from './offer.flowable.reducer';
const offerReducer = combineReducers({
  offerDetails: offerDetailsReducer,
  offerList: offerListReducer,
  offerListing: getOfferListingFormReducer,
  flowable: OfferFlowableReducer
});

export default offerReducer;
