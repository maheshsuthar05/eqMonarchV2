import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as Actions from './../store/actionTypes';
import { flowableTaskApi } from 'app/config/flowable-core/services';

function* processTaskByTaskId(arg) {
  try {
    const taskOpenFormDefinition = yield getTaskFormDefinition(arg.taskId);
    yield processTaskPayload(arg);
    yield put({
      type: Actions.FLOWABLE_FINISHED_ALL_TASKS,
      post: true,
      formFinalPayload: taskOpenFormDefinition
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Task Fetch Failed',
      atAction: Actions.FLOWABLE_PROCESS_TASK_DEFINITION
    });
  }
}

function* processTaskPayload(arg) {
  try {
    const taskFormDefinition = yield getTaskFormDefinition(arg.taskId);

    const processVariable = yield getProcessInstance(arg.processInstanceId);
    const parentProcessInstance = yield getParentProcessInstance(
      arg.processInstanceId
    );
    const parentProcessVariable = yield getProcessInstance(
      parentProcessInstance.data[0].id
    );
    const propertyCaseInstanceVariables = yield getPropertyCaseInstanceVariables(
      arg.caseInstanceId
    );

    const convertProcessVariable = yield convertKeyValuePair(processVariable);

    const convertParentProcessVariable = yield convertKeyValuePair(
      parentProcessVariable
    );

    const convertPropertyCaseInstanceVariables = yield convertKeyValuePair(
      propertyCaseInstanceVariables
    );

    const processCustomData = yield getCustomData(
      taskFormDefinition,
      arg.tenantCode
    );

    yield put({
      type: Actions.FLOWABLE_PROCESS_TASK_FORM_PAYLOAD_VARIABLES,
      variables: {
        ...convertProcessVariable,
        parent: convertParentProcessVariable,
        root: convertPropertyCaseInstanceVariables,
        task: taskFormDefinition.metadata
      },
      processinstanceId: arg.processInstanceId,
      parentProcessinstanceId: parentProcessInstance.data[0].id,
      additionaldata: processCustomData
    });
  } catch (error) {
    return error;
  }
}

function* getTaskFormDefinition(taskId) {
  try {
    const taskOpenFormDefinition = yield call(
      flowableTaskApi.getOpenTaskFormDefinition,
      taskId
    );
    return taskOpenFormDefinition;
  } catch (error) {
    return error;
  }
}

function* getProcessInstance(processInstanceId) {
  try {
    const processVariable = yield call(
      flowableTaskApi.getProcessInstanceVariables,
      processInstanceId
    );
    return processVariable;
  } catch (error) {
    return error;
  }
}

function* getParentProcessInstance(processInstanceId) {
  try {
    const parentProcessInstance = yield call(
      flowableTaskApi.getProcessInstanceWithSubProcess,
      processInstanceId
    );
    return parentProcessInstance;
  } catch (error) {
    return error;
  }
}

function* getPropertyCaseInstanceVariables(caseInstaneId) {
  try {
    const propertyCaseInstanceVariables = yield call(
      flowableTaskApi.getPropertyCaseInstanceVariables,
      caseInstaneId
    );
    return propertyCaseInstanceVariables;
  } catch (error) {
    return error;
  }
}

function* convertKeyValuePair(variables) {
  try {
    const response = Object.create(null);
    yield all(
      variables.map((key) => {
        response[key.name] =
          key.name === 'customData' ? JSON.parse(key.value) : key.value;
        return key;
      })
    );
    return response;
  } catch (error) {
    return error;
  }
}

function* getCustomData(formDefinition, tenantCode) {
  try {
    const customData = yield call(flowableTaskApi.customTaskOpenLogic, {
      formDefinition,
      tenantCode
    });
    return customData;
  } catch (error) {
    return error;
  }
}

export function* flowableTaskWatcher() {
  yield takeLatest(
    Actions.FLOWABLE_PROCESS_TASK_DEFINITION,
    processTaskByTaskId
  );
}

export function* flowableTaskPayloadWatcher() {
  yield takeLatest(
    Actions.FLOWABLE_PROCESS_TASK_FORM_PAYLOAD,
    processTaskPayload
  );
}
