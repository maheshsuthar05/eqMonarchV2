import {
  TENANT_ADD_START,
  TENANT_HEADER_FORM_FETCH_START,
  TENANT_EDIT_START,
  TENANT_ADD_FORM_FETCH_START
} from 'app/main/tenant/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import { propertyApi } from '../../property/services/property.api';
import * as actions from '../store/actions';
import { TenantApiConfig } from 'app/config/api';
import { closeModal } from 'app/store/actions';
import { AggregatorService } from 'app/services/auth0Service/aggregator';

function* tenantAddFormFetch() {
  try {
    const formDefinition = yield call(tenantApi.getAddTenantFormDefinition);
    yield put(actions.tenantAddFormfetchSuccess(formDefinition));
  } catch (error) {
    yield put({ type: 'API_CALL_ERROR', error: error.response.message });
  }
}

function* tenantAdd(action) {
  const { tenantCode, payload, flowablePayload, user } = action;
  try {
    // Add tenant to db and  Call Get Case Definition
    let response = yield all([
      yield call(tenantApi.tenantAdd, tenantCode, payload, user),
      yield call(tenantApi.getCaseDefinition, 'internal')
    ]);
    const tenantId = response[0].tenant.tenantId;
    const caseDefinitionId = response[1].data[0].id;
    // (3) Call Add Tenant to Workflow (Flowable)
    flowablePayload.push({
      name: 'TENANT_ID',
      type: 'string',
      value: tenantId.toString()
    });
    const payloadData = {
      caseDefinitionId: caseDefinitionId,
      businessKey: tenantId,
      variables: flowablePayload
    };
    response = yield call(
      propertyApi.propertyAddToWorkflow,
      tenantCode,
      payloadData
    );
    const caseInstanceId = response.id;
    // (4) Call Update Tenant with Process Instance Id (eqWfCaseRuntimeId)
    const updatePayload = {
      tenant: {
        tenantId: tenantId,
        tenantCode: payload.tenantCode,
        caseInstanceId: caseInstanceId
      }
    };
    response = yield call(propertyApi.propertyUpdate, 'admin', updatePayload);
    // (5) Get the Tenant Id and redirect to Property Details
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Tenant added successfully'
    });
  } catch (error) {
    yield put({ type: 'API_CALL_ERROR', message: 'Onboard of tenant failed' });
  }
}

function* tenantHeaderForm(action) {
  const { tenantCode, payload } = action;
  try {
    let response = yield call(
      tenantApi.getTenantHeaderFormDefinition,
      tenantCode,
      payload
    );
    yield put(actions.fetchTenantHeaderFormSuccess(response));
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      message: 'Fetching tenant header details failed'
    });
  }
}

function* tenantEdit(action) {
  try {
    const tenant = {
      tenantId: action.payload.tenantId,
      tenantCode: action.payload.tenantCode,
      caseInstanceId: action.payload.caseInstanceId,
      caseDefinitionKey: action.payload.caseDefinitionKey,
      description: action.payload.description,
      tenantName: action.payload.tenantName,
      websiteUrl: action.payload.websiteUrl
    };
    action.payload['tenant'] = tenant;
    action.payload['caseDefinitionKey'] =
      TenantApiConfig.headers.caseDefinitionKey;
    action.payload['operation'] = 'UPDATE';
    const response = yield call(AggregatorService.post, action.payload);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: 'Tenant details updated successfully'
    });
    yield put(actions.tenantEditSuccess(response));
    yield put(closeModal());
  } catch (error) {
    yield put(closeModal());
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Tenant Update failed',
      showError: true
    });
  }
}
export function* watchTenantHeaderForm() {
  yield takeLatest(TENANT_HEADER_FORM_FETCH_START, tenantHeaderForm);
}
export function* watchTenantEdit() {
  yield takeLatest(TENANT_EDIT_START, tenantEdit);
}

export function* watchTenantAddFormFetch() {
  yield takeLatest(TENANT_ADD_FORM_FETCH_START, tenantAddFormFetch);
}
export function* watchTenantAdd() {
  yield takeLatest(TENANT_ADD_START, tenantAdd);
}
