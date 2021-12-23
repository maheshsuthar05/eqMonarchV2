import history from '@history';
import { PropertyApiConfig } from 'app/config/api';
import {
  PROPERTY_ADD_FORM_FETCH_START,
  PROPERTY_ADD_START
} from 'app/main/property/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';
import { closeModal } from 'app/store/actions';
import * as CommonActions from 'app/store/actions/actionTypes';

function* getPropertyAddForm(action) {
  try {
    const key = PropertyApiConfig.keys.add_form;
    const processDefinition = yield call(
      propertyApi.getProcessDefinitionByCase,
      action.tenantCode,
      key
    );
    let processDefinitionId = null;
    if (
      processDefinition &&
      processDefinition.data &&
      processDefinition.data.length
    ) {
      processDefinitionId = processDefinition.data[0].id;
    }
    const formDefinition = yield call(
      propertyApi.getFormDefinitionByCase,
      action.tenantCode,
      processDefinitionId
    );
    yield put(propertyActions.fetchPropertyAddFormSuccess(formDefinition));
  } catch (e) {
    yield put(propertyActions.fetchPropertyAddFormFailure(e.message));
  }
}

export function* watchGetPropertyAddForm() {
  yield takeLatest(PROPERTY_ADD_FORM_FETCH_START, getPropertyAddForm);
}

function* propertyAdd(action) {
  const { tenantCode, payload, flowablePayload } = action;
  try {
    // (1) Call Add Property
    let response = yield call(propertyApi.propertyAdd, payload);
    const propertyId = response.property.propertyId;

    const marketingId = response?.marketingPlan?.marketingPlanId;
    const eqOrderId = response?.eqOrder?.orderId;
    const propertyReosId = response?.propertyReo?.propertyReoId;
    const propertyListingAuctionSaleDetailId =
      response?.propertyListingAuctionSaleDetail
        ?.propertyListingAuctionSaleDetailId;
    // (2) Call Get Case Definition
    response = yield call(propertyApi.getCaseDefinition, tenantCode);
    const caseDefinitionId = response.data[0].id;
    // (3) Call Add Property to Workflow (Flowable)
    flowablePayload.push({
      name: 'PROPERTY_ID',
      type: 'string',
      value: propertyId.toString()
    });
    const payloadData = {
      caseDefinitionId: caseDefinitionId,
      businessKey: propertyId,
      variables: flowablePayload
    };
    response = yield call(propertyApi.propertyAddToWorkflow, payloadData);
    const caseInstanceId = response.id;

    //add marketing plan id
    yield call(propertyApi.addMarketingId, marketingId, propertyId);
    //update eqOrders
    yield call(propertyApi.updateEqOrders, eqOrderId, propertyId);
    //update propertyReos
    yield call(propertyApi.updatePropertyReos, propertyReosId, propertyId);
    //update propertyListingAuctionSaleDetail
    yield call(
      propertyApi.updatePropertyListingAuctionSale,
      propertyListingAuctionSaleDetailId,
      propertyId
    );
    // (4) Call Update Property with Process Instance Id (eqWfCaseRuntimeId)

    const updatePayload = {
      caseInstanceId: caseInstanceId,
      propertyId: propertyId
    };
    response = yield call(propertyApi.propertyUpdate, updatePayload);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Property has been added successfully.'
    });
    yield put(closeModal());
    // (5) Get the Property Id and redirect to Property Details
    history.push(`/property/details/${caseInstanceId}`);
    // history.push(`/property/details/${caseInstanceId}/TaskManagement/Claims`);
    yield put(propertyActions.propertyAddSuccess(response));
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Could not add property. Please contact system Admin.',
        showError: true
      }),
      yield put(closeModal())
    ]);
  }
}

export function* watchPropertyAdd() {
  yield takeLatest(PROPERTY_ADD_START, propertyAdd);
}
