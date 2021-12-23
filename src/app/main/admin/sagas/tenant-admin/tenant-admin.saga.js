import { call, put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import { tenantAdminApi } from '../../service/tenant-admin.api';
import { propertyAdminApi } from '../../service/property-admin/property-admin.service'
import * as Actions from '../../store/actionTypes';
import * as CommonActions from 'app/store/actions/actionTypes';
import { closeModal } from 'app/store/actions';
import { admin } from 'app/resources';
// import propertyAdminService from 'app/main/admin/service/property-admin/property-admin.service';

function* fetchLegalEntityForm() {
  try {
    const response = yield call(tenantAdminApi.getLegalEntityForm);
    yield put({
      type: Actions.FETCH_LEGAL_ENTITY_FORM_SUCCESS,
      formDef: response
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch form',
      atAction: Actions.FETCH_LEGAL_ENTITY_FORM_FAILURE
    });
  }
}

function* fetchManageClientConfigurationForm() {
  try {
    const response = yield call(
      tenantAdminApi.getManageClientConfigurationForm
    );
    yield put({
      type: Actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_SUCCESS,
      formDef: response
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch form',
      atAction: Actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_FAILURE
    });
  }
}

function* fetchManageWorkflowSettingsForm() {
  try {
    const response = yield call(tenantAdminApi.getManageWorkflowSettingsForm);
    yield put({
      type: Actions.FETCH_MANAGE_WORKFLOW_SETTINGS_FORM_SUCCESS,
      formDef: response
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch form',
      atAction: Actions.FETCH_MANAGE_WORKFLOW_SETTINGS_FORM_FAILURE
    });
  }
}

function* fetchUserLoadBalanceForm() {
  try {
    const response = yield call(tenantAdminApi.getUserLoadBalanceForm);
    yield put({
      type: Actions.FETCH_USER_LOAD_BALANCE_FORM_SUCCESS,
      formDef: response
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch form',
      atAction: Actions.FETCH_USER_LOAD_BALANCE_FORM_FAILURE
    });
  }
}

function* fetchStateRoleAssignmentForm() {
  try {
    const response = yield call(tenantAdminApi.getStateRoleAssignmentForm);
    yield put({
      type: Actions.FETCH_STATE_ROLE_ASSIGN_FORM_SUCCESS,
      formDef: response
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to fetch form',
      atAction: Actions.FETCH_STATE_ROLE_ASSIGN_FORM_FAILURE
    });
  }
}

function* getCaseId(args) {
  try {
    const response = yield call(tenantAdminApi.getCaseDef, args.key);
    if (Array.isArray(response.data) && response.data.length > 0) {
      yield put({
        type: Actions.FETCH_FLOWABLE_CASE_ID_SUCCESS,
        payload: response.data[0]
      });
    }
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Unable to fetch Case Id'
      }),
      put({
        type: Actions.FETCH_FLOWABLE_CASE_ID_FAILURE
      })
    ]);
  }
}

function* getProcessId(args) {
  try {
    const response = yield call(tenantAdminApi.getProcessDef, args.key);
    if (Array.isArray(response.data) && response.data.length > 0) {
      yield put({
        type: Actions.FETCH_FLOWABLE_PROCESS_ID_SUCCESS,
        payload: response.data[0].id
      });
    }
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Unable to fetch Process Id'
      }),
      put({
        type: Actions.FETCH_FLOWABLE_PROCESS_ID_FAILURE
      })
    ]);
  }
}

function* save(req) {
  try {
    const existing = yield call(
      tenantAdminApi.searchCaseInstance,
      req.uniqueSearchPayload
    );

    if (existing && Array.isArray(existing.data) && existing.data.length > 0) {
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Record already exist'
      });
      yield put({
        type: Actions.SAVE_TO_FLOWABLE_FAILURE
      });
    } else {
      yield call(tenantAdminApi.save, req.payload);
      yield put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Successfully Saved'
      });
      yield put({
        type: Actions.GET_CASE_DATA,
        tenantCode: req.tenantCode,
        key: req.caseDefinitionKey
      });
      yield put(closeModal());
    }

    yield put({
      type: req.refresh,
      payload: true
    });
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to Add  data',
      showError: true
    });
    yield put(closeModal());
    yield put({
      type: req.refresh,
      payload: true
    });
  }
}

