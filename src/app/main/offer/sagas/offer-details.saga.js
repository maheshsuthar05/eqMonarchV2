import { OfferApiConfig } from 'app/config/api';
import * as FlowableActions from 'app/config/flowable-core/store/actionTypes';
import { showMessage } from 'app/store/actions/fuse';
import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { offerApi } from '../services/offer.service';
import * as Actions from '../store/actions';
import * as flowable from 'app/config/flowable-core/store/actions';
import { assignedRolesApi } from 'app/main/property/services/role-assign.api';
import { tenantApi } from 'app/main/tenant/services/tenant.api';
import { roleKeys } from 'app/common/constants';

function* getOfferDetails() {
  try {
    const data = yield call(offerApi.getOfferDetails);
    yield put({ type: Actions.GET_OFFER_DETAILS, offerDetails: data });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.GET_OFFER_DETAILS
    });
  }
}

export function* watchGetOfferDetails() {
  yield takeLatest(Actions.GET_OFFER_DETAILS_START, getOfferDetails);
}

function* saveOfferDetails() {
  try {
    yield put({
      type: Actions.SAVE_OFFER_DETAILS,
      payload: null
    });
    yield call(showMessage({ message: 'Offer Saved' }));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.SAVE_OFFER_DETAILS
    });
  }
}

export function* watchSaveOfferDetails() {
  yield takeLatest(Actions.SAVE_OFFER_DETAILS_START, saveOfferDetails);
}

function* updateOfferDetails(action) {
  try {
    yield put(
      flowable.flowableCompleteTask(
        action.data.formDefinition.json,
        action.data.formPayload,
        action.data.formDefinition.taskId,
        action.data.formDefinition.processInstance,
        action.data.formDefinition.formFinalAction
      )
    );
    yield delay(5000); // TO DO
    yield all([
      yield put({
        type: Actions.UPDATE_OFFER_DETAILS_SUCCESS
      }),
      yield put({
        type: 'API_CALL_SUCCESS',
        message: 'Offer Edited successfully'
      })
    ]);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error. Please contact system Admin.',
      atAction: Actions.UPDATE_OFFER_DETAILS_SUCCESS
    });
  }
}

export function* watchUpdateOfferDetails() {
  yield takeLatest(Actions.UPDATE_OFFER_DETAILS_START, updateOfferDetails);
}

function* setOfferDetailsActiveTab(action) {
  try {
    yield put({
      type: Actions.PROPERTY_OFFER_DETAILS_CURRENT_TAB_SUCCESS,
      tabIndex: action.tabIndex
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error in Offer view change. Please contact system Admin.',
      atAction: Actions.PROPERTY_OFFER_DETAILS_CURRENT_TAB_SUCCESS
    });
  }
}

export function* watchSetOfferDetailsActiveTab() {
  yield takeLatest(
    Actions.PROPERTY_OFFER_DETAILS_CURRENT_TAB_START,
    setOfferDetailsActiveTab
  );
}

function* getOfferEditForm() {
  try {
    yield call(getOfferEditFormReset);
    const tenantCode = yield select(({ auth }) => auth?.user?.tenantCode);
    yield put({
      type: FlowableActions.FLOWABLE_PROCESS_DEFINITION,
      tenantId: tenantCode,
      key: OfferApiConfig.keys.edit_offer,
      latest: true
    });
  } catch (error) {
    yield put(Actions.fetchOfferEditFormFailure(error.message));
  }
}

export function* watchGetOfferEditForm() {
  yield takeLatest(Actions.EDIT_OFFER_FORM_FETCH_START, getOfferEditForm);
}

function* getOfferEditFormReset(action) {
  try {
    yield put(Actions.fetchOfferEditFormResetSuccess(false));
  } catch (error) {
    yield put(Actions.fetchOfferEditFormFailure(error.message));
  }
}

export function* watchGetOfferEditFormReset() {
  yield takeLatest(
    Actions.EDIT_OFFER_FORM_FETCH_RESET_START,
    getOfferEditFormReset
  );
}

