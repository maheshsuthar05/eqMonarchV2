import { call, put, takeLatest } from 'redux-saga/effects';
import { decisionRuleService } from '../../service/decision-rule.service';
import * as Actions from '../../store/actionTypes';

function* fetchDecisionTable(req) {
  try {
    const response = yield call(
      decisionRuleService.getDecisionTable,
      req.tenantCode,
      req.key
    );

    if (
      response &&
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      // for (let item of response.data) {
      //   item.isLoaded = false;
      //   item.details = [];
      // }
      yield put({
        type: Actions.FETCH_DECISION_TABLE_ADMIN_SUCCESS,
        adminDecisionTable: response.data
      });
    } else {
      yield put({
        type: Actions.FETCH_DECISION_TABLE_ADMIN_SUCCESS,
        adminDecisionTable: []
      });
    }
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Decision table'
    });
  }
}

function* fetchRuleGroups(req) {
  try {
    const response = yield call(decisionRuleService.getRuleGroup, req.id);
    yield put({
      type: Actions.FETCH_RULES_ADMIN_SUCCESS,
      payload: response
      // parentId: req.id
    });
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Unable to fetch Rule Groups'
    });
  }
}

export function* fetchDecisionTableWatchers() {
  yield takeLatest(Actions.FETCH_DECISION_TABLE_ADMIN, fetchDecisionTable);
}

export function* fetchRuleAdminWatcher() {
  yield takeLatest(Actions.FETCH_RULES_ADMIN, fetchRuleGroups);
}
