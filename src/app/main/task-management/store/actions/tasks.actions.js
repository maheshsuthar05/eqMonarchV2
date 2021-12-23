import _ from '@lodash';
import { taskDetailsButtons } from 'app/common/constants';
import { flowable, forgerock } from 'app/config/api';
import Cookies from 'js-cookie';
import * as Actions from '../actionTypes';

export const showTaskDetails = (details) => ({
  type: Actions.SHOW_TASK_DETAILS,
  details
});

export const hideTaskDetails = () => ({
  type: Actions.RESET_TASK_DETAILS
});

const taskRequesPayload = (caseInstanceIdWithChildren, groups, tenantId) => {
  return {
    sort: 'createTime',
    order: 'desc',
    caseInstanceIdWithChildren,
    size: groups ? '100' : '0',
    tenantId,
    ignoreAssignee: true
  };
};

export const buildOpenClaimTaskPayload = (
  caseInstanceIdWithChildren,
  groups,
  tenantId
) => {
  const isAssetManager = _.indexOf(groups, 'AssetManager') >= 0 ? true : false;
  return {
    ...taskRequesPayload(caseInstanceIdWithChildren, groups, tenantId),
    candidateGroupIn: isAssetManager ? null : groups
  };
};

export const buildCloseClaimTaskPayload = (
  caseInstanceIdWithChildren,
  groups,
  tenantId
) => {
  const isAssetManager = _.indexOf(groups, 'AssetManager') >= 0 ? true : false;
  return {
    ...taskRequesPayload(caseInstanceIdWithChildren, groups, tenantId),
    candidateGroupIn: isAssetManager ? null : groups,
    finished: true,
    sort: 'startTime'
  };
};

export const buildAssignOpenTaskPayload = (
  caseInstanceIdWithChildren,
  tenantId,
  roles
) => {
  const isAssetManager = _.indexOf(roles, 'AssetManager') >= 0 ? true : false;
  return {
    sort: 'createTime',
    order: 'desc',
    caseInstanceIdWithChildren,
    size: '100',
    tenantId,
    assignee: null,
    candidateGroupIn: isAssetManager ? null : roles
  };
};

export const buildAssignCloseTaskPayload = (
  caseInstanceIdWithChildren,
  tenantId
) => {
  return {
    finished: true,
    sort: 'startTime',
    order: 'desc',
    caseInstanceIdWithChildren,
    assignee: Cookies.get(forgerock.cookie.userName),
    size: '100',
    tenantId
  };
};

export const buildAditionalDataForOpenTask = () => {
  return {
    additionalData: {
      // url: flowable.api.getAllCmmnQueryTask
      url: flowable.api.openTask
    }
  };
};

export const buildAditionalDataForCloseTask = () => {
  return {
    additionalData: {
      // url: flowable.api.historicalTaskInstances
      url: flowable.api.closeTask
    }
  };
};

export const processConvertKeyValuePair = (variables) => {
  let response;
  const getObject = Object.create(null);
  try {
    if (_.isArray(variables)) {
      response = variablesKeyValuePair(variables);
    } else {
      if (_.has(variables, 'variables')) {
        if (_.findKey(variables.variables, ['name', 'customData'])) {
          const customData = _.find(variables.variables, 'name', 'customData');
          getObject['customData'] = JSON.parse(customData.value);
          response = getObject;
        } else {
          response = variablesKeyValuePairAsObject(variables.variables);
        }
      } else {
        response = variables;
      }
    }
    return response;
  } catch (e) {
    return e;
  }
};

export const variablesKeyValuePair = (variables) => {
  const response = Object.create(null);
  _.forEach(variables, (v, k) => {
    response[v.name] = v.value;
  });
  return response;
};

export const variablesKeyValuePairAsObject = (variables) => {
  const response = Object.create(null);
  _.forEach(variables, (v, k) => {
    response[v.name] = v.value;
  });
  return response;
};

export const restTaskButtons = () => ({ type: Actions.RESET_TASK_BUTTONS });

