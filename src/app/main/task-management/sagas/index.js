import { all, call } from 'redux-saga/effects';
import {
  openClaimTaskPayload,
  closeClaimTaskPayload,
  claimWatcher,
  reAssignTaskwatcher
} from './claimTask.saga';

import {
  openAssignTaskPayload,
  closeAssignTaskPayload
} from './assignTask.saga';

import { taskFormWatcher } from './task.saga';
import { AdhocUpdateWatcher } from './adhoc.saga';

export default function* taskManagementAppSaga() {
  yield all([
    call(openClaimTaskPayload),
    call(claimWatcher),
    call(closeClaimTaskPayload),
    call(openAssignTaskPayload),
    call(closeAssignTaskPayload),
    call(taskFormWatcher),
    call(AdhocUpdateWatcher),
    call(reAssignTaskwatcher)
  ]);
}
