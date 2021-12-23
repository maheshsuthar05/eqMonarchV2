import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { propertyAdminApi } from 'app/main/admin/service/property-admin/property-admin.service';
import * as Actions from 'app/main/admin/store/actionTypes';
import * as CommonActions from 'app/store/actions/actionTypes';
import { getAllDefaultGlobalRolesStart } from 'app/main/admin/store/actions/tenant-admin.actions';
import { closeDialog, closeModal } from 'app/store/actions';
import _ from '@lodash';

function* getAllDefaultGlobalRoles(action) {
  try {
    const {
      _embedded: { roles }
    } = yield call(propertyAdminApi.getAllDefaultGlobalRoles);
    const {
      _embedded: { partyRoleTypes }
    } = yield call(propertyAdminApi.findAllGlobalRoles);

    let partyIds = roles.map((res) => res.partyId).join(',');

    const {
      _embedded: { parties }
    } = yield call(propertyAdminApi.findPartyBasedOnPartyIds, partyIds);
    const rolesList = [];
    const findAllRolesAndGlobalRoles = [];
    const getMyPartyId = (roleType) => {
      let partyId = '';
      roles.filter((res) => {
        if (res.partyRoleType === roleType) {
          partyId = res.partyId;
        }
        return true;
      });
      return partyId;
    };
    partyRoleTypes.map((roleResponse) => {
      if (
        roleResponse.partyRoleType !== null ||
        roleResponse.partyRoleType !== ''
      ) {
        findAllRolesAndGlobalRoles.push({
          ...roleResponse,
          partyId: getMyPartyId(roleResponse.partyRoleType)
        });
      }
      return true;
    });
    findAllRolesAndGlobalRoles.map((roleResponse) => {
      if (roleResponse.partyId === '' || roleResponse.partyId === null) {
        rolesList.push({
          ...roleResponse,
          individualFullName: ''
        });
      }
      parties.map((partiesResponse) => {
        if (roleResponse.partyId === partiesResponse.partyId) {
          rolesList.push({
            ...roleResponse,
            individualFullName: partiesResponse.individualFullName
          });
        }
        return true;
      });
      return true;
    });

    yield put({
      type: Actions.GET_ALL_DEFAULT_GLOBAL_ROLES_SUCCESS,
      payload: rolesList
    });
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to get the data'
      })
    ]);
  }
}

function* updateRoleIndicator(action) {
  try {
    yield put({
      type: Actions.UPDATE_DEFAULT_GLOBAL_ROLES_FLAG,
      payload: true
    });
    const updateRoleResponse = yield call(
      propertyAdminApi.updateRoleIndicator,
      action.partyRolePayload
    );
    if (updateRoleResponse) {
      yield put(getAllDefaultGlobalRolesStart(true));
      yield put({
        type: Actions.UPDATE_DEFAULT_GLOBAL_ROLES_FLAG,
        payload: true
      });
    }
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Update the data'
      }),
      yield put({
        type: Actions.UPDATE_DEFAULT_GLOBAL_ROLES_FLAG,
        payload: false
      })
    ]);
  }
}

function* getPartiesByPartyId(action) {
  try {
    const partyRoleTypeList = yield call(
      propertyAdminApi.findAllByPartyRoleType,
      action.partyRoleType
    );
    const partiesResponse = yield all(
      partyRoleTypeList.map((res) =>
        call(propertyAdminApi.getParties, res.partyId)
      )
    );
    yield put({
      type: Actions.GET_ALL_PARTIES_BY_PARTYID_SUCCESS,
      payload: partiesResponse.filter(Boolean)
    });
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Get the data'
      })
    ]);
  }
}

function* getStateRoleAssignmentMatrixes() {
  try {
    yield call(propertyAdminApi.getStateRoleAssignmentMatrixes);
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Add the data'
      })
    ]);
  }
}

