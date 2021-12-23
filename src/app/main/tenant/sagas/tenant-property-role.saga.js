import { call, put, takeLatest, all } from 'redux-saga/effects';
import { tenantApi } from '../services/tenant.api';
import * as actions from 'app/main/tenant/store/actionTypes';
import { closeModal } from 'app/store/actions';
import * as CommonActions from 'app/store/actions/actionTypes';
import _ from 'lodash';

function* addAndUpdatePropertyRoles(action) {
  try {
    const {
      partyRoleTypeDisplay,
      partyRoleTypeDescription,
      partyRoleType,
      listForAdd,
      partyRoleTypeTeamLeadIndicator,
      requiresDefaultPartyIndicator,
      autoAssignIndicator
    } = action.payload.formData;
    const payload = {
      displayName: partyRoleTypeDisplay,
      description: partyRoleTypeDescription,
      teamLeadIndicator: partyRoleTypeTeamLeadIndicator ? 1 : 0,
      requiresDefaultIndicator: requiresDefaultPartyIndicator ? 1 : 0,
      autoAssignmentIndicator: autoAssignIndicator ? 1 : 0,
      listForAdd: [...new Set(listForAdd.map((res) => res.partyId))]
    };
    yield call(tenantApi.updateRoles, partyRoleType, payload);
    yield put(closeModal());
    if (action.payload.isEdit) {
      yield put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Property Role has been updated successfully'
      });
    } else {
      yield put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Property Role has been added successfully'
      });
    }
    yield all([
      put({
        type: actions.TENANT_PROPERTY_ROLES_TABLE_REFRESH,
        payload: true
      }),
      put({
        type: actions.TENANT_PROPERTY_ROLES_TABLE_REFRESH,
        payload: false
      })
    ]);
  } catch (error) {
    yield put(closeModal());
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to Update the data'
    });
  }
}

function* propertyRolesDelete(action) {
  try {
    yield call(tenantApi.deleteRoles, action.payload.partyRoleTypeId);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Property Role has been Deleted successfully'
    });
    yield all([
      put({
        type: actions.TENANT_PROPERTY_ROLES_TABLE_REFRESH,
        payload: true
      }),
      put({
        type: actions.TENANT_PROPERTY_ROLES_TABLE_REFRESH,
        payload: false
      })
    ]);
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to Delete the data'
    });
  }
}

function* getRolePartyDtos(action) {
  try {
    const roleTypeResponse = yield call(
      tenantApi.getRolePartyDtos,
      action.partyRoleType
    );
    yield put({
      type: actions.TENANT_PROPERTY_ROLES_USERS_SUCCESS,
      payload: roleTypeResponse
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to Get the data'
    });
  }
}

function* getPartyRoleTypes() {
  try {
    const {
      page: { totalElements }
    } = yield call(tenantApi.getPartyRoleTypes);
    const {
      _embedded: { partyRoleTypes }
    } = yield call(tenantApi.getPartyRoleTypes, totalElements);
    yield put({
      type: actions.GET_TENANT_PROPERTY_ROLES_SUCCESS,
      payload: _.map(partyRoleTypes, 'partyRoleType')
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to Get the data'
    });
  }
}

export function* watchGetPropertyRoles() {
  yield takeLatest(actions.GET_TENANT_PROPERTY_ROLES_START, getPartyRoleTypes);
}

export function* watchPropertyRolesUsers() {
  yield takeLatest(actions.TENANT_PROPERTY_ROLES_USERS_START, getRolePartyDtos);
}

export function* watchPropertyRolesDelete() {
  yield takeLatest(
    actions.TENANT_PROPERTY_ROLES_DELETE_START,
    propertyRolesDelete
  );
}

export function* watchAddAndUpdatePropertyRoles() {
  yield takeLatest(
    actions.TENANT_PROPERTY_ROLES_ADD_START,
    addAndUpdatePropertyRoles
  );
}
