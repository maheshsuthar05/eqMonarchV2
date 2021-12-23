import { call, takeLatest, put, delay, all } from 'redux-saga/effects';
import { AdhocApi } from '../services/adhoc.service';
import * as Actions from '../store/actionTypes';
import { closeModal } from 'app/store/actions';
import { core } from 'app/config/flowable-core/services';
import { TaskApi } from '../services';

function* postAdhocProcess(args) {
  try {
    const adhocRes = yield call(AdhocApi.put, args.payload.payload);
    if (adhocRes.status === '200') {
      yield put({
        type: 'API_CALL_SUCCESS',
        message: `Ad-hoc of ${args.payload.payload.name} successfull`
      });
      yield all([
        yield call(core.putCoreUnClaimTask, adhocRes.data.referenceId),
        yield delay(1000),
        yield call(core.putCoreUnClaimTask, adhocRes.data.referenceId),
        yield call(
          TaskApi.reAssignTask,
          adhocRes.data.referenceId,
          args.payload.assignTo
        ),
        yield put({
          type: 'API_CALL_SUCCESS',
          message: `Assigned successfully`
        }),
        yield put({
          type: Actions.OPEN_TASK_REFRESH,
          refresh: true
        })
      ]);
    }
    yield put(closeModal());
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `${args.payload.payload.name} ad-hoc Failed!`,
      showError: true
    });
    yield put(closeModal());
    yield put({
      type: Actions.OPEN_TASK_REFRESH,
      refresh: true
    });
  }
}

export function* AdhocUpdateWatcher() {
  yield takeLatest(Actions.POST_ADHOC_PROCESS, postAdhocProcess);
}
