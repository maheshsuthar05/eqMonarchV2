import {
  ASSIGNED_USER_ROLE_FORM_FETCH_START,
  USER_ROLE_UPDATE_START,
  USER_ROLE_FETCH_START
} from 'app/main/property/store/actionTypes';
import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import * as actions from '../store/actions';
import { assignedRolesApi } from 'app/main/property/services/role-assign.api';
import * as CommonActions from 'app/store/actions/actionTypes';
import { closeModal } from 'app/store/actions';
import _ from 'lodash';

function* getAssignedUserRoleForm() {
  try {
    const formDefination = yield call(
      assignedRolesApi.getRolesListFormDefinition
    );
    yield put(actions.fetchAssignedUserRoleFormsSuccess(formDefination));
  } catch (error) {
    yield put(actions.fetchAssignedUserRoleFormfail(error.message));
  }
}

export function* watchGetAssignedUserRoleForm() {
  yield takeLatest(
    ASSIGNED_USER_ROLE_FORM_FETCH_START,
    getAssignedUserRoleForm
  );
}

function* fetchAssignedUSerRoles(action) {
  const { propertyId } = action;
  try {
    const response = yield call(
      assignedRolesApi.getRolesByPropertyId,
      propertyId
    );
    yield put(actions.fetchAssignedUserRoleSuccess(response));
  } catch (error) {
    yield put(actions.fetchAssignedUserRolefail(error.message));
  }
}

export function* watchFetchAssignedUserRole() {
  yield takeLatest(USER_ROLE_FETCH_START, fetchAssignedUSerRoles);
}

function* updateUserRoles(action) {
  try {
    const nullCheck = _.filter(
      action.payload.customData,
      (response) =>
        !_.isNull(response.partyRoleType) && !_.isNull(response.displayName)
    );
    const userRoles = _.map(nullCheck, (response) => {
      if (_.isObject(response.displayName)) {
        return {
          roleId: response.displayName.roleId,
          userId: response.displayName.userId,
          partyRoleType: response.partyRoleType,
          partyId: response.displayName.partyId,
          displayName: response.displayName.individualFullName
        };
      } else {
        return {
          roleId: response.roleId,
          userId: response.userId,
          partyRoleType: response.partyRoleType,
          partyId: response.partyId,
          displayName :response.displayName
        };
      }
    });
    const response = yield call(
      assignedRolesApi.updateAssignedRolesUsers,
      userRoles,
      action.propertyId
    );

    const caseInstanceId = yield select(
      ({ property }) => property.get.caseInstanceId
    );

    yield call(assignedRolesApi.updateFlowableRoles, userRoles, caseInstanceId);

    yield all([
      put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Roles are Updated Successfully'
      }),
      put(actions.updateUsersRolesSuccess(response)),
      put(actions.fetchAssignedUserRoleStart(action.propertyId)),
      put(closeModal())
    ]);
  } catch (error) {
    yield all([
      put(actions.updateUsersRolesFail(error.message)),
      put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Could not Update Roles. Please contact system Admin'
      }),
      put(closeModal())
    ]);
  }
}

export function* watchUpdateUserRoles() {
  yield takeLatest(USER_ROLE_UPDATE_START, updateUserRoles);
}