function* getCaseData(req) {
  try {
    const payload = {
      caseDefinitionKey: req.key,
      key: req.key,
      latest: 'true',
      sort: 'startTime',
      order: 'desc',
      size: '1000',
      includeCaseVariables: true,
      start: 0,
      tempTenantCode: req.tenantCode
    };
    const response = yield call(tenantAdminApi.searchCaseInstance, payload);
    yield put({
      type: Actions.GET_CASE_DATA_SUCCESS,
      responsePayload: { ...response, key: req.key }
    });
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Get Data',
        showError: true
      }),
      put({
        type: Actions.GET_CASE_DATA_FAILURE
      })
    ]);
  }
}

function* update(req) {
  try {
    yield call(tenantAdminApi.update, req.payload, req.id);

    yield put({
      type: Actions.UPDATE_IN_FLOWABLE_SUCCESS
    });
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Successfully Updated'
    });
    yield put({
      type: Actions.GET_CASE_DATA,
      tenantCode: req.tenantCode,
      key: req.caseDefinitionKey
    });
    yield put({
      type: Actions.STATE_ROLE_REFRESH_TABLE,
      payload: true,
      key: req.caseDefinitionKey
    });
    yield put({
      type: req.refresh,
      payload: true
    });
    yield put(closeModal());
  } catch (error) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to Update data',
      showError: true
    });
    yield put({
      type: req.refresh,
      payload: true
    });
    yield put(closeModal());
  }
}

function* saveLegalEntity(req) {
  try {
    yield call(tenantAdminApi.saveLegalEntity, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Successfully Added'
      }),
      yield put({
        type: req.refresh,
        payload: true
      })
    ]);
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: error.response.data.errorMessage,
        showError: true
      }),
      put({
        type: Actions.ADD_LEGAL_ENTITY_FAILURE
      }),
      put({
        type: req.refresh,
        payload: true
      })
    ]);
  }
}

function* getLegalEntity(req) {
  try {
    yield call(tenantAdminApi.getLegalEntity);
    put({
      type: Actions.GET_LEGAL_ENTITY_SUCCESS
    });
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        message: 'Failed to fetch Data'
      }),
      put({
        type: Actions.GET_LEGAL_ENTITY_FAILURE
      })
    ]);
  }
}

function* deleteLegalEntity(req) {
  try {
    yield call(tenantAdminApi.deleteLegalEntity, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Deleted Successfully'
      }),
      yield put({
        type: req.refresh,
        payload: true
      })
    ]);
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to delete',
        showError: true
      }),
      put({
        type: Actions.DELETE_LEGAL_ENTITY_FAILURE
      }),
      put({
        type: req.refresh,
        payload: true
      })
    ]);
  }
}

function* editLegalEntity(req) {
  try {
    yield call(tenantAdminApi.editLegalEntity, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Edited Successfully'
      }),
      yield put({
        type: req.refresh,
        payload: true
      })
    ]);
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Edit failed',
        showError: true
      }),
      put({
        type: Actions.EDIT_LEGAL_ENTITY_FAILURE
      }),
      put({
        type: req.refresh,
        payload: true
      })
    ]);
  }
}

function* saveListingType(req) {
  try {
    yield call(tenantAdminApi.saveListingType, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Successfully Added'
      }),
      put({
        type: Actions.SAVE_LISTING_TYPE_SUCCESS
      }),
      put({
        type: Actions.GET_LISTING_TYPE
      })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Added',
        showError: true
      }),
      yield put({
        type: Actions.SAVE_LISTING_TYPE_FAILURE
      })
    ]);
  }
}

function* editListingType(req) {
  try {
    yield call(tenantAdminApi.editListingType, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Successfully Edited'
      }),
      put({
        type: Actions.EDIT_LISTING_TYPE_SUCCESS
      }),
      put({
        type: Actions.GET_LISTING_TYPE
      })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Edit',
        showError: true
      }),
      yield put({
        type: Actions.EDIT_LISTING_TYPE_FAILURE
      })
    ]);
  }
}

function* getListingType() {
  try {
    const response = yield call(tenantAdminApi.getListingType);
    yield put({
      type: Actions.GET_LISTING_TYPE_SUCCESS,
      payload: response
    });
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to get the data'
      }),
      yield put({
        type: Actions.GET_LISTING_TYPE_FAILURE
      })
    ]);
  }
}

