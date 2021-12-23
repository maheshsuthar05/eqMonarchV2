import FlowableHelper from 'app/common/helpers/flowable-helper';
import * as commonActions from 'app/common/store/actions';
import { taskApi } from 'app/main/property/services/task.api';
import { flowableTaskApi } from 'app/config/flowable-core/services';
import {
  PROPERTY_NAVIGATION_START,
  PROPERTY_TASK_CLOSE_FORM_FETCH_START,
  PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_START,
  PROPERTY_TASK_DETAILS_FETCH_START,
  PROPERTY_TASK_FORM_VALUE_FETCH_START,
  PROPERTY_INSTANCE_DETAILS_FETCH_START,
  PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_START,
  PROPERTY_TASK_OPEN_FORM_FETCH_START,
  PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_START,
  PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_START,
  PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
  PROPERTY_TASK_UPDATE_START,
  PROPERTY_INSTANCE_DIAGRAM_FETCH_START,
  PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
  PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_START,
  PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_START,
  PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_SUCCESS
} from 'app/main/property/store/actionTypes';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as propertyActions from '../store/actions';
import { getCurrentDate } from 'app/common/helpers/common-helper';
import md5 from 'md5';

function* GoToProperty(state) {
  try {
    if (state.to && state.to === 'TASK_DETAILS') {
      const status = yield call(getPropertyTaskDetails, state);
      yield put(propertyActions.fetchPropertyNavigationSuccess(status));
      state.history.push(state.url, {
        taskId: state.taskInstanceId,
        taskType: state.taskType
      });
    } else {
      state.history.push(state.url);
    }
  } catch (error) {
    yield put(propertyActions.fetchPropertyNavigationFailure(error.message));
  }
}

export function* watchGoToProperty() {
  yield takeLatest(PROPERTY_NAVIGATION_START, GoToProperty);
}

function* getPropertyTaskDetails(state) {
  try {
    let response;
    if (state.taskType === 'open') {
      response = yield call(getPropertyTaskOpenInstanceDiagram, state);
      yield call(getPropertyTaskOpenForm, state, response);
    } else {
      yield call(getPropertyTaskCloseForm, state);
      yield call(getPropertyTaskFormValue, state);
      response = yield call(getPropertyTaskCloseInstanceDiagram, state);
    }

    const { processInstanceId } = response;

    if (processInstanceId) {
      response = yield call(getPropertyTaskInstanceDiagramUrl, {
        tenantCode: state.tenantCode,
        processInstanceId,
        ...state
      });
      response = yield call(getPropertyTaskParentInstanceDiagram, {
        tenantCode: state.tenantCode,
        processInstanceId,
        ...state
      });
      if (response && response.data && response.data.length) {
        const parentProcessInstanceId = response.data[0].id;
        yield call(getPropertyTaskParentInstanceDiagramUrl, {
          tenantCode: state.tenantCode,
          parentProcessInstanceId,
          ...state
        });
      }
    }

    const status = 'success';
    yield put(propertyActions.fetchPropertyTaskDetailsSuccess(status));
    return status;
  } catch (error) {
    yield put(propertyActions.fetchPropertyTaskDetailsFailure(error.message));
  }
}

export function* watchGetPropertyTaskDetails() {
  yield takeLatest(PROPERTY_TASK_DETAILS_FETCH_START, getPropertyTaskDetails);
}

function* getPropertyInstanceDetails(state) {
  try {
    const response = yield call(getPropertyInstanceDiagram, state);
    let processInstanceId = null;

    if (response && response.data && response.data.length) {
      processInstanceId = response.data[0].id;
    }

    if (processInstanceId) {
      yield call(getPropertyInstanceDiagramUrl, { processInstanceId });
    }

    yield call(getPropertyParentInstanceDiagramUrl, {
      instanceId: state.taskInstanceId
    });

    const status = 'success';
    yield put(propertyActions.fetchPropertyInstanceDetailsSuccess(status));
    return status;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyInstanceDetailsFailure(error.message)
    );
  }
}

export function* watchGetPropertyInstanceDetails() {
  yield takeLatest(
    PROPERTY_INSTANCE_DETAILS_FETCH_START,
    getPropertyInstanceDetails
  );
}

