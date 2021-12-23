import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import * as Actions from './../store/actionTypes';
import { VendorProductApproveApi } from '../service/manage-vendor-approved.service';

function* fetchListData() {
  try {
    const vendorList = yield call(VendorProductApproveApi.getVendorList);
    yield put({
      type: Actions.FETCH_VENDOR_LIST_BY_PRODUCT_SUCCESS,
      payload: vendorList
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Vendors',
      atAction: Actions.FETCH_VENDOR_LIST_BY_PRODUCT
    });
  }
}

function* processVendorApproval(arg) {
  try {
    const vendorProduct = yield call(
      VendorProductApproveApi.getVendorProduct,
      arg
    );
    arg.data.PRODUCT_SUBSCRIPTION_ID
      ? yield call(
          VendorProductApproveApi.putTenantVendorApproval,
          arg,
          vendorProduct
        )
      : yield call(
          VendorProductApproveApi.insertTenantVendorApproval,
          arg,
          vendorProduct
        );
    yield all([
      // yield put({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' }),
      yield delay(1000),
      yield put({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'manage-products-vendors',
        fileNames: arg.fileNames
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${arg.data.LEGAL_ENTITY_FULL_NAME} status updated succesfully`
      })
    ]);
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `${arg.data.LEGAL_ENTITY_FULL_NAME} status update failed`,
      atAction: Actions.PROCESS_VENDOR_APPROVAL
    });
  }
}

export function* vendorApprovedListWatch() {
  yield takeLatest(Actions.FETCH_VENDOR_LIST_BY_PRODUCT, fetchListData);
}

export function* vendorUpdateStatusWatcher() {
  yield takeLatest(Actions.PROCESS_VENDOR_APPROVAL, processVendorApproval);
}
