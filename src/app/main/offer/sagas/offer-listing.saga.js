
import { call, put, takeLatest } from 'redux-saga/effects';
import { offerApi } from '../services/offer.service';
import * as offerActions from '../store/actions';

function* getOfferListingForm() {
  try {
    const formDefinition = yield call(
      offerApi.getOfferListFormDefinition
    );
    yield put(offerActions.fetchOfferListingFormSuccess(formDefinition));
  } catch (error) {
    yield put(offerActions.fetchOfferListingFormFailure(error.message));
  }
}

export function* watchGetOfferListingForm() {
  yield takeLatest(offerActions.OFFER_LISTING_FORM_FETCH_START, getOfferListingForm);
}


