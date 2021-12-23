import * as actions from 'app/main/property/store/actionTypes';
import { API_CALL_ERROR } from 'app/store/actions/actionTypes';

export const fetchPropertyDecisionFormStart = (tenantCode) => ({
  type: actions.PROPERTY_DECISION_LISTING_FORM_FETCH_START,
  tenantCode: tenantCode
});

export const fetchPropertyDecisionFormSuccess = (formDefinition) => ({
  type: actions.PROPERTY_DECISION_LISTING_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchPropertyDecisionFormFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DECISION_LISTING_FORM_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyDecisionsStart = (
  tenantCode,
  instanceId,
  includeChildren = false
) => ({
  type: actions.PROPERTY_DECISIONS_FETCH_START,
  tenantCode: tenantCode,
  instanceId: instanceId,
  includeChildren: includeChildren
});

export const fetchPropertyDecisionsSuccess = (decisions) => ({
  type: actions.PROPERTY_DECISIONS_FETCH_SUCCESS,
  decisions: decisions
});

export const fetchPropertyDecisionsFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DECISIONS_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyDecisionGuidancesStart = (
  tenantCode,
  caseInstanceId
) => ({
  type: actions.PROPERTY_DECISION_GUIDANCES_FETCH_START,
  tenantCode: tenantCode,
  caseInstanceId: caseInstanceId
});

export const fetchPropertyDecisionGuidancesSuccess = (guidances) => ({
  type: actions.PROPERTY_DECISION_GUIDANCES_FETCH_SUCCESS,
  guidances: guidances
});

export const fetchPropertyDecisionGuidancesFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DECISION_GUIDANCES_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyDecisionStatusesStart = (
  tenantCode,
  caseInstanceId
) => ({
  type: actions.PROPERTY_DECISION_STATUSES_FETCH_START,
  tenantCode: tenantCode,
  caseInstanceId: caseInstanceId
});

export const fetchPropertyDecisionStatusesSuccess = (statuses) => ({
  type: actions.PROPERTY_DECISION_STATUSES_FETCH_SUCCESS,
  statuses: statuses
});

export const fetchPropertyDecisionStatusesFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DECISION_STATUSES_FETCH_SUCCESS,
  error: error
});

export const fetchPropertyDecisionResultsStart = (
  tenantCode,
  id,
  decisionDefinitionId
) => ({
  type: actions.PROPERTY_DECISION_RESULTS_FETCH_START,
  tenantCode: tenantCode,
  id: id,
  decisionDefinitionId: decisionDefinitionId
});

export const fetchPropertyDecisionResultsSuccess = (results) => ({
  type: actions.PROPERTY_DECISION_RESULTS_FETCH_SUCCESS,
  results: results
});

export const fetchPropertyDecisionResultsFailure = (error) => ({
  type: API_CALL_ERROR,
  atAction: actions.PROPERTY_DECISION_RESULTS_FETCH_SUCCESS,
  error: error
});