function* addStateRoleAssignmentMatrixes(arg) {
  const payload = yield select(({ fuse }) => fuse.modalDialog.payload);
  const {
    data: {
      roleAssignmentName,
      stateRoleAssignmentInvestorGroupXrefs,
      stateRoleAssignmentInvestorXrefs,
      partyRoleType,
      stateRoleAssignmentStateXrefs,
      stateRoleAssignmentPartyXrefs,
      autoGenerateNameIndicator
    }
  } = payload;

  try {
    const autoGenerateNameIndicatorModified =
      autoGenerateNameIndicator === 'Yes' ? 1 : 0;
    const roleAssignmentNameModified =
      autoGenerateNameIndicator === 'Yes'
        ? `${partyRoleType}_${
            stateRoleAssignmentInvestorGroupXrefs[0].investorGroup
          }_${stateRoleAssignmentInvestorXrefs
            .map((res) => res.investorCode)
            .join('_')}_${stateRoleAssignmentStateXrefs
            .map((res) => res.stateCode)
            .join('_')}`
        : roleAssignmentName;
    const getPayload = yield {
      stateRoleAssignmentInvestorGroupXrefs,
      partyRoleType,
      roleAssignmentName: roleAssignmentNameModified,
      autoGenerateNameIndicator: autoGenerateNameIndicatorModified,
      stateRoleAssignmentInvestorXrefs: yield all(
        _.map(stateRoleAssignmentInvestorXrefs, (res) => {
          return {
            investorCode: res.investorCode
          };
        })
      ),
      stateRoleAssignmentPartyXrefs: yield all(
        _.map(stateRoleAssignmentPartyXrefs, (res) => {
          return {
            individualFullName: res.individualFullName,
            partyId: res.partyId,
            roleId:""
          };
        })
      ),
      stateRoleAssignmentStateXrefs: yield all(
        _.map(stateRoleAssignmentStateXrefs, (res) => {
          return {
            stateName: res.stateName,
            stateCode: res.stateCode
          };
        })
      )
    };
    yield call(propertyAdminApi.addStateRoleAssignmentMatrixes, getPayload);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Role Assignment Added successfully'
    });
    yield put({
      type: arg.refresh,
      payload: true
    });
    yield put(closeModal());
  } catch (e) {
    console.log('add', e);
    yield put({
      type: arg.refresh,
      payload: true
    });
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to Add data',
      showError: true
    });
    yield put(closeModal());
  }
}

function* updateStateRoleAssignmentMatrixes(arg) {
  try {
    const payload = yield select(({ fuse }) => fuse.modalDialog.payload);

    const {
      autoGenerateNameIndicator,
      partyRoleType,
      stateRoleAssignmentInvestorGroupXrefs,
      stateRoleAssignmentInvestorXrefs,
      stateRoleAssignmentStateXrefs,
      stateRoleAssignmentPartyXrefs,
      roleAssignmentName
    } = payload.data;

    const autoGenerateNameIndicatorModified =
      autoGenerateNameIndicator === 'Yes' ? 1 : 0;

    const roleAssignmentNameModified = yield autoGenerateNameIndicator === 'Yes'
      ? `${partyRoleType}_${stateRoleAssignmentInvestorGroupXrefs.map(
          (res) => res.investorGroup
        )}_${stateRoleAssignmentInvestorXrefs
          .map((res) => res.investorCode)
          .join('_')}_${stateRoleAssignmentStateXrefs
          .map((res) => res.stateCode)
          .join('_')}`
      : roleAssignmentName;

    const payloadModified = yield {
      ...payload.data,
      autoGenerateNameIndicator: autoGenerateNameIndicatorModified,
      roleAssignmentName: roleAssignmentNameModified,
      stateRoleAssignmentInvestorGroupXrefs: stateRoleAssignmentInvestorGroupXrefs,
      stateRoleAssignmentInvestorXrefs: yield all(
        _.map(stateRoleAssignmentInvestorXrefs, (res) =>
          res.hasOwnProperty('stateRoleAssignmentInvestorXrefId')
            ? {
                investorCode: res.investorCode,
                stateRoleAssignmentInvestorXrefId:
                  res.stateRoleAssignmentInvestorXrefId
              }
            : {
                investorCode: res.investorCode
              }
        )
      ),
      stateRoleAssignmentPartyXrefs: yield all(
        _.map(stateRoleAssignmentPartyXrefs, (res) =>
          res.hasOwnProperty('stateRoleAssignmentPartyXrefId')
            ? {
                individualFullName: res.individualFullName,
                stateRoleAssignmentPartyXrefId:
                  res.stateRoleAssignmentPartyXrefId,
                partyId: res.partyId,
                roleId: ""
              }
            : {
                individualFullName: res.individualFullName,
                partyId: res.partyId,
                roleId: ""
              }
        )
      ),
      stateRoleAssignmentStateXrefs: yield all(
        _.map(stateRoleAssignmentStateXrefs, (res) =>
          res.hasOwnProperty('stateRoleAssignmentStateXrefId')
            ? {
                stateName: res.stateName,
                stateCode: res.stateCode,
                stateRoleAssignmentStateXrefId:
                  res.stateRoleAssignmentStateXrefId
              }
            : { stateName: res.stateName, stateCode: res.stateCode }
        )
      )
    };

    yield call(
      propertyAdminApi.updateStateRoleAssignmentMatrixes,
      payloadModified
    );
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Role Assignment Updated successfully'
    });
    yield put({
      type: arg.refresh,
      payload: true
    });
    yield put(closeModal());
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to Update data',
      showError: true
    });
    yield put(closeModal());
    yield put({
      type: arg.refresh,
      payload: true
    });
  }
}