export const showTaskButtons = (taskDetails, taskVariables) => {
  const buttons = {
    ...taskDetailsButtons
  };
  const taskDefinitionKey = taskDetails.taskDefinitionKey;
  const isPaused = taskVariables.hasOwnProperty(
    `isPauseStatus${taskDefinitionKey}`
  )
    ? taskVariables[`isPauseStatus${taskDefinitionKey}`]
    : false;
  const canPause = taskVariables?.canPauseIndicator;
  const canUnPause = taskVariables?.canUnpauseIndicator;
  buttons.SAVE = !isPaused;
  buttons.SAVE_AND_COMPLETE_LATER = !isPaused;
  buttons.CLAIM = !isPaused;
  buttons.UN_CLAIM = !isPaused;
  buttons.UN_PAUSE = !isPaused;
  buttons.SKIP = taskVariables?.canSkipIndicator;
  buttons.PAUSE = isPaused ? canUnPause : canPause;

  return {
    type: Actions.SHOW_TASK_BUTTONS,
    taskButtons: buttons
  };
};

const progressingState = (num) => {
  return _.inRange(num, 0, 33)
    ? 25
    : _.inRange(num, 33, 66)
    ? 50
    : _.inRange(num, 66, 99)
    ? 75
    : num === 100
    ? 100
    : null;
};

