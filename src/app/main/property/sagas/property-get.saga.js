import { FileApiConfig } from 'app/config/api';
import { PROPERTY_FETCH_START } from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';

function* getProperty(action) {
  try {
    const { caseInstanceId } = action;

    let response = yield call(propertyApi.get_propertyid_by_caseinstanceid,caseInstanceId)

    const propertyId = response.propertyId;

    let getMarketingId = yield call(
      propertyApi.getMarketingPlanId,
      propertyId
    );
    let getEqOrderId = yield call(propertyApi.getEqOrderId, propertyId);
    let getPropertyReoId = yield call(
      propertyApi.getPropertyReoId,
      propertyId
    );
    let getPropertyListingAuctionSale = yield call(
      propertyApi.getPropertyListingAuctionSale,
      propertyId
    );

    let marketingPlanId =
      getMarketingId?._embedded?.marketingPlans[0]?.marketingPlanId;
    let orderId = getEqOrderId?._embedded?.eqOrders[0]?.orderId;
    let propertyReoId =
      getPropertyReoId?._embedded?.propertyReos[0]?.propertyReoId;
    let getAgentInfo = yield call(
      propertyApi.getRolePartyDtos,
      'RealEstateListingAgent'
    );
    let getAssetManagerInfo = yield call(
      propertyApi.getRolePartyDtos,
      'AssetManager'
    );
    let propertyListingAuctionSaleDetailId =
      getPropertyListingAuctionSale?._embedded
        ?.propertyListingAuctionSaleDetails[0]
        ?.propertyListingAuctionSaleDetailId;
    let data = yield call(
      propertyApi.getProperty,
      caseInstanceId,
      marketingPlanId,
      orderId,
      propertyReoId,
      propertyListingAuctionSaleDetailId
    );

    if (data && data.loan && data.loan.miCoverageExistsIndicator) {
      // value is stored in numeric
      data.loan.miCoverageExistsIndicator =
        '' + data.loan.miCoverageExistsIndicator;
    }

    // TODO: remove after image URL service is implemented
    const imageUrl = FileApiConfig.api.get(
      `_PBmrRSBnaV5Q7UtGUTui1av8ZWCoGPMa9QMmlf4yS_QxvAUXfn5y2AUxSM1MEVLlNeekDqnefdVlYKqu3zKyNQpRZwf-YafM802VE5IsA8=`
    );
    data.propertyImage = `${imageUrl}`;
    data['propertyHeaderAdditionalData'] = {
      agent: getAgentInfo?._embedded?.parties[0]?.individualFullName,
      assetManager:
        getAssetManagerInfo?._embedded?.parties[0]?.individualFullName
    };
    yield put(propertyActions.fetchPropertySuccess(data));
  } catch (error) {
    yield put(propertyActions.fetchPropertyFailure(error.message));
  }
}

export function* watchGetProperty() {
  yield takeLatest(PROPERTY_FETCH_START, getProperty);
}
