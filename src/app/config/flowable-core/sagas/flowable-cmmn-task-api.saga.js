import { put, takeLatest, call } from 'redux-saga/effects';
import { core } from '../services';
import * as Actions from '../store/actionTypes';

function* getCmmnApiTask(args) {
  try {
    const taskList = yield call(core.getAllCmmnQueryTask, args.payload);
    yield put({
      type: Actions.FLOWABLE_FINISHED_ALL_TASKS,
      post: true,
      formFinalPayload: taskList
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to Fetch Data',
      atAction: Actions.FLOWABLE_GET_CMMN_API_TASK
    });
  }
}
export function* getCmmnApiTaskWatcher() {
  yield takeLatest(Actions.FLOWABLE_GET_CMMN_API_TASK, getCmmnApiTask);
}
