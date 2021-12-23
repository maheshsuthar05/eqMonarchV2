import * as Actions from '../actionTypes';
import * as FlowableActions from 'app/config/flowable-core/store/actionTypes';
import _ from '@lodash';

export const getAllDefaultGlobalRolesStart = (roleUpdateFlag) => ({
  type: Actions.GET_ALL_DEFAULT_GLOBAL_ROLES_START,
  roleUpdateFlag
});

export const updateAllDefaultGlobalRolesStart = (partyRolePayload) => ({
  type: Actions.UPDATE_ALL_DEFAULT_GLOBAL_ROLES_START,
  partyRolePayload
});

export const fetchLegalEntitiesFormStart = () => ({
  type: Actions.FETCH_LEGAL_ENTITY_FORM_START
});

export const saveLegalEntityStart = (payload, refresh) => ({
  type: Actions.ADD_LEGAL_ENTITY,
  payload,
  refresh
});

export const editLegalEntityStart = (payload, refresh) => ({
  type: Actions.EDIT_LEGAL_ENTITY,
  payload,
  refresh
});

export const deleteLegalEntityStart = (payload, refresh) => ({
  type: Actions.DELETE_LEGAL_ENTITY,
  payload,
  refresh
});

export const saveListingTypeStart = (payload) => ({
  type: Actions.SAVE_LISTING_TYPE,
  payload: payload
});

export const editListingTypeStart = (payload) => ({
  type: Actions.EDIT_LISTING_TYPE,
  payload: payload
});

export const getListingTypeStart = () => ({
  type: Actions.GET_LISTING_TYPE
});

export const getLegalEntityStart = () => ({
  type: Actions.GET_LEGAL_ENTITY
});

export const fetchManageClientConfigurationFormStart = () => ({
  type: Actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_START
});

export const fetchManageWorkflowSettingsFormStart = () => ({
  type: Actions.FETCH_MANAGE_WORKFLOW_SETTINGS_FORM_START
});

export const fetchUserLoadBalanceFormStart = () => ({
  type: Actions.FETCH_USER_LOAD_BALANCE_FORM_START
});

export const fetchStateRoleAssignmentFormStart = () => ({
  type: Actions.FETCH_STATE_ROLE_ASSIGN_FORM_START
});

export const getForm = (caseId) => ({
  type: FlowableActions.FLOWABLE_GET_FORM_BY_CASE_DEFINITION_ID,
  id: caseId
});

export const getCaseId = (key) => ({
  type: Actions.FETCH_FLOWABLE_CASE_ID,
  key: key
});

export const getProcessId = (key) => ({
  type: Actions.FETCH_FLOWABLE_PROCESS_ID,
  key: key
});

export const save = (
  tenantCode,
  uniqueSearchPayload,
  payload,
  caseDefinitionKey,
  refresh
) => ({
  type: Actions.SAVE_TO_FLOWABLE,
  tenantCode: tenantCode,
  uniqueSearchPayload: uniqueSearchPayload,
  payload: payload,
  caseDefinitionKey: caseDefinitionKey,
  refresh
});

export const update = (
  tenantCode,
  uniqueSearchPayload,
  payload,
  caseDefinitionKey,
  id,
  refresh
) => ({
  type: Actions.UPDATE_IN_FLOWABLE,
  tenantCode: tenantCode,
  uniqueSearchPayload: uniqueSearchPayload,
  payload: payload,
  caseDefinitionKey: caseDefinitionKey,
  id: id,
  refresh
});

export const getCaseData = (tenantCode, key) => ({
  type: Actions.GET_CASE_DATA,
  tenantCode: tenantCode,
  key: key
});

const uniqueVar = [];
export const uniqueSearchVariable = (
  caseDefinitionKey,
  variablePayload,
  ...args
) => {
  args.map((keyArgs) => {
    variablePayload.filter((VarRes) => {
      if (VarRes.name === keyArgs) {
        uniqueVar.push({ ...VarRes, operation: 'equals' });
      }
      return VarRes;
    });
    return keyArgs;
  });

  return {
    caseDefinitionKey,
    variables: [...uniqueVar]
  };
};

export const deleteStateEvictionById = (payload, refresh) => ({
  type: Actions.DELETE_STATE_EVITION_BY_ID,
  payload: payload,
  refresh
});

export const customfetchPayload = (caseDefinationKey) => {
  let payload = {
    caseDefinitionKey: caseDefinationKey,
    sort: 'startTime',
    order: 'desc',
    size: '500',
    includeCaseVariables: true,
    start: 0
  };
  return payload;
};

export const fetchDecisionTable = (tenantCode, key) => ({
  type: Actions.FETCH_DECISION_TABLE_ADMIN,
  tenantCode,
  key
});

export const fetchRules = (id) => ({
  type: Actions.FETCH_RULES_ADMIN,
  id
});

export const payloadToEditScreen = (data) => {
  let payload = {};
  data.variables.map((ele) => {
    payload[ele.name] = ele.value;
    return ele;
  });
  return payload;
};

export const convertDataToVariables = (payload) => ({
  type: Actions.CONVERT_TO_VARIABLES,
  payload: _convertDataToVariables(payload)
});

const _convertDataToVariables = (payload) => {
  const variables = {};
  let processed = false;
  if (_.has(payload, 'variables')) {
    _.map(payload.variables, (res, i) => {
      if (res.name === 'investorGroups') {
        variables['investorGroups'] = res.value[0];
      }
      if (payload.variables.length === i + 1) {
        processed = true;
      }
      variables[res.name] = res.value;
    });
  }
  return { variables, processed };
};

export const saveStateEvictionId = (payload, refresh) => ({
  type: Actions.ADD_STATE_EVITION_BY_ID,
  payload: payload,
  refresh
});

export const updateStateEvictionId = (payload, refresh) => ({
  type: Actions.UPDATE_STATE_EVITION_BY_ID,
  payload,
  refresh
});

export const stateEvictionActionDELETE = (payload, refresh) => ({
  type: Actions.ADMIN_DELETE_STATE_EVICTION_BY_ID,
  payload,
  refresh
})