const roundedValueOfFields = (formField, requiredField) => {
  const matchingField = [];
  _.filter(requiredField, (res) => {
    if (_.has(formField, res)) {
      if (formField[res] !== '' && formField[res] !== null) {
        matchingField.push(res);
      }
    }
  });
  const sizeOfField = _.size(_.keys(matchingField)) / _.size(requiredField);
  return _.round(sizeOfField * 100);
};
export const useFormProgressingState = (data) => {
  const introductionFormRequiredField = [
    'email',
    'parcelNo',
    'propertyValuationStateType'
  ];
  const generalMarketConditionFormRequiredFields = [
    'currentmarketcondition',
    'employmentConditions',
    'supply',
    'noOfBoardedOrBlockedUpHomes',
    'percentageOwnerOccupant',
    'percentageTenant',
    'percentageVacant'
  ];
  const subjectMarketabilityFormRequiredFields = [
    'fromDollar',
    'to',
    'improvement'
  ];

  const competitiveClosedSalesFormRequiredFields = [
    'comparable1Address',
    'comparable1City',
    'comparable1State',
    'comparable1PostalCode'
  ];
  const marketingStrategyFormRequiredFields = [
    'marketingStrategy',
    'mostLikelyBuyer'
  ];
  const repairsFormRequiredFields = ['insurableDamage'];
  const competitiveListingsFormRequiredFields = [
    'comparable1Address',
    'comparable1City',
    'comparable1State',
    'comparable1PostalCode'
  ];
  const marketValueFormRequiredFields = ['propertyValuationAmount'];
  const narrativeFormRequiredFields = ['conditionOfProperty'];
  const uploadFormRequiredFields = ['subjectExterior'];

  const allFormRequiredFields = [
    ...introductionFormRequiredField,
    ...generalMarketConditionFormRequiredFields,
    ...subjectMarketabilityFormRequiredFields,
    ...competitiveClosedSalesFormRequiredFields,
    ...marketingStrategyFormRequiredFields,
    ...repairsFormRequiredFields,
    ...competitiveListingsFormRequiredFields,
    ...marketValueFormRequiredFields,
    ...narrativeFormRequiredFields,
    ...uploadFormRequiredFields
  ];
  let initialLoaderState = {
    introductionProgressingState: 25,
    generalMarketConditionProgressingState: 25,
    subjectMarketabilityProgressingState: 25,
    competitiveClosedSalesProgressingState: 25,
    marketingStrategyProgressingState: 25,
    repairsProgressingState: 25,
    competitiveListingsProgressingState: 25,
    marketValueProgressingState: 25,
    narrativeProgressingState: 25,
    uploadProgressingState: 25
  };
  if (_.has(data, 'allFormFields')) {
    let combineValues = {
      ...data.allFormFields.introductionFormFields,
      ...data.allFormFields.generalMarketConditionFormFields,
      ...data.allFormFields.subjectMarketabilityFormFields,
      ...data.allFormFields.competitiveClosedSalesFormFields,
      ...data.allFormFields.marketingStrategyFormFields,
      ...data.allFormFields.repairsFormFields,
      ...data.allFormFields.competitiveListingsFormFields,
      ...data.allFormFields.marketValueFormFields,
      ...data.allFormFields.narrativeFormFields,
      ...data.allFormFields.uploadFormFields
    };
    initialLoaderState['allFormProgressingState'] = progressingState(
      roundedValueOfFields(combineValues, allFormRequiredFields)
    );
  }
  if (data) {
    _.has(data, 'introductionFormFields') &&
      (initialLoaderState['introductionProgressingState'] = progressingState(
        roundedValueOfFields(
          data.introductionFormFields,
          introductionFormRequiredField
        )
      ));
    _.has(data, 'generalMarketConditionFormFields') &&
      (initialLoaderState[
        'generalMarketConditionProgressingState'
      ] = progressingState(
        roundedValueOfFields(
          data.generalMarketConditionFormFields,
          generalMarketConditionFormRequiredFields
        )
      ));

    _.has(data, 'subjectMarketabilityFormFields') &&
      (initialLoaderState[
        'subjectMarketabilityProgressingState'
      ] = progressingState(
        roundedValueOfFields(
          data.subjectMarketabilityFormFields,
          subjectMarketabilityFormRequiredFields
        )
      ));

    _.has(data, 'competitiveClosedSalesFormFields') &&
      (initialLoaderState[
        'competitiveClosedSalesProgressingState'
      ] = progressingState(
        roundedValueOfFields(
          data.competitiveClosedSalesFormFields,
          competitiveClosedSalesFormRequiredFields
        )
      ));

    _.has(data, 'marketingStrategyFormFields') &&
      (initialLoaderState[
        'marketingStrategyProgressingState'
      ] = progressingState(
        roundedValueOfFields(
          data.marketingStrategyFormFields,
          marketingStrategyFormRequiredFields
        )
      ));

    _.has(data, 'repairsFormFields') &&
      (initialLoaderState['repairsProgressingState'] = progressingState(
        roundedValueOfFields(data.repairsFormFields, repairsFormRequiredFields)
      ));

    _.has(data, 'competitiveListingsFormFields') &&
      (initialLoaderState[
        'competitiveListingsProgressingState'
      ] = progressingState(
        roundedValueOfFields(
          data.competitiveListingsFormFields,
          competitiveListingsFormRequiredFields
        )
      ));

    _.has(data, 'marketValueFormFields') &&
      (initialLoaderState['marketValueProgressingState'] = progressingState(
        roundedValueOfFields(
          data.marketValueFormFields,
          marketValueFormRequiredFields
        )
      ));

    _.has(data, 'narrativeFormFields') &&
      (initialLoaderState['narrativeProgressingState'] = progressingState(
        roundedValueOfFields(
          data.narrativeFormFields,
          narrativeFormRequiredFields
        )
      ));

    _.has(data, 'uploadFormFields') &&
      (initialLoaderState['uploadProgressingState'] = progressingState(
        roundedValueOfFields(data.uploadFormFields, uploadFormRequiredFields)
      ));
  }

  let initialLoaderStateModified = {
    ...initialLoaderState,
    allFormButtonState:
      initialLoaderState.allFormProgressingState === 100 ? true : false,
    formButtonState:
      initialLoaderState.introductionProgressingState === 100 &&
      initialLoaderState.generalMarketConditionProgressingState === 100 &&
      initialLoaderState.subjectMarketabilityProgressingState === 100 &&
      initialLoaderState.competitiveClosedSalesProgressingState === 100 &&
      initialLoaderState.marketingStrategyProgressingState === 100 &&
      initialLoaderState.repairsProgressingState === 100 &&
      initialLoaderState.competitiveListingsProgressingState === 100 &&
      initialLoaderState.marketValueProgressingState === 100 &&
      initialLoaderState.narrativeProgressingState === 100 &&
      initialLoaderState.uploadProgressingState === 100
        ? true
        : false
  };
  return initialLoaderStateModified;
};
