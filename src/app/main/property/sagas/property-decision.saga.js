import RulesHelper from 'app/main/property/services/rules-helper';
import {
  PROPERTY_DECISION_GUIDANCES_FETCH_START,
  PROPERTY_DECISION_LISTING_FORM_FETCH_START,
  PROPERTY_DECISION_RESULTS_FETCH_START,
  PROPERTY_DECISION_STATUSES_FETCH_START,
  PROPERTY_DECISIONS_FETCH_START
} from 'app/main/property/store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';

function* getPropertyDecisionForm(state) {
  try {
    const formDefinition = yield call(
      propertyApi.getPropertyDecisionFormDefinition
    );
    yield put(propertyActions.fetchPropertyDecisionFormSuccess(formDefinition));
  } catch (error) {
    yield put(propertyActions.fetchPropertyDecisionFormFailure(error.message));
  }
}

export function* watchGetPropertyDecisionForm() {
  yield takeLatest(
    PROPERTY_DECISION_LISTING_FORM_FETCH_START,
    getPropertyDecisionForm
  );
}

function* getPropertyDecisions(state) {
  const { tenantCode, instanceId, includeChildren } = state;
  try {
    const decisions = yield call(
      propertyApi.getPropertyDecisions,
      tenantCode,
      instanceId,
      includeChildren
    );
    yield put(propertyActions.fetchPropertyDecisionsSuccess(decisions));
  } catch (error) {
    yield put(propertyActions.fetchPropertyDecisionsFailure(error.message));
  }
}

export function* watchGetPropertyDecisions() {
  yield takeLatest(PROPERTY_DECISIONS_FETCH_START, getPropertyDecisions);
}

function* getPropertyDecisionGuidances(state) {
  const { tenantCode, caseInstanceId } = state;
  try {
    const guidances = yield call(
      propertyApi.getPropertyDecisionGuidances,
      tenantCode,
      caseInstanceId
    );
    yield put(propertyActions.fetchPropertyDecisionGuidancesSuccess(guidances));
    return guidances;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyDecisionGuidancesFailure(error.message)
    );
  }
}

export function* watchGetPropertyDecisionGuidances() {
  yield takeLatest(
    PROPERTY_DECISION_GUIDANCES_FETCH_START,
    getPropertyDecisionGuidances
  );
}

function* getPropertyDecisionStatuses(state) {
  const { tenantCode, caseInstanceId } = state;
  try {
    const statuses = yield call(
      propertyApi.getPropertyDecisionStatuses,
      tenantCode,
      caseInstanceId
    );
    yield put(propertyActions.fetchPropertyDecisionStatusesSuccess(statuses));
    return statuses;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyDecisionStatusesFailure(error.message)
    );
  }
}

export function* watchGetPropertyDecisionStatuses() {
  yield takeLatest(
    PROPERTY_DECISION_STATUSES_FETCH_START,
    getPropertyDecisionStatuses
  );
}

function* getPropertyDecisionResults(state) {
  const { tenantCode, id, decisionDefinitionId } = state;
  try {
    let caseInstanceId = id;
    const guidances = yield call(getPropertyDecisionGuidances, {
      tenantCode,
      caseInstanceId
    });
    caseInstanceId = decisionDefinitionId;
    const statuses = yield call(getPropertyDecisionStatuses, {
      tenantCode,
      caseInstanceId
    });
    const results = yield call(
      RulesHelper.getRulesAndInputs,
      statuses,
      guidances
    );
    yield put(propertyActions.fetchPropertyDecisionResultsSuccess(results));
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyDecisionResultsFailure(error.message)
    );
  }
}

export function* watchGetPropertyDecisionResults() {
  yield takeLatest(
    PROPERTY_DECISION_RESULTS_FETCH_START,
    getPropertyDecisionResults
  );
}
