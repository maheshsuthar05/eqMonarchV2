import {
  watchGetOfferDetails,
  watchUpdateOfferDetails,
  watchSaveOfferDetails,
  watchSetOfferDetailsActiveTab,
  watchGetOfferEditForm,
  watchGetOfferEditFormReset,
  watchGetOfferContacts,
  watchGetOfferEditFormSuccess,
  watchOfferWorkSheetInitialPayload
} from 'app/main/offer/sagas/offer-details.saga';
import { watchGetOfferListingForm } from 'app/main/offer/sagas/offer-listing.saga';
import {
  watchFilterOfferBy,
  watchOfferViewType,
  watchGetOfferStatus,
  watchGetOfferList,
  watchGetOfferListWithVersions,
  watchGetOfferWorkSheet,
  watchGetOfferCount
} from 'app/main/offer/sagas/offer-list-property.saga';

import { all, call } from 'redux-saga/effects';

export default function* offerSaga() {
  yield all([
    call(watchGetOfferStatus),
    call(watchGetOfferList),
    call(watchGetOfferDetails),
    call(watchSaveOfferDetails),
    call(watchUpdateOfferDetails),
    call(watchGetOfferListingForm),
    call(watchFilterOfferBy),
    call(watchOfferViewType),
    call(watchSetOfferDetailsActiveTab),
    call(watchGetOfferEditForm),
    call(watchGetOfferListWithVersions),
    call(watchGetOfferEditFormReset),
    call(watchGetOfferContacts),
    call(watchGetOfferEditFormSuccess),
    call(watchGetOfferWorkSheet),
    call(watchGetOfferCount),
    call(watchOfferWorkSheetInitialPayload)
  ]);
}
