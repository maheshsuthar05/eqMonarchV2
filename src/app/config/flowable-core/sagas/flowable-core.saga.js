import { put, takeLatest, call, all } from 'redux-saga/effects';
import { core } from '../services';
import * as Actions from '../store/actionTypes';
import { closeBackdrop, closeModal, _cookies } from 'app/store/actions';
import { flowableFormRefresh } from 'app/store/actions';
import _ from 'lodash';
import { forgerock } from 'app/config/api';
import { OPEN_TASK_REFRESH } from 'app/main/task-management/store/actionTypes';
import { reAssignTask } from 'app/main/task-management/sagas/claimTask.saga';

function* getProcessDefinition(args) {
  try {
    const processDefinition = yield call(core.getProcessDefinition, args);
    const processInstance = yield call(
      core.getProcessInstance,
      processDefinition,
      args.data,
      args?.businessKey
    );
    yield getProcessQueryTask(processInstance);
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FLOWABLE_PROCESS_DEFINITION
    });
  }
}

function* getProcessQueryTask(args) {
  const task = yield call(core.getProcessTaskQuery, args);
  const formDefinition = yield call(core.getProcessFormDefinition, task);
  yield put({
    type: Actions.FLOWABLE_GET_DEFINITION,
    payload: formDefinition,
    taskId: task.data[0].id,
    processInstanceId: args.hasOwnProperty('processInstance')
      ? args.processInstance.id
      : args.id,
    formFinalAction:
      task.data[0].taskDefinitionKey.split('_')[1] === undefined ? false : true
  });
}

function* postProcessQueryTaskComplete(args) {
  try {
    yield call(core.postProcessTaskComplete, args.payload, args.task);
    if (!args.formFinalAction) {
      yield getProcessQueryTask(args.processInstance);
      yield put({
        type: Actions.FLOWABLE_FINISHED_ALL_TASKS,
        post: false,
        formFinalPayload: args.formPayload
      });
    } else {
      yield put({
        type: Actions.FLOWABLE_FINISHED_ALL_TASKS,
        post: true,
        formFinalPayload: args.formPayload
      });
    }
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FLOWABLE_COMPLETE_TASK
    });
  }
}

function* taskSaveAndCompleteLater(args) {
  try {
    const reAssignTaskPayload = {
      payload: {
        assignee: _cookies.getCookies(forgerock.cookie.displayName),
        taskList: { id: args.taskId }
      }
    };

    yield reAssignTask(reAssignTaskPayload);

    yield call(core.postTaskSaveCompleteLater, args.payload, args.taskId);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Saved succesfully`
    });
    yield all([
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeBackdrop())
    ]);
  } catch (error) {
    yield all([
      put({
        type: 'API_CALL_ERROR',
        error: 'Save and Complete Later Failed',
        atAction: Actions.FLOWABLE_CORE_SAVE_AND_COMPLETE_LATER
      }),
      put(closeBackdrop()),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      })
    ]);
  }
}

function* coreTaskComplete(args) {
  try {
    const reAssignTaskPayload = {
      payload: {
        assignee: _cookies.getCookies(forgerock.cookie.displayName),
        taskList: { id: args.taskId }
      }
    };

    yield reAssignTask(reAssignTaskPayload);

    yield call(core.postCoreTaskComplete, args.payload, args.taskId);
    yield all([
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `Completed succesfully`
      }),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeBackdrop())
    ]);
  } catch (e) {
    yield all([
      put({
        type: 'API_CALL_ERROR',
        error: 'Task Complete Failed',
        atAction: Actions.FLOWABLE_CORE_API_COMPLETE_TASK,
        showError: true
      }),
      put(closeBackdrop()),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      })
    ]);
  }
}

function* coreTaskSkip(args) {
  try {
    yield call(core.putCoreSkipTask, args.taskId);
    yield call(core.postCoreTaskComplete, args.payload, args.taskId);
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Skipped succesfully`
    });
    put({
      type: OPEN_TASK_REFRESH,
      refresh: true
    });
    yield put({
      type: Actions.FLOWABLE_CORE_API_SKIP_TASK_SUCCESS
    });
    yield put(flowableFormRefresh());
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Skip Task Failed',
      atAction: Actions.FLOWABLE_CORE_API_SKIP_TASK,
      showError: true
    });
    put({
      type: OPEN_TASK_REFRESH,
      refresh: true
    });
  }
}

