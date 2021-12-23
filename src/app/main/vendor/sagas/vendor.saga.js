import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actions from 'app/main/vendor/store/actionTypes';
import vendorApi from '../services/vendor.services';
import { closeModal } from 'app/store/actions';

function* fetchUserContact(action) {
  try {
    const response = yield call(
      vendorApi.fetchUserContact,
      action.realm,
      action.userId
    );
    yield put({
      type: actions.GET_USERS_CONTACT_SUCCESS,
      response: response
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Not able to fetch contact details'
      }),
      yield put({
        type: actions.GET_USERS_CONTACT_FAIL
      })
    ]);
  }
}

function* getProductSubscription(action) {
  try {
    yield call(vendorApi.productSubscription.get);
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Not able to fetch contact details'
      })
    ]);
  }
}

function* insertProductServices(args) {
  try {
    for (let data of args.payload.eqvmProductCategories) {
      for (let product of data.eqvmProducts) {
        const productId = yield call(vendorApi.product.getById, product);
        let vendorProductRolePayload = {
          eqvmProduct: productId?._links?.eqvmProduct?.href
        };
        const vendorProductResp = yield call(
          vendorApi.vendorProduct.insert,
          vendorProductRolePayload
        );
        const serviceArea = {
          coverage: args.eqvmVendorServiceAreas,
          stateCode: args.serviceAreaStateCode
        };
        yield call(
          vendorApi.vendorServiceArea.insert,
          vendorProductResp,
          serviceArea
        );
      }
    }
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Service Product added successfully'
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to add services',
      atAction: actions.INSERT_PRODUCT_SERVICES_START,
      showError: true
    });
  }
}

function* updatePartyLicenseInfo(action) {
  const { tenantCode, args } = action;
  try {
    yield call(vendorApi.updateLisenseInfo, tenantCode, args);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'License information updated successfully'
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'License information update failed'
      })
    ]);
  }
}

function* fetchLicenseInfo(action) {
  let licenseInfo = '';
  try {
    const response = yield call(vendorApi.fetchLisenseInfo, action.tenantCode);
    if (response._embedded.licenses.length > 0) {
      licenseInfo = response._embedded.licenses.filter((ele) => {
        if (ele.createdBy === action.userName) {
          return ele;
        }
        return ele;
      });
    }
    yield put({
      type: actions.FETCH_LICENSE_INFO_SUCCESS,
      licenseDetails: licenseInfo[0]
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Not able to fetch License details'
      })
    ]);
  }
}

function* updateVendorProductSubscriptions(action) {
  try {
    yield call(vendorApi.productSubscription.update, action.payload);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Vendor Product subscription has deleted successfully'
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Vendor Product subscription failed to delete',
        showError: true
      })
    ]);
  }
}

function* getVendorProfileInformation(action) {
  try {
    const partyIdResponse = yield call(
      vendorApi.vendorProfileInformation.getPrtyIdByUserId
    );
    let agentBrokerResponse = {};
    if (action.payload.additionalData.isAgent) {
      agentBrokerResponse = yield call(
        vendorApi.agentBrokerInformation.getBrokerInformation,
        partyIdResponse.partyId
      );
    }
    const response = yield call(
      vendorApi.vendorProfileInformation.getByPartyId,
      partyIdResponse.partyId
    );
    yield put({
      type: actions.GET_VENDOR_PROFILE_INFORMATION_SUCCESS,
      payload: { ...response, brokerInformation: agentBrokerResponse }
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'failed to get vendor information'
      })
    ]);
  }
}

function* updateVendorProfileInformation(action) {
  try {
    if (action.additionalData.isAgent) {
      yield call(
        vendorApi.vendorProfileInformation.updateProfile,
        action.payload.brokerInformation
      );
    }
    delete action.payload.brokerInformation;
    yield call(
      vendorApi.vendorProfileInformation.updateProfile,
      action.payload
    );
    yield put({
      type: actions.VENDOR_PROFILE_FORM_REFRESH,
      payload: true
    });
    yield put({
      type: actions.VENDOR_PROFILE_FORM_REFRESH,
      payload: false
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Profile information updated successfully'
    });
    yield put(closeModal());
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'failed to update vendor information',
        showError: true
      }),
      yield put(closeModal())
    ]);
  }
}
export function* watchGetVendorProfileInformation() {
  yield takeLatest(
    actions.GET_VENDOR_PROFILE_INFORMATION_START,
    getVendorProfileInformation
  );
}

export function* watchUpdateVendorProfileInformation() {
  yield takeLatest(
    actions.UPDATE_VENDOR_PROFILE_INFORMATION_START,
    updateVendorProfileInformation
  );
}

export function* watchUpdateVendorProductSubscriptions() {
  yield takeLatest(
    actions.UPDATE_VENDOR_PRODUCT_SUBSCRIPTIONS_START,
    updateVendorProductSubscriptions
  );
}

export function* watchInsertProductServices() {
  yield takeLatest(
    actions.INSERT_PRODUCT_SERVICES_START,
    insertProductServices
  );
}

export function* watchGetProductSubscription() {
  yield takeLatest(
    actions.GET_PRODUCT_SUBSCRIPTION_START,
    getProductSubscription
  );
}

export function* watchfetchUserContact() {
  yield takeLatest(actions.GET_USERS_CONTACT_START, fetchUserContact);
}

export function* watchUpdatePartyLicenseInfo() {
  yield takeLatest(actions.UPDATE_PARTY_LICENSE_INFO, updatePartyLicenseInfo);
}

export function* watchFetchLicenceInfo() {
  yield takeLatest(actions.FETCH_LICENSE_INFO_START, fetchLicenseInfo);
}
