import { all, call } from 'redux-saga/effects';
import {
  fetchRuleGroupsWatcher,
  fetchDecisionTableWatcher,
  updateDecisionTableWatcher,
  fetchInvestorGroupWatcher
} from './decision-rule.saga';
import {
  fetchLegalEntityFormWatcher,
  fetchManageClientConfigurationFormWatcher,
  fetchUserLoadBalanceFormWatcher,
  fetchStateRoleAssignmentFormWatcher,
  getCaseIdWatchers,
  saveWatchers,
  getCaseWatchers,
  getProcessIdWatchers,
  updateWatchers,
  saveLegalEntityWatchers,
  getLegalEntityWatchers,
  editLegalEntityWatchers,
  deleteLegalEntityWatchers,
  saveListingTypeWatchers,
  getListingTypeWatchers,
  editListingTypeWatchers,
  deleteStateEvictionWatcher,
  editStateEvictionWatcher,
  saveStateEvictionWatcher
} from './tenant-admin/tenant-admin.saga';
import {
  manageProductVendorWatcher,
  manageProductVendorDataWatch,
  deleteApprovedProductWatch
} from './manage-product-vendor.saga';
import {
  vendorApprovedListWatch,
  vendorUpdateStatusWatcher
} from './manage-vendor-approved.saga';
import {
  fetchDecisionTableWatchers,
  fetchRuleAdminWatcher
} from './tenant-admin/tenant-admin-decison.saga';
import {
  searchInvestorGroupsWatcher,
  getUnassignedInvestorWatcher,
  deleteInvestorGroupByIdWatcher,
  createInvestorGroupWatcher,
  saveInvestorToGroupWatcher,
  getFormForInvestorToGroupWatcher,
  getFormForInvestorGroupCreationWatcher,
  getFormForInvestorGroupListWatcher,
  findInvestorByInvestorGroupWatcher,
  bulkUpdateForInvestorWatcher,
  createRuleForIdWatcher,
  getFormForInvestorListWatcher,
  searchInvestorWatcher
} from './investor.saga';

import {
  getAllDefaultGlobalRolesWatchers,
  updateAllDefaultGlobalRolesWatchers,
  getPartiesByPartyIdWatchers,
  addStateRoleAssignmentMatrixesWatchers,
  getStateRoleAssignmentMatrixesWatchers,
  updateStateRoleAssignmentMatrixesWatchers,
  deleteStateRoleAssignmentMatrixesWatchers,
  getTeamRolesWatchers,
  addPartyRoleTeamPartiesWatchers
} from './property-admin/property-admin.saga';
import {
  updateTaskConfigurationsWatchers,
  getPartyRoleTypesWatchers,
  deleteStateEvictionByIdWatcher
} from './task-admin/task-admin.saga';

export default function* adminSaga() {
  yield all([
    call(fetchRuleGroupsWatcher),
    call(fetchDecisionTableWatcher),
    call(updateDecisionTableWatcher),
    call(fetchInvestorGroupWatcher),
    call(fetchLegalEntityFormWatcher),
    call(manageProductVendorWatcher),
    call(manageProductVendorDataWatch),
    call(deleteApprovedProductWatch),
    call(searchInvestorGroupsWatcher),
    call(vendorApprovedListWatch),
    call(getUnassignedInvestorWatcher),
    call(deleteInvestorGroupByIdWatcher),
    call(createInvestorGroupWatcher),
    call(saveInvestorToGroupWatcher),
    call(getFormForInvestorToGroupWatcher),
    call(getFormForInvestorGroupCreationWatcher),
    call(fetchManageClientConfigurationFormWatcher),
    call(fetchUserLoadBalanceFormWatcher),
    call(fetchStateRoleAssignmentFormWatcher),
    call(getFormForInvestorGroupListWatcher),
    call(findInvestorByInvestorGroupWatcher),
    call(bulkUpdateForInvestorWatcher),
    call(vendorUpdateStatusWatcher),
    call(createRuleForIdWatcher),
    call(getFormForInvestorListWatcher),
    call(getCaseIdWatchers),
    call(saveWatchers),
    call(getCaseWatchers),
    call(updateWatchers),
    call(getProcessIdWatchers),
    call(saveLegalEntityWatchers),
    call(getLegalEntityWatchers),
    call(editLegalEntityWatchers),
    call(deleteLegalEntityWatchers),
    call(saveListingTypeWatchers),
    call(getListingTypeWatchers),
    call(editListingTypeWatchers),
    call(getAllDefaultGlobalRolesWatchers),
    call(updateAllDefaultGlobalRolesWatchers),
    call(getPartiesByPartyIdWatchers),
    call(getStateRoleAssignmentMatrixesWatchers),
    call(addStateRoleAssignmentMatrixesWatchers),
    call(updateStateRoleAssignmentMatrixesWatchers),
    call(deleteStateRoleAssignmentMatrixesWatchers),
    call(getTeamRolesWatchers),
    call(addPartyRoleTeamPartiesWatchers),
    call(updateTaskConfigurationsWatchers),
    call(getPartyRoleTypesWatchers),
    call(fetchDecisionTableWatchers),
    call(fetchRuleAdminWatcher),
    call(searchInvestorWatcher),
    call(deleteStateEvictionByIdWatcher),
    call(deleteStateEvictionWatcher),
    call(editStateEvictionWatcher),
    call(saveStateEvictionWatcher)
  ]);
}
