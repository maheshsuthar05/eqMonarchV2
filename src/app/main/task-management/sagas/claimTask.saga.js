import * as User from 'app/store/actions';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { TaskApi } from '../services';
import * as Actions from '../store/actionTypes';
import { flowableFormRefresh, closeModal } from 'app/store/actions';
import { core } from 'app/config/flowable-core/services';

function* fetchUserGroupAndTenantCode() {
  try {
    const party = yield call(TaskApi.getPartyIdByUserId);
    const groups = yield call(TaskApi.getUserGroup, party.partyId);
    const userTenantCode = yield select(User.getUserTenentCode);
    const user = yield select(({ auth }) => auth.user);
    console.log(user);
    return { groups, userTenantCode };
  } catch (e) {
    return e;
  }
}

function* fetchOpenClaimTaskPayload(arg) {
  try {
    const { groups, userTenantCode } = yield call(fetchUserGroupAndTenantCode);
    yield put({
      type: Actions.FETCH_OPEN_CLAIM_TASK_PAYLOAD,
      groups,
      caseInstanceId: arg.caseInstanceId,
      tenantId: userTenantCode
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'User group fetch failed',
      atAction: Actions.REQUEST_OPEN_CLAIM_TASK_PAYLOAD
    });
  }
}

function* fetchCloseTeamTaskPayload(arg) {
  try {
    const party = yield call(TaskApi.getPartyIdByUserId);
    const groups = yield call(TaskApi.getUserGroup, party.partyId);

    const userTenantCode = yield select(User.getUserTenentCode);
    yield put({
      type: Actions.FETCH_CLOSE_TEAM_TASK_PAYLOAD,
      groups,
      caseInstanceId: arg.caseInstanceId,
      tenantId: userTenantCode
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'User group fetch failed',
      atAction: Actions.REQUEST_CLOSE_CLAIM_TASK_PAYLOAD
    });
  }
}

function* processClaim(args) {
  try {
    const cliamTask = yield call(
      TaskApi.postAClaim,
      args.taskList.id,
      args.taskList.key
    );
    if (cliamTask === 500) {
      yield call(TaskApi.postAClaim, args.taskList.id, args.taskList.key);
    }
    yield put({
      type: 'API_CALL_SUCCESS',
      message: `${args.taskList.name} Claimed Successfull`
    });
    yield put({
      type: Actions.PROCESS_TASK_CLAIM_SUCCESS
    });
    yield put(flowableFormRefresh());
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: `${args.taskList.name} Claim Failed!`,
      showError: true
    });
  }
}

export function* reAssignTask(args) {
  try {
    const unClaimTask = yield call(
      core.putCoreUnClaimTask,
      args.payload.taskList.id
    );
    if (unClaimTask === 500) {
      yield call(core.putCoreUnClaimTask, args.payload.taskList.id);
    }
    yield call(
      TaskApi.reAssignTask,
      args.payload.taskList.id,
      args.payload.assignee
    );
    yield put({
      type: Actions.PROCESS_TASK_CLAIM_SUCCESS
    });
  } catch (error) {
    yield put(closeModal());
    yield put({
      type: 'API_CALL_ERROR',
      error: `${args.payload.taskList.name} Re-Assigned failed`,
      showError: true
    });
  }
}

export function* openClaimTaskPayload() {
  yield takeLatest(
    Actions.REQUEST_OPEN_CLAIM_TASK_PAYLOAD,
    fetchOpenClaimTaskPayload
  );
}

export function* claimWatcher() {
  yield takeLatest(Actions.PROCESS_TASK_CLAIM, processClaim);
}

export function* closeClaimTaskPayload() {
  yield takeLatest(
    Actions.REQUEST_CLOSE_CLAIM_TASK_PAYLOAD,
    fetchCloseTeamTaskPayload
  );
}

export function* reAssignTaskwatcher() {
  yield takeLatest(Actions.CLAIMS_TASK_REASSIGN_START, reAssignTask);
}
