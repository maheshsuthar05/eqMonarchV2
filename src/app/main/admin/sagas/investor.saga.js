import { call, put, takeLatest, all } from 'redux-saga/effects';
import { investorservice } from '../service/investor.service';
import * as Actions from '../store/actionTypes';
import * as appActions from 'app/store/actions/actionTypes';

function* searchInvestorGroups(req) {
  try {
    const response = yield call(investorservice.searchInvestorGroup);
    yield put({
      type: Actions.SERACH_INVESTOR_GROUPS_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to fetch Investor Group',
      atAction: Actions.SERACH_INVESTOR_GROUPS_FAILURE
    });
  }
}

function* saveInvestorToGroup(req) {
  try {
    yield call(investorservice.saveInvestorToGroup, req.investor);
    yield put({
      type: appActions.API_CALL_SUCCESS,
      message: 'Successfully Investor Added'
    });
    yield put({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Investor'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    yield put({
      type: req.refresh,
      payload: true
    });
  } catch (e) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to Save Investor',
      atAction: Actions.SAVE_INVESTOR_TO_GROUP,
      showError: true
    });
    yield put({
      type: Actions.SAVE_INVESTOR_TO_GROUP_FAILURE
    });
    yield put({
      type: req.refresh,
      payload: true
    });
  }
}

function* createInvestorGroup(req) {
  try {
    const existingRecord = yield call(
      investorservice.findInvestorGroupByCode,
      req.investorGroup.investorGroup
    );

    if (
      existingRecord &&
      existingRecord._embedded &&
      existingRecord._embedded.investorGroups &&
      existingRecord._embedded.investorGroups.length > 0
    ) {
      yield all([
        yield put({
          type: appActions.API_CALL_ERROR,
          error: `Duplicate Entry: ${req.investorGroup.investorGroup}`,
          atAction: Actions.CREATE_INVESTOR_GROUP_FAILURE
        }),
        yield put({
          type: Actions.CREATE_INVESTOR_GROUP_FAILURE
        })
      ]);
    } else {
      yield call(investorservice.createInvestorGroup, req.investorGroup);
      yield put({
        type: appActions.API_CALL_SUCCESS,
        message: 'Successfully Investor Group Created'
      });
      yield put({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'tenant-admin',
        fileNames: ['Manage_Investor_Group_List', 'Investor_Group_Creation'],
        formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
      });
    }

    yield put({
      type: req.refresh,
      payload: true
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to Create Investor Group',
      atAction: Actions.CREATE_INVESTOR_GROUP_FAILURE,
      showError: true
    });
    yield put({
      type: Actions.CREATE_INVESTOR_GROUP_FAILURE
    });
    yield put({
      type: req.refresh,
      payload: true
    });
  }
}

function* deleteInvestorGroupById(req) {
  try {
    yield call(investorservice.deleteInvestorGroupById, req.id);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_GROUP_LIST
    });
  } catch (error) {
    const msg =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
        ? error.response.data.message
        : 'UNKNOWN';
    yield all([
      yield put({
        type: appActions.API_CALL_ERROR,
        error: 'Unable to Delete Investor Group: ' + msg,
        atAction: Actions.DELETE_INVESTOR_GROUP_BY_ID_FAILURE,
        showError: true
      }),
      yield put({
        type: Actions.DELETE_INVESTOR_GROUP_BY_ID_FAILURE
      })
    ]);
  }
}

function* getUnassignedInvestor(req) {
  try {
    const response = yield call(investorservice.getUnassignedInvestor);
    yield put({
      type: Actions.FETCH_UNASSIGNED_INVESTOR_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to Get Unassigned Investor',
      atAction: Actions.DELETE_INVESTOR_GROUP_BY_ID_FAILURE
    });
  }
}

function* getFormForInvstorToGroup() {
  try {
    const response = yield call(investorservice.getFormForInvstorToGroup);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_TO_GROUP_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FETCH_FORM_INVESTOR_TO_GROUP_FAILURE
    });
  }
}

function* getFormForInvestorGroupCreation() {
  try {
    const response = yield call(
      investorservice.getFormForInvestorGroupCreation
    );
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_GROUP_CREATION_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FETCH_FORM_INVESTOR_GROUP_CREATION_FAILURE
    });
  }
}

function* getFormForInvestorGroupList() {
  try {
    const response = yield call(investorservice.getFormForInvestorGroupList);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_GROUP_LIST_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FETCH_FORM_INVESTOR_GROUP_LIST
    });
  }
}

function* getFormForInvestorList() {
  try {
    const response = yield call(investorservice.getFormForInvestorList);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_LIST_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Registration Form Fetch Failed',
      atAction: Actions.FETCH_FORM_INVESTOR_LIST
    });
  }
}