function* getPropertyInstanceDiagram(state) {
  const { tenantCode, taskInstanceId } = state;

  try {
    const instanceDiagram = yield call(
      taskApi.getPropertyInstanceDiagram,
      tenantCode,
      taskInstanceId
    );
    yield put(
      propertyActions.fetchPropertyInstanceDiagramSuccess(instanceDiagram)
    );
    return instanceDiagram;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyInstanceDiagramFailure(error.message)
    );
  }
}

export function* watchGetPropertyInstanceDiagram() {
  yield takeLatest(
    PROPERTY_INSTANCE_DIAGRAM_FETCH_START,
    getPropertyInstanceDiagram
  );
}

function* getPropertyInstanceDiagramUrl(state) {
  const { processInstanceId } = state;
  try {
    const instanceDiagramUrl = yield call(
      taskApi.getPropertyInstanceDiagramUrl,
      processInstanceId
    );
    yield put(
      propertyActions.fetchPropertyInstanceDiagramUrlSuccess(instanceDiagramUrl)
    );
    return instanceDiagramUrl;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyInstanceDiagramUrlFailure(error.message)
    );
  }
}

export function* watchGetPropertyInstanceDiagramUrl() {
  yield takeLatest(
    PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_START,
    getPropertyInstanceDiagramUrl
  );
}

function* getPropertyParentInstanceDiagramUrl(state) {
  const { instanceId } = state;
  try {
    const parentDiagramUrl = yield call(
      taskApi.getPropertyInstanceDiagramUrl,
      instanceId
    );
    yield put(
      propertyActions.fetchPropertyParentInstanceDiagramUrlSuccess(
        parentDiagramUrl
      )
    );
    return parentDiagramUrl;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyParentInstanceDiagramUrlFailure(
        error.message
      )
    );
  }
}

export function* watchGetPropertyParentInstanceDiagramUrl() {
  yield takeLatest(
    PROPERTY_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
    getPropertyParentInstanceDiagramUrl
  );
}

function* getPropertyTaskOpenForm(state, process) {
  const { tenantCode, taskInstanceId, caseInstanceId } = state;

  try {
    const taskOpenFormDefinition = yield call(
      taskApi.getPropertyTaskOpenFormDefinition,
      tenantCode,
      taskInstanceId
    );

    const processVariable = yield getProcessInstance(process.processInstanceId);

    const parentProcessInstance = yield getParentProcessInstance(
      process.processInstanceId
    );

    let convertParentProcessVariable = {};
    if (parentProcessInstance.data[0]?.id) {
      const parentProcessVariable = yield getProcessInstance(
        parentProcessInstance.data[0].id
      );
      convertParentProcessVariable = yield convertKeyValuePair(
        parentProcessVariable
      );
    }

    const propertyCaseInstanceVariables = yield getPropertyCaseInstanceVariables(
      caseInstanceId
    );

    const convertProcessVariable = yield convertKeyValuePair(processVariable);

    const convertPropertyCaseInstanceVariables = yield convertKeyValuePair(
      propertyCaseInstanceVariables
    );

    const customData = yield call(flowableTaskApi.customTaskOpenLogic, {
      ...state,
      formDefinition: taskOpenFormDefinition
    });

    const rawVariables = {
      ...convertProcessVariable,
      parent: convertParentProcessVariable,
      root: convertPropertyCaseInstanceVariables,
      task: taskOpenFormDefinition.metadata,
      flowablePayloadTime: getCurrentDate()
    };

    const hashData = md5(rawVariables);

    const variables = {
      ...convertProcessVariable,
      parent: convertParentProcessVariable,
      root: convertPropertyCaseInstanceVariables,
      task: taskOpenFormDefinition.metadata,
      flowablePayloadTime: rawVariables.flowablePayloadTime,
      flowablePayloadHash: hashData
    };

    yield put(
      propertyActions.fetchPropertyCustomTaskOpenLogicSuccess(
        customData,
        variables
      )
    );

    yield put(
      propertyActions.fetchPropertyTaskOpenFormSuccess(taskOpenFormDefinition)
    );
    return taskOpenFormDefinition;
  } catch (error) {
    yield put(propertyActions.fetchPropertyTaskOpenFormFailure(error.message));
  }
}

