import { call, put, takeLatest, all, delay } from 'redux-saga/effects';
import * as Actions from './../store/actionTypes';
import { ManageProductVendorApi } from '../service/manage-product-vendor.service';

function* fetchManageProductForm() {
  try {
    const formDefinition = yield call(ManageProductVendorApi.getForm);
    yield put({
      type: Actions.PROCESS_MANAGE_PRODUCT_FORM,
      json: formDefinition
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch formData',
      atAction: Actions.FETCH_MANAGE_PRODUCT_FORM
    });
  }
}

function* processFormPayload(arg) {
  try {
    yield all(
      arg.payload.ListOfProducts.map((data) => {
        return call(postProductToApi, data.eqvmProducts);
      })
    );
    yield put({
      type: Actions.PROCESS_MANAGE_PRODUCT_FORM_SUCCESS
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Products Added Succesfully'
    });
    yield all([
      // yield put({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' }),
      yield delay(1000),
      yield put({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'manage-products-vendors',
        fileNames: arg.fileNames
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to post product data',
      atAction: Actions.POST_MANAGE_PRODUCT_DATA
    });
  }
}

function* postProductToApi(products) {
  try {
    yield all(
      products.map((productId) => {
        return call(ManageProductVendorApi.insert, productId);
      })
    );
  } catch (error) {
    return error;
  }
}

function* deleteApprovedProduct(arg) {
  try {
    yield call(
      ManageProductVendorApi.deleteProductByProductId,
      arg.data.PRODUCT_ID
    );
    yield all([
      yield put({ type: 'FLOWABLE_DEFINITION_BY_JSON_CLEAR' }),
      yield delay(1000),
      yield put({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'manage-products-vendors',
        fileNames: arg.fileNames
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `${arg.data.PRODUCT_NAME} Deleted Succesfully`
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to delete product',
      atAction: Actions.DELETE_APPROVED_PRODUCT
    });
  }
}
export function* manageProductVendorWatcher() {
  yield takeLatest(Actions.FETCH_MANAGE_PRODUCT_FORM, fetchManageProductForm);
}

export function* manageProductVendorDataWatch() {
  yield takeLatest(Actions.POST_MANAGE_PRODUCT_DATA, processFormPayload);
}

// export function* manageProductVendorListWatch() {
//   yield takeLatest(Actions.FETCH_MANAGE_PRODUCT_LIST, fetchListData);
// }

export function* deleteApprovedProductWatch() {
  yield takeLatest(Actions.DELETE_APPROVED_PRODUCT, deleteApprovedProduct);
}