function* deleteStateRoleAssignmentMatrixes(arg) {
  try {
    yield call(propertyAdminApi.deleteStateRoleAssignmentMatrixes, arg.payload);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Role Assignment Deleted successfully'
    });
    yield put({
      type: arg.refresh,
      payload: true
    });
    yield put(closeDialog());
  } catch (e) {
    yield put({
      type: 'API_CALL_ERROR',
      error: 'Failed to delete data',
      showError: true
    });
    yield put(closeDialog());
    yield put({
      type: arg.refresh,
      payload: true
    });
  }
}

function* getTeamRoles(action) {
  const { partyRoleType, partyId } = action;
  try {
    const { roleId } = yield call(
      propertyAdminApi.findAllpartyRoleTypesWithUserId,
      partyId,
      partyRoleType
    );
    const {
      _embedded: { partyRoleTypeChildren }
    } = yield call(
      propertyAdminApi.findAllPartyRoleChildByPartyRoleType,
      partyRoleType
    );

    const partyRoleChildList = yield all(
      partyRoleTypeChildren.map((res) =>
        call(
          propertyAdminApi.findByParentRoleIdAndChildPartyRoleType,
          res.partyRoleType,
          roleId
        )
      )
    );

    const partiesList =
      partyRoleChildList.filter(Boolean).length > 0
        ? yield all(
            partyRoleChildList.map((res) =>
              call(propertyAdminApi.getParties, res.childPartyId)
            )
          )
        : '';
    const partyRoleTypeChildrenModified = partyRoleTypeChildren.map(
      (res, inx) => {
        return {
          ...res,
          individualFullName: partiesList[inx]?.individualFullName,
          parentRoleId: roleId,
          parentPartyId: partyId
        };
      }
    );
    yield put({
      type: Actions.GET_TEAM_ROLE_SUCCESS,
      payload: partyRoleTypeChildrenModified
    });
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to get the data'
      })
    ]);
  }
}

function* addPartyRoleTeamParties(action) {
  try {
    const partiesList = yield all(
      action.payload.map((res) =>
        call(
          propertyAdminApi.findAllpartyRoleTypesWithUserId,
          res.individualFullName.partyId,
          res.partyRoleType
        )
      )
    );

    const roleTeamParties = action.payload.map((res, inx) => {
      return {
        childPartyId: partiesList[inx].partyId,
        childPartyRoleType: partiesList[inx].partyRoleType,
        childRoleId: partiesList[inx].roleId,
        parentPartyId: res.parentPartyId,
        parentRoleId: res.parentRoleId
      };
    });

    yield call(propertyAdminApi.addPartyRoleTeamParties, roleTeamParties);

    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: 'Team Role has added successfully'
    });
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to Add the data'
      })
    ]);
  }
}

export function* getAllDefaultGlobalRolesWatchers() {
  yield takeLatest(
    Actions.GET_ALL_DEFAULT_GLOBAL_ROLES_START,
    getAllDefaultGlobalRoles
  );
}

export function* updateAllDefaultGlobalRolesWatchers() {
  yield takeLatest(
    Actions.UPDATE_ALL_DEFAULT_GLOBAL_ROLES_START,
    updateRoleIndicator
  );
}

export function* getPartiesByPartyIdWatchers() {
  yield takeLatest(
    Actions.GET_ALL_PARTIES_BY_PARTYID_START,
    getPartiesByPartyId
  );
}

export function* getStateRoleAssignmentMatrixesWatchers() {
  yield takeLatest(
    Actions.GET_STATE_ROLE_ASSIGNMENT_START,
    getStateRoleAssignmentMatrixes
  );
}

export function* addStateRoleAssignmentMatrixesWatchers() {
  yield takeLatest(
    Actions.ADD_STATE_ROLE_ASSIGNMENT_START,
    addStateRoleAssignmentMatrixes
  );
}

export function* updateStateRoleAssignmentMatrixesWatchers() {
  yield takeLatest(
    Actions.UPDATE_STATE_ROLE_ASSIGNMENT_START,
    updateStateRoleAssignmentMatrixes
  );
}

export function* deleteStateRoleAssignmentMatrixesWatchers() {
  yield takeLatest(
    Actions.DELETE_STATE_ROLE_ASSIGNMENT_START,
    deleteStateRoleAssignmentMatrixes
  );
}

export function* getTeamRolesWatchers() {
  yield takeLatest(Actions.GET_TEAM_ROLE_START, getTeamRoles);
}

export function* addPartyRoleTeamPartiesWatchers() {
  yield takeLatest(
    Actions.ADD_PARTY_ROLE_TEAM_PARTIES_START,
    addPartyRoleTeamParties
  );
}
