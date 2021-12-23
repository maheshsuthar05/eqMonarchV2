import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyInitStart = (tenantCode, caseInstanceId) => ({
  type: actions.PROPERTY_INIT_FETCH_START,
  caseInstanceId: caseInstanceId,
  tenantCode: tenantCode
});

export const fetchPropertyInitSuccess = (stageOverview, caseDefinition) => ({
  type: actions.PROPERTY_INIT_FETCH_SUCCESS,
  stageOverview: stageOverview,
  caseDefinition: caseDefinition
});

export const fetchPropertyInitFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_INIT_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyStageOverviewStart = (
  tenantCode,
  caseInstanceId
) => ({
  type: actions.PROPERTY_STAGE_OVERVIEW_FETCH_START,
  caseInstanceId: caseInstanceId,
  tenantCode: tenantCode
});

export const fetchPropertyStageOverviewSuccess = (stageOverview) => ({
  type: actions.PROPERTY_STAGE_OVERVIEW_FETCH_SUCCESS,
  stageOverview: stageOverview
});

export const fetchPropertyStageOverviewFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_STAGE_OVERVIEW_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyCaseDefinitionStart = (tenantCode) => ({
  type: actions.PROPERTY_CASE_DEFINITION_FETCH_START,
  tenantCode: tenantCode
});

export const fetchPropertyCaseDefinitionSuccess = (caseDefinition) => ({
  type: actions.PROPERTY_CASE_DEFINITION_FETCH_SUCCESS,
  caseDefinition: caseDefinition
});

export const fetchPropertyCaseDefinitionFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_CASE_DEFINITION_FETCH_SUCCESS,
  error: error
});