function* getOfferContacts(action) {
  try {
    const {
      PROPERTY_ID,
      TARGET_PARTY_ID, // Selling Agent
      SOURCE_PARTY_ID // Buyer
    } = action.offerDetails;
    const propertyRoles = yield call(
      assignedRolesApi.getRolesByPropertyId,
      PROPERTY_ID
    );

    const assetManagerRole = yield call(
      offerApi.filterPropertyRoleByRoleKey,
      propertyRoles,
      roleKeys.ASSET_MANAGER
    );
    const tenantCode = yield select(({ auth }) => auth?.user?.tenantCode);
    const assetManagerInfo = yield call(
      tenantApi.userGet,
      tenantCode,
      assetManagerRole[0]?.userId
    );
    const partyIds = [SOURCE_PARTY_ID, TARGET_PARTY_ID].filter(
      (p) => p != null
    );
    const parties = yield call(offerApi.getBulkPartyById, partyIds);
    const [buyer, sellingAgent, assetManager] = yield all([
      yield call(offerApi.filterPartiesByPartyId, parties, SOURCE_PARTY_ID),
      yield call(offerApi.filterPartiesByPartyId, parties, TARGET_PARTY_ID),
      yield call(
        offerApi.getPropertyRolePersionInfo,
        assetManagerInfo,
        'Asset Manager'
      )
    ]);

    const keyParties = {
      contacts: [
        assetManager,
        yield call(Actions.getContactDetails, 'Selling Agent', sellingAgent),
        yield call(Actions.getContactDetails, 'Buyer', buyer)
      ]
    };
    yield put({
      type: Actions.OFFER_CONTACTS_FETCH_SUCCESS,
      offerContacts: keyParties.contacts
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error: 'Error in Offer Contacts. Please contact system Admin.',
        atAction: Actions.OFFER_CONTACTS_FETCH_SUCCESS
      }),
      yield put(Actions.fetchOfferContactsFailure(error.message))
    ]);
  }
}

export function* watchGetOfferContacts() {
  yield takeLatest(Actions.OFFER_CONTACTS_FETCH_START, getOfferContacts);
}

function* getOfferEditFormSuccess() {
  try {
    yield put({
      type: Actions.EDIT_OFFER_FORM_FETCH_COMPLETED_SUCCESS,
      formDefinition: null
    });
  } catch (error) {
    yield put(Actions.fetchOfferEditFormFailure(error.message));
  }
}

export function* watchGetOfferEditFormSuccess() {
  yield takeLatest(
    Actions.EDIT_OFFER_FORM_FETCH_SUCCESS,
    getOfferEditFormSuccess
  );
}

function* getOfferWorkSheetInitialPayload(action) {
  try {
    const {
      PROPERTY_ID,
      TARGET_PARTY_ID // Selling Agent
    } = action.data;
    const propertyRoles = yield call(
      assignedRolesApi.getRolesByPropertyId,
      PROPERTY_ID
    );

    const auctionCompanyRole = yield call(
      offerApi.filterPropertyRoleByRoleKey,
      propertyRoles,
      roleKeys.AUCTION_COMPANY
    );
    const tenantCode = yield select(({ auth }) => auth?.user?.tenantCode);
    const auctionCompanyInfo =
      auctionCompanyRole[0] === undefined
        ? {}
        : yield call(
            tenantApi.userGet,
            tenantCode,
            auctionCompanyRole[0]?.userId
          );
    const partyIds = [TARGET_PARTY_ID].filter((p) => p != null);
    const parties = yield call(offerApi.getBulkPartyById, partyIds);
    const [sellingAgent, auctionCompany] = yield all([
      yield call(offerApi.filterPartiesByPartyId, parties, TARGET_PARTY_ID),
      yield call(
        offerApi.getPropertyRolePersionInfo,
        auctionCompanyInfo,
        'Auction Company'
      )
    ]);

    const sellingAgentContact = yield call(
      Actions.getContactDetails,
      'Selling Agent',
      sellingAgent
    );

    const initialPayload = yield call(Actions.getOfferMailInitialPayload, {
      ...action.data,
      auctionCompany: auctionCompany,
      sellingAgent: sellingAgentContact
    });
    yield put({
      type: Actions.GET_OFFER_MAIL_PAYLOAD_SUCCESS,
      ...initialPayload
    });
  } catch (error) {
    yield all([
      yield put({
        type: 'API_CALL_ERROR',
        error:
          'Error in Offer Worksheet Payload creation. Please contact system Admin.',
        atAction: Actions.GET_OFFER_MAIL_PAYLOAD_SUCCESS
      })
    ]);
  }
}

export function* watchOfferWorkSheetInitialPayload() {
  yield takeLatest(
    Actions.GET_OFFER_MAIL_PAYLOAD_START,
    getOfferWorkSheetInitialPayload
  );
}
