import { roleKeys } from 'app/common/constants';
import * as commonActions from 'app/common/store/actionTypes';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { offerApi } from '../services/offer.service';
import * as Actions from '../store/actionTypes';

function* filterOfferBy(action) {
  try {
    yield put({
      type: Actions.FILTER_PROPERTY_OFFER_LIST_SUCCESS,
      filterBy: action.filterBy
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error in Offer filter. Please contact system Admin.',
      atAction: Actions.FILTER_PROPERTY_OFFER_LIST_SUCCESS
    });
  }
}

export function* watchFilterOfferBy() {
  yield takeLatest(Actions.FILTER_PROPERTY_OFFER_LIST_START, filterOfferBy);
}

function* offerViewType(action) {
  try {
    yield put({
      type: Actions.PROPERTY_OFFER_LIST_VIEW_TYPE_SUCCESS,
      viewType: action.viewType
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error in Offer view change. Please contact system Admin.',
      atAction: Actions.PROPERTY_OFFER_LIST_VIEW_TYPE_SUCCESS
    });
  }
}

export function* watchOfferViewType() {
  yield takeLatest(Actions.PROPERTY_OFFER_LIST_VIEW_TYPE_START, offerViewType);
}

function* getOfferStatus() {
  try {
    const data = yield call(offerApi.getOfferStatus);
    yield put({ type: Actions.GET_OFFER_STATUS, payload: data.offerStatus });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.GET_OFFER_STATUS
    });
  }
}

export function* watchGetOfferStatus() {
  yield takeLatest(Actions.GET_OFFER_STATUS_START, getOfferStatus);
}

function* getOfferList() {
  try {
    const data = yield call(offerApi.getPropertyOfferList);
    yield put({ type: Actions.GET_PROPERTY_OFFER_LIST, payload: data.offers });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.GET_PROPERTY_OFFER_LIST
    });
  }
}

export function* watchGetOfferList() {
  yield takeLatest(Actions.GET_PROPERTY_OFFER_LIST_START, getOfferList);
}

function* getOfferListWithVersions() {
  try {
    const data = yield call(offerApi.getPropertyOfferListWithVersions);
    yield put({
      type: Actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_SUCCESS,
      offersWithVersions: data.offers
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_SUCCESS
    });
  }
}

export function* watchGetOfferListWithVersions() {
  yield takeLatest(
    Actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_START,
    getOfferListWithVersions
  );
}

function* getOfferWorkSheet(action) {
  try {
    const {
      PROPERTY_ID,
      REO_OFFER_ID,
      TARGET_PARTY_ID, // Selling Agent
      SOURCE_PARTY_ID // Buyer
    } = action.offerData;

    const [propertyOffers, propertyPartyXREFs] = yield all([
      yield call(offerApi.getOffersByPropertyId, PROPERTY_ID),
      yield call(offerApi.getOfferXREFByPropertyId, PROPERTY_ID)
    ]);
    const [
      offer,
      property,
      listingAgentRoleXREF,
      closingCompanyRoleXREF,
      closingCoordinatorRoleXREF
    ] = yield all([
      yield call(offerApi.filterOfferById, propertyOffers, REO_OFFER_ID),
      yield select(({ property }) => property.get.property),
      yield call(
        offerApi.filterOfferXREFByRoleType,
        propertyPartyXREFs,
        roleKeys.LISTING_AGENT
      ),
      yield call(
        offerApi.filterOfferXREFByRoleType,
        propertyPartyXREFs,
        roleKeys.CLOSINGCOMPANY
      ),
      yield call(
        offerApi.filterOfferXREFByRoleType,
        propertyPartyXREFs,
        roleKeys.CLOSING_COORDINATOR
      )
    ]);

    const partyIds = [
      listingAgentRoleXREF[0]?.partyId,
      closingCompanyRoleXREF[0]?.partyId,
      SOURCE_PARTY_ID,
      TARGET_PARTY_ID,
      closingCoordinatorRoleXREF[0]?.partyId
    ].filter((p) => p != null);

    const parties = yield call(offerApi.getBulkPartyById, partyIds);
    const [
      listingAgent,
      closingCompany,
      buyer,
      sellingAgent,
      closingCoordinator
    ] = yield all([
      yield call(
        offerApi.filterPartiesByPartyId,
        parties,
        listingAgentRoleXREF[0]?.partyId
      ),
      yield call(
        offerApi.filterPartiesByPartyId,
        parties,
        closingCompanyRoleXREF[0]?.partyId
      ),
      yield call(offerApi.filterPartiesByPartyId, parties, SOURCE_PARTY_ID),
      yield call(offerApi.filterPartiesByPartyId, parties, TARGET_PARTY_ID),
      yield call(
        offerApi.filterPartiesByPartyId,
        parties,
        closingCoordinatorRoleXREF[0]?.partyId
      )
    ]);

    const offerWorkSheetData = {
      offer: offer[0],
      property: property,
      listingAgent: listingAgent[0] === undefined ? {} : listingAgent[0],
      closingCompany: closingCompany[0] === undefined ? {} : closingCompany[0],
      buyer: buyer[0] === undefined ? {} : buyer[0],
      sellingAgent: sellingAgent[0] === undefined ? {} : sellingAgent[0],
      closingCoordinator:
        closingCoordinator[0] === undefined ? {} : closingCoordinator[0],
      options: action?.options
    };

    yield put({
      type: commonActions.GENERATE_FILE_START,
      data: offerWorkSheetData
    });
    yield delay(1000);
    yield put({
      type: Actions.GET_OFFER_WORKSHEET_DATA_SUCCESS,
      offerWorkSheetData: offerWorkSheetData
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.GET_OFFER_WORKSHEET_DATA_START
    });
  }
}

export function* watchGetOfferWorkSheet() {
  yield takeLatest(Actions.GET_OFFER_WORKSHEET_DATA_START, getOfferWorkSheet);
}

function* getOfferCount(action) {
  try {
    const loanNumber = yield select(
      ({ property }) => property.get.property?.loan?.loanNumber
    );
    const propertyOfferCount = yield call(
      offerApi.getOffersByLoanNumber,
      loanNumber
    );

    if (propertyOfferCount.totalHits > 0) {
      yield put({
        type: Actions.GET_OFFER_COUNT_SUCCESS,
        new:
          propertyOfferCount.hits[0].NEW === undefined
            ? 0
            : propertyOfferCount.hits[0].NEW,
        accepted:
          propertyOfferCount.hits[0].ACCEPTED === undefined
            ? 0
            : propertyOfferCount.hits[0].ACCEPTED,
        held:
          propertyOfferCount.hits[0].HELD === undefined
            ? 0
            : propertyOfferCount.hits[0].HELD,
        negotiating:
          propertyOfferCount.hits[0].NEGOTIATING === undefined
            ? 0
            : propertyOfferCount.hits[0].NEGOTIATING,
        rejected:
          propertyOfferCount.hits[0].REJECTED === undefined
            ? 0
            : propertyOfferCount.hits[0].REJECTED
      });
    }
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. [Offer Count] Please contact system Admin.',
      atAction: Actions.GET_OFFER_COUNT_START
    });
  }
}

export function* watchGetOfferCount() {
  yield takeLatest(Actions.GET_OFFER_COUNT_START, getOfferCount);
}
