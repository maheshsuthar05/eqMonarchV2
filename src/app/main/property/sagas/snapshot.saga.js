import * as Actions from './../store/actionTypes';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { snapshotApi } from './../services/snapshot.service';

function* fetchUserGroupAndTenantCode() {
  try {
    const user = yield select(({ auth }) => auth.user);
    return { groups: user.roles, userTenantCode: user.tenantCode };
  } catch (e) {
    return e;
  }
}

function* getOpenTaskCounts(args) {
  try {
    const response = yield call(
      snapshotApi.getOpenTaskCounts,
      args.caseInstanceId
    );
    yield put({ type: Actions.GET_OPEN_TASK_COUNT, total: response.total });
  } catch (error) {}
}

function* getCompletedTaskCounts(args) {
  try {
    const response = yield call(
      snapshotApi.getCompletedTaskCounts,
      args.caseInstanceId
    );
    yield put({
      type: Actions.GET_COMPLETED_TASK_COUNT,
      total: response.total
    });
  } catch (error) {}
}

function* getCliamsOpenTaskCounts(args) {
  try {
    const { groups, userTenantCode } = yield call(fetchUserGroupAndTenantCode);
    const response = yield call(
      snapshotApi.getClaimsTaskCounts,
      args.caseInstanceId,
      groups,
      userTenantCode
    );
    yield put({
      type: Actions.GET_TEAM_OPEN_TASK_COUNT,
      total: response.total
    });
  } catch (error) {}
}

function* getClaimsCompletedTaskCounts(args) {
  try {
    const { groups, userTenantCode } = yield call(fetchUserGroupAndTenantCode);
    const response = yield call(
      snapshotApi.getClaimsCompletedTaskCounts,
      args.caseInstanceId,
      groups,
      userTenantCode
    );
    yield put({
      type: Actions.GET_TEAM_COMPLETED_TASK_COUNT,
      total: response.total
    });
  } catch (error) {}
}

function* getOfferCounts(args) {
  try {
    const response = yield call(snapshotApi.getOfferCounts, args.propertyId);
    yield put({
      type: Actions.GET_OFFER_COUNT,
      total: response.totalHits
    });
  } catch (error) {}
}

export function* watchOpenTaskCount() {
  yield takeLatest(Actions.INITIATE_OPEN_TASK_COUNT, getOpenTaskCounts);
}

export function* watchCompletedTaskCount() {
  yield takeLatest(
    Actions.INITIATE_COMPLETED_TASK_COUNT,
    getCompletedTaskCounts
  );
}

export function* watchOpenTeamTaskCount() {
  yield takeLatest(
    Actions.INITIATE_TEAM_OPEN_TASK_COUNT,
    getCliamsOpenTaskCounts
  );
}

export function* watchCompletedTeamTaskCount() {
  yield takeLatest(
    Actions.INITIATE_TEAM_COMPLETED_TASK_COUNT,
    getClaimsCompletedTaskCounts
  );
}

export function* watchOfferCount() {
  yield takeLatest(Actions.INITIATE_OFFER_COUNT, getOfferCounts);
}
