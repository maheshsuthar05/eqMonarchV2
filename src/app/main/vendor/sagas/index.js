import { all, call } from 'redux-saga/effects';
import {
  watchfetchUserContact,
  watchGetProductSubscription,
  watchInsertProductServices,
  watchFetchLicenceInfo,
  watchUpdatePartyLicenseInfo,
  watchUpdateVendorProductSubscriptions,
  watchGetVendorProfileInformation,
  watchUpdateVendorProfileInformation
} from './vendor.saga';

export default function* vendorSaga() {
  yield all([
    call(watchfetchUserContact),
    call(watchGetProductSubscription),
    call(watchInsertProductServices),
    call(watchFetchLicenceInfo),
    call(watchUpdatePartyLicenseInfo),
    call(watchUpdateVendorProductSubscriptions),
    call(watchGetVendorProfileInformation),
    call(watchUpdateVendorProfileInformation)
  ]);
}
