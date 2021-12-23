import { all } from 'redux-saga/effects';
import {
  processDefinitionWatcher,
  processQueryTaskWatcher,
  processQueryTaskComplete,
  taskSaveAndCompleteLaterWatcher,
  taskCompleteWatcher,
  taskSkipWatcher,
  taskUnClaimWatcher,
  flowableProcessResetStateWatcher,
  executionsByBusinessKeyWatcher,
  executionsByProcessInstanceIdWatcher,
  triggerEventByExecutionIdWatcher,
  taskPauseWatcher,
  taskUnPauseWatcher,
  taskPauseUnpauseInitialWatcher
} from './flowable-core.saga';

import {
  getFormByProcessDefinitionWatcher,
  getFormByProcessDefinitionFromLocalByFileNameWatcher
} from './form-by-process-definition.saga';
import { getCmmnApiTaskWatcher } from './flowable-cmmn-task-api.saga';
import { jsonFormDefinitionWatcher } from './jsonFormDefinition.saga';
import {
  flowableTaskWatcher,
  flowableTaskPayloadWatcher
} from './flowable-task.saga';
import {
  getFormByIdWatcher
} from './form-by-case.saga';

export default function* flowableCoreSaga() {
  yield all([
    processDefinitionWatcher(),
    processQueryTaskWatcher(),
    processQueryTaskComplete(),
    getFormByProcessDefinitionWatcher(),
    getCmmnApiTaskWatcher(),
    taskSaveAndCompleteLaterWatcher(),
    taskCompleteWatcher(),
    taskSkipWatcher(),
    getFormByProcessDefinitionFromLocalByFileNameWatcher(),
    taskUnClaimWatcher(),
    flowableProcessResetStateWatcher(),
    executionsByBusinessKeyWatcher(),
    executionsByProcessInstanceIdWatcher(),
    triggerEventByExecutionIdWatcher(),
    jsonFormDefinitionWatcher(),
    flowableTaskWatcher(),
    flowableTaskPayloadWatcher(),
    getFormByIdWatcher(),
    taskPauseWatcher(),
    taskUnPauseWatcher(),
    taskPauseUnpauseInitialWatcher()
  ]);
}