function* saveStateEviction(req) {
  try {
    yield call(tenantAdminApi.saveStateEviction, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Successfully Added'
      }),
      // yield put({
      //   type: req.refresh,
      //   payload: true
      // })
    ]);
  } catch (error) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: error.response.data.errorMessage,
        showError: true
      }),
      // put({
      //   type: Actions.ADD_STATE_EVITION_BY_ID
      // }),
      // put({
      //   type: req.refresh,
      //   payload: true
      // })
    ]);
  }
}

function* updateStateEviction(req) {
  try {
    yield call(tenantAdminApi.updateStateEviction, req.payload);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Successfully State Eviction Updated'
    });
    yield put({
      type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
      path: 'tenant-admin',
      fileNames: ['state-eviction'],
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
      type: CommonActions.API_CALL_ERROR,
      error: 'Unable to update State Eviction',
      atAction: Actions.UPDATE_STATE_EVITION_BY_ID,
      showError: true
    });
  }
}

function* deleteStateEviction(req) {
  try {
    yield call(tenantAdminApi.deleteStateEviction, req.payload);
    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Deleted Successfully'
      }),
      yield put({
        type: req.refresh,
        payload: true
      })
    ]);
  } catch (e) {
    yield all([
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to delete',
        showError: true
      }),
      put({
        type: Actions.ADMIN_DELETE_STATE_EVICTION_BY_ID
      }),
      put({
        type: req.refresh,
        payload: true
      })
    ]);
  }
}

export function* fetchLegalEntityFormWatcher() {
  yield takeLatest(Actions.FETCH_LEGAL_ENTITY_FORM_START, fetchLegalEntityForm);
}

export function* fetchManageClientConfigurationFormWatcher() {
  yield takeLatest(
    Actions.FETCH_MANAGE_CLIENT_CONFIG_FORM_START,
    fetchManageClientConfigurationForm
  );
}

export function* fetchManageWorkflowSettingsFormWatcher() {
  yield takeLatest(
    Actions.FETCH_MANAGE_WORKFLOW_SETTINGS_FORM_START,
    fetchManageWorkflowSettingsForm
  );
}

export function* fetchUserLoadBalanceFormWatcher() {
  yield takeLatest(
    Actions.FETCH_USER_LOAD_BALANCE_FORM_START,
    fetchUserLoadBalanceForm
  );
}

export function* fetchStateRoleAssignmentFormWatcher() {
  yield takeLatest(
    Actions.FETCH_STATE_ROLE_ASSIGN_FORM_START,
    fetchStateRoleAssignmentForm
  );
}

export function* getCaseIdWatchers() {
  yield takeEvery(Actions.FETCH_FLOWABLE_CASE_ID, getCaseId);
}

export function* saveWatchers() {
  yield takeLatest(Actions.SAVE_TO_FLOWABLE, save);
}

export function* getCaseWatchers() {
  yield takeEvery(Actions.GET_CASE_DATA, getCaseData);
}

export function* getProcessIdWatchers() {
  yield takeLatest(Actions.FETCH_FLOWABLE_PROCESS_ID, getProcessId);
}

export function* updateWatchers() {
  yield takeLatest(Actions.UPDATE_IN_FLOWABLE, update);
}

export function* saveLegalEntityWatchers() {
  yield takeLatest(Actions.ADD_LEGAL_ENTITY, saveLegalEntity);
}

export function* getLegalEntityWatchers() {
  yield takeLatest(Actions.GET_LEGAL_ENTITY, getLegalEntity);
}

export function* deleteLegalEntityWatchers() {
  yield takeLatest(Actions.DELETE_LEGAL_ENTITY, deleteLegalEntity);
}

export function* editLegalEntityWatchers() {
  yield takeLatest(Actions.EDIT_LEGAL_ENTITY, editLegalEntity);
}

export function* saveListingTypeWatchers() {
  yield takeLatest(Actions.SAVE_LISTING_TYPE, saveListingType);
}

export function* getListingTypeWatchers() {
  yield takeLatest(Actions.GET_LISTING_TYPE, getListingType);
}

export function* editListingTypeWatchers() {
  yield takeLatest(Actions.EDIT_LISTING_TYPE, editListingType);
}

export function* editStateEvictionWatcher() {
  yield takeLatest(Actions.UPDATE_STATE_EVITION_BY_ID, updateStateEviction);
}

export function* saveStateEvictionWatcher() {
  yield takeLatest(Actions.ADD_STATE_EVITION_BY_ID, saveStateEviction);
}

export function* deleteStateEvictionWatcher() {
  yield takeLatest(Actions.ADMIN_DELETE_STATE_EVICTION_BY_ID, deleteStateEviction);
}
