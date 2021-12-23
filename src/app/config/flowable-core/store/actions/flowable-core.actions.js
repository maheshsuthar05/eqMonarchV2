import * as Actions from '../actionTypes';
import FlowableHelper from 'app/common/helpers/flowable-helper';
import _ from '@lodash';
import { dateToUTCMilliseconds } from 'app/common/helpers/common-helper';
import Moment from 'moment';

export const flowableProcessDefinition = (
  key,
  tenantId,
  data,
  latest = true,
  businessKey = null
) => ({
  type: Actions.FLOWABLE_PROCESS_DEFINITION,
  key,
  tenantId,
  data,
  latest,
  businessKey
});

export const flowableQueryNextTask = (processInstanceId) => ({
  type: Actions.FLOWABLE_QUERY_TASK,
  processInstance: processInstanceId
});

export const flowableCompleteTask = (
  formDefinition,
  completedPayload,
  task,
  processInstance,
  formFinalAction
) => ({
  type: Actions.FLOWABLE_COMPLETE_TASK,
  payload: flowableDataConversion(formDefinition, completedPayload),
  task: task,
  processInstance: processInstance,
  formFinalAction,
  formPayload: completedPayload
});

const flowableDataConversion = (frmDef, payload) => {
  const flowablePayload = FlowableHelper.buildPayload(frmDef, payload);
  const completePayload = {
    action: 'complete',
    variables: flowablePayload
  };
  return completePayload;
};

export const flowableCoreCompleteAndSaveLater = (
  formDefinition,
  completedPayload,
  taskId,
  redirectURL = null
) => ({
  type: Actions.FLOWABLE_CORE_SAVE_AND_COMPLETE_LATER,
  payload: flowableValuesConvertion(completedPayload),
  taskId,
  redirectURL
});

export const flowableCoreComplete = (
  completedPayload,
  taskId,
  redirectURL = null,
  assignee
) => ({
  type: Actions.FLOWABLE_CORE_API_COMPLETE_TASK,
  payload: flowableValuesConvertion(completedPayload),
  taskId,
  redirectURL,
  assignee
});

const flowableValuesConvertion = (payload) => {
  return { values: payload };
};

export const flowableCoreSkipTask = (payload, taskId) => ({
  type: Actions.FLOWABLE_CORE_API_SKIP_TASK,
  payload,
  taskId
});

export const flowableCoreUnClaimTask = (taskId, showMessage = true) => ({
  type: Actions.FLOWABLE_CORE_API_UNCLAIM_TASK,
  taskId,
  showMessage
});

export const flowableCoreUnClaimTaskReset = () => ({
  type: Actions.FLOWABLE_CORE_API_UNCLAIM_TASK_RESET
});

export const flowableProcessResetState = () => ({
  type: Actions.RESET_FLOWABLE_PROCESS_STATE_START
});

export const formDefinitionByFileName = (formdefinition, filename) => {
  const json = _.result(_.find(formdefinition, { fileName: filename }), 'json');
  return json
    ? json
    : _.result(_.find(formdefinition, 'fileName', filename), 'json');
};

export const fetchFormByProcess = (tenantId, key, formAction) => ({
  type: Actions.FLOWABLE_GET_FORM_BY_PROCESS_DEFINITION,
  tenantId,
  key,
  latest: true,
  formAction
});

const pauseUnpausePayload = (data) => {
  return {
    actionType: data.isPaused ? 'unpause' : 'pause',
    actionDate: dateToUTCMilliseconds(data.payload.reopenDate),
    tenantId: data.taskDetails.tenantId,
    name: data.taskDetails.name,
    assignee: data.taskDetails.assignee,
    dueDate: dateToUTCMilliseconds(data.taskDetails.dueDate),
    createdTime: dateToUTCMilliseconds(data.taskDetails.createdTime),
    propertyId: data.propertyId,
    formKey: data.taskDetails.formKey,
    reasonForTaskPause: data.payload.reasonForTaskPause,
    taskDefinitionKey: data.taskDetails.taskDefinitionKey
  };
};

export const flowableCorePauseTask = (data) => ({
  type: Actions.FLOWABLE_CORE_API_PAUSE_TASK,
  payload: buildPauseUnPausePayload(data),
  pausePayload: {
    taskMetadata: pauseUnpausePayload(data)
  },
  taskDetails: data.taskDetails,
  taskId: data.taskDetails.id,
  taskVariables: data.taskVariables,
  isPaused: data.isPaused,
  comments: `Paused until ${Moment(data.payload.reopenDate).format(
    'MM-DD-YYYY'
  )}`
});
export const flowableCoreUnPauseTask = (data) => ({
  type: Actions.FLOWABLE_CORE_API_UNPAUSE_TASK,
  payload: buildPauseUnPausePayload(data),
  unPausePayload: {
    taskMetadata: pauseUnpausePayload(data)
  },
  taskDetails: data.taskDetails,
  taskId: data.taskDetails.id,
  taskVariables: data.taskVariables,
  isPaused: data.isPaused,
  comments: ''
});

export const flowableCorePauseUnPauseInitialCall = (taskDetails) => ({
  type: Actions.FLOWABLE_TASK_PAUSE_UNPAUSE_INITIAL_CALL,
  payload: buildPauseUnPauseInitialPayload(taskDetails),
  taskId: taskDetails.id
});

export const buildPauseUnPausePayload = (data) => {
  const payload = FlowableHelper.buildPayload(data.frmDef, data.payload);
  const payloadHasModified = payload.filter(
    (res) => res.name !== 'reasonForTaskPause'
  );
  const taskDefinitionKey = data.taskDetails.taskDefinitionKey;
  const reformattedPayload = payloadHasModified.map((item) => {
    return !data.isPaused &&
      item.name.toUpperCase() === 'REOPENDATE' &&
      item.value
      ? {
          ...item,
          name: `${item.name}${taskDefinitionKey}`,
          value: `${dateToUTCMilliseconds(item.value)}`,
          type: 'string'
        }
      : { ...item, name: `${item.name}${taskDefinitionKey}` };
  });
  return reformattedPayload;
};

export const buildPauseUnPauseInitialPayload = (data) => {
  const payload = [
    { name: 'isPauseStatus', value: false, type: 'boolean' },
    { name: 'reopenDate', value: '', type: 'string' }
  ];
  return _.map(payload, (res) => {
    return {
      ...res,
      name: `${res.name}${data.taskDefinitionKey}`
    };
  });
};