function* findInvestorByInvestorGroup(req) {
  try {
    const response = yield call(
      investorservice.findInvestorByInvestorGroup,
      req.investorGroup
    );
    yield put({
      type: Actions.FIND_INVESTOR_BY_INVESTOR_GROUP_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Failed To Get Investors For Investor Group',
      atAction: Actions.FIND_INVESTOR_BY_INVESTOR_GROUP_FAILURE
    });
  }
}

function* bulkUpdateForInvestor(req) {
  try {
    yield call(investorservice.bulkUpdateForInvestor, req.payload);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_GROUP_LIST
    });
    yield put({
      type: appActions.API_CALL_SUCCESS,
      message: 'Successfully Investor Group Updated'
    });
    yield put({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Investor_Group_List'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
    yield put({
      type: req.refresh,
      payload: true
    });
  } catch (e) {
    yield put({
      type: req.refresh,
      payload: true
    });
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to update Investor Group',
      atAction: Actions.UPDATE_INVESTOR_GROUP_FAILURE,
      showError: true
    });
  }
}

function* createRuleForId(req) {
  try {
    yield call(investorservice.createRuleForId, req.id);
    yield put({
      type: Actions.FETCH_FORM_INVESTOR_GROUP_LIST
    });
    yield put({
      type: appActions.API_CALL_SUCCESS,
      message: 'Successfully Rule Created'
    });
    yield put({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['Manage_Investor_Group_List'],
      formAction: 'FLOWABLE_TANENT_ADMIN_FORMDEF'
    });
  } catch (error) {
    yield all([
      yield put({
        type: appActions.API_CALL_ERROR,
        error: 'Rule Creation failed',
        atAction: Actions.CREATE_RULE_FOR_ID,
        showError: true
      }),
      yield put({
        type: Actions.CREATE_RULE_FOR_ID_FAILURE
      })
    ]);
  }
}

function* searchInvestor(req) {
  try {
    const response = yield call(investorservice.searchInvestor);
    yield put({
      type: Actions.SERACH_INVESTOR_LIST_SUCCESS,
      payload: response.hits
    });
  } catch (error) {
    yield put({
      type: appActions.API_CALL_ERROR,
      error: 'Unable to fetch Investor Group',
      atAction: Actions.SERACH_INVESTOR_GROUPS_FAILURE
    });
  }
}

export function* searchInvestorWatcher() {
  yield takeLatest(Actions.SERACH_INVESTOR_LIST_START, searchInvestor);
}

export function* searchInvestorGroupsWatcher() {
  yield takeLatest(Actions.SERACH_INVESTOR_GROUPS, searchInvestorGroups);
}

export function* saveInvestorToGroupWatcher() {
  yield takeLatest(Actions.SAVE_INVESTOR_TO_GROUP, saveInvestorToGroup);
}

export function* createInvestorGroupWatcher() {
  yield takeLatest(Actions.CREATE_INVESTOR_GROUP, createInvestorGroup);
}

export function* deleteInvestorGroupByIdWatcher() {
  yield takeLatest(
    Actions.DELETE_INVESTOR_GROUP_BY_ID,
    deleteInvestorGroupById
  );
}

export function* getUnassignedInvestorWatcher() {
  yield takeLatest(Actions.FETCH_UNASSIGNED_INVESTOR, getUnassignedInvestor);
}

export function* getFormForInvestorToGroupWatcher() {
  yield takeLatest(
    Actions.FETCH_FORM_INVESTOR_TO_GROUP,
    getFormForInvstorToGroup
  );
}

export function* getFormForInvestorGroupCreationWatcher() {
  yield takeLatest(
    Actions.FETCH_FORM_INVESTOR_GROUP_CREATION,
    getFormForInvestorGroupCreation
  );
}

export function* getFormForInvestorGroupListWatcher() {
  yield takeLatest(
    Actions.FETCH_FORM_INVESTOR_GROUP_LIST,
    getFormForInvestorGroupList
  );
}

export function* findInvestorByInvestorGroupWatcher() {
  yield takeLatest(
    Actions.FIND_INVESTOR_BY_INVESTOR_GROUP,
    findInvestorByInvestorGroup
  );
}

export function* bulkUpdateForInvestorWatcher() {
  yield takeLatest(Actions.UPDATE_INVESTOR_GROUP, bulkUpdateForInvestor);
}

export function* createRuleForIdWatcher() {
  yield takeLatest(Actions.CREATE_RULE_FOR_ID, createRuleForId);
}

export function* getFormForInvestorListWatcher() {
  yield takeLatest(Actions.FETCH_FORM_INVESTOR_LIST, getFormForInvestorList);
}