export function* watchGetPropertyTaskOpenForm() {
  yield takeLatest(
    PROPERTY_TASK_OPEN_FORM_FETCH_START,
    getPropertyTaskOpenForm
  );
}

function* getPropertyTaskCloseForm(state) {
  const { tenantCode, taskInstanceId } = state;

  try {
    const taskCloseFormDefinition = yield call(
      taskApi.getPropertyTaskCloseFormDefinition,
      tenantCode,
      taskInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskCloseFormSuccess(
        FlowableHelper.disableForm(taskCloseFormDefinition)
      )
    );
    return taskCloseFormDefinition;
  } catch (error) {
    yield put(propertyActions.fetchPropertyTaskCloseFormFailure(error.message));
  }
}

export function* watchGetPropertyTaskCloseForm() {
  yield takeLatest(
    PROPERTY_TASK_CLOSE_FORM_FETCH_START,
    getPropertyTaskCloseForm
  );
}

function* getPropertyTaskFormValue(state) {
  const { tenantCode, taskInstanceId } = state;

  try {
    const taskFormValue = yield call(
      taskApi.getPropertyTaskFormValue,
      tenantCode,
      taskInstanceId
    );
    yield put(propertyActions.fetchPropertyTaskFormValueSuccess(taskFormValue));
    return taskFormValue;
  } catch (error) {
    yield put(propertyActions.fetchPropertyTaskFormValueFailure(error.message));
  }
}

export function* watchGetPropertyTaskFormValue() {
  yield takeLatest(
    PROPERTY_TASK_FORM_VALUE_FETCH_START,
    getPropertyTaskFormValue
  );
}

function* propertyTaskUpdate(state) {
  const { tenantCode, taskInstanceId, payload, toaster, url, history } = state;

  try {
    const response = yield call(
      taskApi.taskUpdate,
      tenantCode,
      taskInstanceId,
      payload
    );
    yield put(propertyActions.propertyTaskUpdateSuccess(response));
    if (toaster && toaster.success) {
      yield put(commonActions.notifySuccess(toaster.success));
    }
    if (url && history) {
      history.push(url, {
        taskId: undefined,
        taskType: undefined
      });
    }
  } catch (error) {
    yield put(propertyActions.propertyTaskUpdateFailure(error.message));
    if (toaster && toaster.error) {
      yield put(commonActions.notifyError(toaster.error));
    }
  }
}

export function* watchPropertyTaskUpdate() {
  yield takeLatest(PROPERTY_TASK_UPDATE_START, propertyTaskUpdate);
}

function* getPropertyTaskOpenInstanceDiagram(state) {
  const { tenantCode, taskInstanceId } = state;

  try {
    const openInstanceDiagram = yield call(
      taskApi.getPropertyTaskOpenInstanceDiagram,
      tenantCode,
      taskInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskOpenInstanceDiagramSuccess(
        openInstanceDiagram
      )
    );
    return openInstanceDiagram;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskOpenInstanceDiagramFailure(error.message)
    );
  }
}

export function* watchGetPropertyTaskOpenInstanceDiagram() {
  yield takeLatest(
    PROPERTY_TASK_OPEN_INSTANCE_DIAGRAM_FETCH_START,
    getPropertyTaskOpenInstanceDiagram
  );
}

function* getPropertyTaskCloseInstanceDiagram(state) {
  const { tenantCode, taskInstanceId } = state;

  try {
    const closeInstanceDiagram = yield call(
      taskApi.getPropertyTaskCloseInstanceDiagram,
      tenantCode,
      taskInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskCloseInstanceDiagramSuccess(
        closeInstanceDiagram
      )
    );
    return closeInstanceDiagram;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskCloseInstanceDiagramFailure(
        error.message
      )
    );
  }
}

export function* watchGetPropertyTaskCloseInstanceDiagram() {
  yield takeLatest(
    PROPERTY_TASK_CLOSE_INSTANCE_DIAGRAM_FETCH_START,
    getPropertyTaskCloseInstanceDiagram
  );
}