function* coreTaskUnClaim(args) {
  try {
    yield call(core.putCoreUnClaimTask, args.taskId);

    if (args.showMessage) {
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `UnClaimed succesfully`
      });
    }
    yield put(flowableFormRefresh());
    yield put({
      type: Actions.FLOWABLE_CORE_API_UNCLAIM_TASK_SUCCESS
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unclaimed Task Failed',
      atAction: Actions.FLOWABLE_CORE_API_UNCLAIM_TASK
    });
  }
}

export function* processDefinitionWatcher() {
  yield takeLatest(Actions.FLOWABLE_PROCESS_DEFINITION, getProcessDefinition);
}

export function* processQueryTaskWatcher() {
  yield takeLatest(Actions.FLOWABLE_QUERY_TASK, getProcessQueryTask);
}

export function* processQueryTaskComplete() {
  yield takeLatest(
    Actions.FLOWABLE_COMPLETE_TASK,
    postProcessQueryTaskComplete
  );
}

export function* taskSaveAndCompleteLaterWatcher() {
  yield takeLatest(
    Actions.FLOWABLE_CORE_SAVE_AND_COMPLETE_LATER,
    taskSaveAndCompleteLater
  );
}

export function* taskCompleteWatcher() {
  yield takeLatest(Actions.FLOWABLE_CORE_API_COMPLETE_TASK, coreTaskComplete);
}

export function* taskSkipWatcher() {
  yield takeLatest(Actions.FLOWABLE_CORE_API_SKIP_TASK, coreTaskSkip);
}

export function* taskUnClaimWatcher() {
  yield takeLatest(Actions.FLOWABLE_CORE_API_UNCLAIM_TASK, coreTaskUnClaim);
}

function* flowableProcessResetState(args) {
  try {
    yield put({
      type: Actions.RESET_FLOWABLE_PROCESS_STATE_SUCCESS
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Error in reset state failed',
      atAction: Actions.RESET_FLOWABLE_PROCESS_STATE_SUCCESS
    });
  }
}

export function* flowableProcessResetStateWatcher(args) {
  yield takeLatest(
    Actions.RESET_FLOWABLE_PROCESS_STATE_START,
    flowableProcessResetState
  );
}

function* executionsByBusinessKey(args) {
  try {
    const executions = yield call(core.getExecutionsByBusinessKey, args.data);
    yield put({
      type: Actions.FLOWABLE_PROCESS_GET_EXECUTIONS_SUCCESS
    });
    return executions;
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Get Executions failed',
      atAction: Actions.FLOWABLE_PROCESS_GET_EXECUTIONS_SUCCESS
    });
  }
}

export function* executionsByBusinessKeyWatcher(args) {
  yield takeLatest(
    Actions.FLOWABLE_PROCESS_GET_EXECUTIONS_START,
    executionsByBusinessKey
  );
}

function* executionsByProcessInstanceId(args) {
  try {
    const executionsByProcess = yield call(
      core.getExecutionsByProcessInstanceId,
      args.data
    );
    yield put({
      type: Actions.FLOWABLE_PROCESS_GET_EXECUTION_BY_ID_SUCCESS
    });
    return executionsByProcess;
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Get Executions by Process Id failed',
      atAction: Actions.FLOWABLE_PROCESS_GET_EXECUTION_BY_ID_SUCCESS,
      showError: true
    });
  }
}

export function* executionsByProcessInstanceIdWatcher(args) {
  yield takeLatest(
    Actions.FLOWABLE_PROCESS_GET_EXECUTION_BY_ID_START,
    executionsByProcessInstanceId
  );
}

