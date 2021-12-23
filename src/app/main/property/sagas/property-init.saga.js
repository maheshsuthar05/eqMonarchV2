import {
  PROPERTY_CASE_DEFINITION_FETCH_START,
  PROPERTY_INIT_FETCH_START,
  PROPERTY_STAGE_OVERVIEW_FETCH_START
} from 'app/main/property/store/actionTypes';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { propertyApi } from '../services/property.api';
import * as propertyActions from '../store/actions';

function* getPropertyInit(action) {
  try {
    const [stageOverview, caseDefinition] = yield all([
      yield call(getPropertyStageOverview, action),
      yield call(getPropertyCaseDefinition, {
        tenantCode: action.tenantCode
      })
    ]);
    yield put(
      propertyActions.fetchPropertyInitSuccess(stageOverview, caseDefinition)
    );
  } catch (error) {
    yield put(propertyActions.fetchPropertyInitFailure(error.message));
  }
}

export function* watchGetPropertyInit() {
  yield takeLatest(PROPERTY_INIT_FETCH_START, getPropertyInit);
}

function* getPropertyStageOverview(action) {
  try {
    const { caseInstanceId, tenantCode } = action;
    const stageOverview = yield call(
      propertyApi.getPropertyStageOverview,
      tenantCode,
      caseInstanceId
    );
    yield put(propertyActions.fetchPropertyStageOverviewSuccess(stageOverview));
    return stageOverview;
  } catch (error) {}
}

export function* watchGetPropertyStageOverview() {
  yield takeLatest(
    PROPERTY_STAGE_OVERVIEW_FETCH_START,
    getPropertyStageOverview
  );
}

function* getPropertyCaseDefinition(action) {
  try {
    const { tenantCode } = action;
    const response = yield call(propertyApi.getCaseDefinition, tenantCode);
    let caseDefinition = null;
    if (response && response.data && response.data.length) {
      caseDefinition = response.data[0];
    }
    yield put(
      propertyActions.fetchPropertyCaseDefinitionSuccess(caseDefinition)
    );
    return caseDefinition;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyCaseDefinitionFailure(error.message)
    );
  }
}

export function* watchGetPropertyCaseDefinition() {
  yield takeLatest(
    PROPERTY_CASE_DEFINITION_FETCH_START,
    getPropertyCaseDefinition
  );
}