function* getPropertyTaskInstanceDiagramUrl(state) {
  const { tenantCode, processInstanceId } = state;
  try {
    const instanceDiagramImageUrl = yield call(
      taskApi.getPropertyTaskInstanceDiagramUrl,
      tenantCode,
      processInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskInstanceDiagramUrlSuccess(
        instanceDiagramImageUrl
      )
    );
    return instanceDiagramImageUrl;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskInstanceDiagramUrlFailure(error.message)
    );
  }
}

export function* watchGetPropertyTaskInstanceDiagramUrl() {
  yield takeLatest(
    PROPERTY_TASK_INSTANCE_DIAGRAM_URL_FETCH_START,
    getPropertyTaskInstanceDiagramUrl
  );
}

function* getPropertyTaskParentInstanceDiagram(state) {
  const { tenantCode, processInstanceId } = state;

  try {
    const parentInstanceDiagram = yield call(
      taskApi.getPropertyTaskParentInstanceDiagram,
      tenantCode,
      processInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskParentInstanceDiagramSuccess(
        parentInstanceDiagram
      )
    );
    return parentInstanceDiagram;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskParentInstanceDiagramFailure(
        error.message
      )
    );
  }
}

export function* watchGetPropertyTaskParentInstanceDiagram() {
  yield takeLatest(
    PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_FETCH_START,
    getPropertyTaskParentInstanceDiagram
  );
}

function* getPropertyTaskParentInstanceDiagramUrl(state) {
  const { tenantCode, parentProcessInstanceId } = state;

  try {
    const parentInstanceDiagramImageUrl = yield call(
      taskApi.getPropertyTaskParentInstanceDiagramUrl,
      tenantCode,
      parentProcessInstanceId
    );
    yield put(
      propertyActions.fetchPropertyTaskParentInstanceDiagramUrlSuccess(
        parentInstanceDiagramImageUrl
      )
    );
    return parentInstanceDiagramImageUrl;
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskParentInstanceDiagramUrlFailure(
        error.message
      )
    );
  }
}

export function* watchGetPropertyTaskParentInstanceDiagramUrl() {
  yield takeLatest(
    PROPERTY_TASK_PARENT_INSTANCE_DIAGRAM_URL_FETCH_START,
    getPropertyTaskParentInstanceDiagramUrl
  );
}

function* getPropertyTaskRootParentInstance(state) {
  const { tenantCode, processInstanceId } = state;
  try {
    const parentRootInstance = yield call(
      taskApi.getPropertyTaskRootParentInstance,
      tenantCode,
      processInstanceId
    );
    yield call(watchGetCaseInstanceIdByPropertyId, {
      ...state,
      propertyId: parentRootInstance.businessKey
    });

    yield put(
      propertyActions.fetchPropertyTaskRootParentInstanceSuccess(
        parentRootInstance
      )
    );
  } catch (error) {
    yield put(
      propertyActions.fetchPropertyTaskRootParentInstanceFailure(error.message)
    );
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

function* getPropertyCaseInstanceVariables(caseInstanceId) {
  try {
    const propertyCaseInstanceVariables = yield call(
      flowableTaskApi.getPropertyCaseInstanceVariables,
      caseInstanceId
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

export function* watchGetPropertyTaskRootParentInstance() {
  yield takeLatest(
    PROPERTY_TASK_ROOT_PARENT_INSTANCE_FETCH_START,
    getPropertyTaskRootParentInstance
  );
}

function* watchGetCaseInstanceIdByPropertyId(action) {
  try {
    const propertyXrefDetails = yield call(
      taskApi.getCaseInstaceIdByPropertyId,
      action.propertyId
    );

    yield put({
      type: PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_SUCCESS,
      propertyXrefDetails: propertyXrefDetails
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: error.message,
      atAction: PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_SUCCESS
    });
  }
}

export function* watchGetCaseInstanceIdByPropertyIdWatcher() {
  yield takeLatest(
    PROPERTY_CASEINSTANCE_BY_PROPERTY_ID_START,
    watchGetCaseInstanceIdByPropertyId
  );
}