function* triggerEventByExecutionId(args) {
  try {
    const executions = yield call(executionsByBusinessKey, args);
    const executionsIndex = executions.data.length;
    let data = {
      ...args,
      data: {
        ...args.data,
        processInstanceId:
          executions.data[executionsIndex - 1]?.processInstanceId
      }
    };
    const executionsByProcess = yield call(executionsByProcessInstanceId, data);
    const executionsByProcessIndex = executionsByProcess.data.length;
    data = {
      ...args,
      data: {
        ...args.data,
        executionId:
          executionsByProcess.data[executionsByProcessIndex - 1]?.executionId
      }
    };
    yield call(core.triggerEventByExecutionId, data.data);
    yield put({
      type: Actions.FLOWABLE_TRIGGER_EVENT_BY_EXECUTION_ID_SUCCESS
    });
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `Offer updated succesfully`
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Trigger event by ExecutionId Id failed',
      atAction: Actions.FLOWABLE_TRIGGER_EVENT_BY_EXECUTION_ID_SUCCESS,
      showError: true
    });
  }
}

export function* triggerEventByExecutionIdWatcher(args) {
  yield takeLatest(
    Actions.FLOWABLE_TRIGGER_EVENT_BY_EXECUTION_ID_START,
    triggerEventByExecutionId
  );
}

function* updateTaskVariable(args) {
  if (!_.isEmpty(args.payload)) {
    for (let item of args.payload) {
      yield call(core.updateTaskVariable, args.taskId, item, item.name);
    }
  }
}

function* taskPauseUnpauseInitial(args) {
  try {
    yield call(core.saveTaskVariables, args.taskId, args.payload);
  } catch (error) {}
}

export function* taskPauseUnpauseInitialWatcher(args) {
  yield takeLatest(
    Actions.FLOWABLE_TASK_PAUSE_UNPAUSE_INITIAL_CALL,
    taskPauseUnpauseInitial
  );
}

function* taskPause(args) {
  try {
    yield updateTaskVariable(args);
    yield call(core.pauseUnpause, args.taskId, args.pausePayload);
    yield call(core.putCoreCommentsByActions, args.taskId, args.comments);
    yield all([
      put({
        type: Actions.FLOWABLE_CORE_API_PAUSE_TASK_SUCCESS
      }),
      put({
        type: 'API_CALL_SUCCESS',
        message: `${args.taskDetails?.name} Task Paused succesfully`
      }),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeModal())
    ]);
  } catch (error) {
    yield all([
      put({
        type: 'API_CALL_ERROR',
        error: 'Task Pause failed',
        atAction: Actions.FLOWABLE_CORE_API_PAUSE_TASK_SUCCESS,
        showError: true
      }),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeModal())
    ]);
  }
}

export function* taskPauseWatcher(args) {
  yield takeLatest(Actions.FLOWABLE_CORE_API_PAUSE_TASK, taskPause);
}

function* taskUnPause(args) {
  try {
    yield updateTaskVariable(args);
    yield call(core.pauseUnpause, args.taskId, args.unPausePayload);
    yield call(core.putCoreCommentsByActions, args.taskId, args.comments);
    yield all([
      put({
        type: Actions.FLOWABLE_CORE_API_UNPAUSE_TASK_SUCCESS
      }),
      put({
        type: 'API_CALL_SUCCESS',
        message: `${args.taskDetails?.name} Task Un-Paused succesfully`
      }),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeModal())
    ]);
  } catch (error) {
    yield all([
      put({
        type: 'API_CALL_ERROR',
        error: 'Task Un-Paused failed',
        atAction: Actions.FLOWABLE_CORE_API_UNPAUSE_TASK_SUCCESS,
        showError: true
      }),
      put({
        type: OPEN_TASK_REFRESH,
        refresh: true
      }),
      put(closeModal())
    ]);
  }
}

export function* taskUnPauseWatcher(args) {
  yield takeLatest(Actions.FLOWABLE_CORE_API_UNPAUSE_TASK, taskUnPause);
}
