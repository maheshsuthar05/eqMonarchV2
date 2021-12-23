import * as Actions from '../store/actionTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { TaskApi } from '../services';
import { getCurrentDate } from 'app/common/helpers/common-helper';
import { flowableTaskApi } from 'app/config/flowable-core/services';
import md5 from 'md5';
import FlowableHelper from 'app/common/helpers/flowable-helper';
import { processConvertKeyValuePair } from '../store/actions';

function* fetchTaskForm(args) {
  try {
    const { process, formDefinition } =
      args.taskStatus === 'open' ? yield openTask(args) : yield closeTask(args);

    const taskVariable = yield call(
      flowableTaskApi.getTaskVariables,
      args.taskId
    );

    const convertTaskVariable = yield processConvertKeyValuePair(taskVariable);

    const parentProcessInstance = yield getParentProcessInstance(
      process.processInstanceId
    );

    let convertParentProcessVariable = {};
    if (parentProcessInstance.data[0]?.id) {
      const parentProcessVariable = yield getProcessInstance(
        parentProcessInstance.data[0].id
      );
      convertParentProcessVariable = yield processConvertKeyValuePair(
        parentProcessVariable
      );
    }

    const propertyCaseInstanceVariables = yield getPropertyCaseInstanceVariables(
      args.caseInstanceId
    );
    const convertPropertyCaseInstanceVariables = yield processConvertKeyValuePair(
      propertyCaseInstanceVariables
    );

    const customData = yield call(flowableTaskApi.customTaskOpenLogic, {
      ...args,
      formDefinition
    });

    const rawVariables = {
      ...convertTaskVariable,
      parent: convertParentProcessVariable,
      root: convertPropertyCaseInstanceVariables,
      task: formDefinition.metadata,
      flowablePayloadTime: getCurrentDate()
    };

    const hashData = md5(rawVariables);

    const variables = {
      ...convertTaskVariable,
      parent: convertParentProcessVariable,
      root: convertPropertyCaseInstanceVariables,
      task: formDefinition.metadata,
      flowablePayloadTime: rawVariables.flowablePayloadTime,
      flowablePayloadHash: hashData
    };

    yield put({
      type: Actions.FETCH_TASK_DETAIL_FORM_BY_TASKID,
      payload:
        args.taskStatus === 'open'
          ? formDefinition
          : FlowableHelper.disableForm(formDefinition),
      customData,
      variables,
      parentProcessInstance
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `Form fetch Failed!`,
      atAction: Actions.REQUEST_TASK_DETAIL_FORM_BY_TASKID
    });
  }
}

export function* taskFormWatcher() {
  yield takeLatest(Actions.REQUEST_TASK_DETAIL_FORM_BY_TASKID, fetchTaskForm);
}

function* getProcessInstance(processInstanceId) {
  try {
    const processVariable = yield call(
      flowableTaskApi.getProcessInstanceVariables,
      processInstanceId
    );
    return processVariable;
  } catch (e) {
    return e;
  }
}

function* getParentProcessInstance(processInstanceId) {
  try {
    const parentProcessInstance = yield call(
      flowableTaskApi.getProcessInstanceWithSubProcess,
      processInstanceId
    );
    return parentProcessInstance;
  } catch (e) {
    return e;
  }
}

function* getPropertyCaseInstanceVariables(caseInstanceId) {
  try {
    const propertyCaseInstanceVariables = yield call(
      flowableTaskApi.getPropertyCaseInstanceVariables,
      caseInstanceId
    );
    return propertyCaseInstanceVariables;
  } catch (e) {
    return e;
  }
}

function* openTask(args) {
  try {
    const process = yield call(
      flowableTaskApi.getProcessTaskDetails,
      args.taskId
    );

    const formDefinition = yield call(TaskApi.fetchForm, args.taskId);

    return { process, formDefinition };
  } catch (e) {
    return e;
  }
}

function* closeTask(args) {
  try {
    const process = yield call(
      flowableTaskApi.getProcessTaskHistoryDetails,
      args.taskId
    );
    const formDefinition = yield call(TaskApi.fetchClosedForm, args.taskId);
    return { process, formDefinition };
  } catch (e) {
    return e;
  }
}
