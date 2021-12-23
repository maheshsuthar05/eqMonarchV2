import { call, put, takeLatest, all } from 'redux-saga/effects';
import { decisionRuleService } from '../service/decision-rule.service';
import * as Actions from '../store/actionTypes';
import * as CommonActions from 'app/store/actions/actionTypes';
import * as decisionRuleUtil from '../tenant/business-rule/util/decision-rule.util';

function* fetchRuleGroups(req) {
  try {
    const response = yield call(decisionRuleService.getDecisionTableInXml, req.taskGroupId);
    yield put({
      type: Actions.FETCH_RULE_GROUP_SUCCESS,
      playload: response,
      parentId: req.taskGroupId
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch Rule Groups',
      atAction: Actions.FETCH_RULE_GROUP_FAILURE
    });
  }
}

function* fetchDecisionTable(req) {
  try {
    
    let key = req.investorGroup;
    if (req.taskGroup) {
      if (key)
        key = key.concat(".").concat(req.taskGroup);
    }
    
    if (key) {
      key = key.concat(encodeURIComponent('.%'));
    }

    const response = yield call(decisionRuleService.getDecisionTable, req.tenantId, key);

    if (response && response.data && Array.isArray(response.data) &&  response.data.length > 0) {
      for (let item of response.data) {
        item.isLoaded = false;
        item.details = [];
      }
      yield put({
        type: Actions.FETCH_DECISION_TABLE_SUCCESS,
        decisionTables: response.data
      });
    } else {
      yield put({
        type: Actions.FETCH_DECISION_TABLE_SUCCESS,
        decisionTables: []
      });
    }
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch Decision table',
      atAction: Actions.FETCH_DECISION_TABLE_FAILURE
    });
  }
}

function* updateDecisionTable(req) {
  try {
    yield call(decisionRuleService.updateDecisionTable, req.tenantId, req.data);

    const decisionTableResponse = yield call(decisionRuleService.getDecisionTable, req.tenantId, req.decisionId);

    if (decisionTableResponse && decisionTableResponse.data && Array.isArray(decisionTableResponse.data) &&  decisionTableResponse.data.length > 0) {
            
      let parsedDecisionTable = decisionTableResponse.data[0];

      parsedDecisionTable.isLoaded = true;
      const updatedDetail = yield call(decisionRuleService.getDecisionTableInXml, decisionTableResponse.data[0].id);
      let parsedDetail = decisionRuleUtil.parseDecisionTablePlayload(updatedDetail)
      parsedDecisionTable.details = parsedDetail[0].details;
      
      yield all([
        yield put({
          type: CommonActions.API_CALL_SUCCESS,
          message: `${parsedDecisionTable.name} is Updated`
        }),
        yield put({
          type: Actions.UPDATE_DECISION_TABLE_SUCCESS,
          lastestDecisionTable: parsedDecisionTable
        })
      ]);
    }else {
      yield all([
        yield put({
          type: CommonActions.API_CALL_ERROR,
          error: 'Fail to find decision table data'
        }),
        yield put({
          type: Actions.UPDATE_DECISION_TABLE_FAILURE
        })
      ]);
    }

   
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Fail to deploy the decision table'
      }),
      yield put({
        type: Actions.UPDATE_DECISION_TABLE_FAILURE
      })
    ]);  
  }
}

function* fetchInvestorGroup(req) {
  try {
    const response = yield call(decisionRuleService.getInvestorGroup);

    if (response && response._embedded) {
      yield put({
        type: Actions.FETCH_INVESTOR_GROUP_SUCCESS,
        playload: response._embedded.investorGroups
      });
    } else {
      yield put({
        type: Actions.FETCH_INVESTOR_GROUP_SUCCESS,
        playload: []
      });
    }
    
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to load Investor Group',
      atAction: Actions.FETCH_INVESTOR_GROUP_FAILURE
    });
  }
}

export function* fetchDecisionTableWatcher() {
  yield takeLatest(Actions.FETCH_DECISION_TABLE, fetchDecisionTable);
}

export function* fetchRuleGroupsWatcher() {
  yield takeLatest(Actions.FETCH_RULE_GROUP, fetchRuleGroups);
}

export function* updateDecisionTableWatcher() {
  yield takeLatest(Actions.UPDATE_DECISION_TABLE, updateDecisionTable);
}

export function* fetchInvestorGroupWatcher() {
  yield takeLatest(Actions.FETCH_INVESTOR_GROUP, fetchInvestorGroup);
}