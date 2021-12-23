import { watchGetPropertyAddForm, watchPropertyAdd } from './property-add.saga';
import {
  watchGetPropertyDecisionForm,
  watchGetPropertyDecisionGuidances,
  watchGetPropertyDecisionResults,
  watchGetPropertyDecisions,
  watchGetPropertyDecisionStatuses
} from './property-decision.saga';
import {
  watchDeletePropertyDocument,
  watchDownloadPropertyDocument,
  watchGetPropertyDocumentForm,
  watchUploadPropertyDocument,
  watchGetPropertyDocumentUploadForm,
  watchGetPropertyDocumentPreviewForm,
  watchGetPropertyPreviewFileData,
  watchGetS3FileData
} from './property-document.saga';
import { watchGetProperty } from './property-get.saga';
import watchGetPropertyHeaderForm, {
  watchProcessInstances
} from './property-header.saga';
import {
  watchGetPropertyCaseDefinition,
  watchGetPropertyInit,
  watchGetPropertyStageOverview
} from './property-init.saga';
import { watchPropertyTabsUpdate } from './property-tabs.saga';
import watchGetPropertyTaskListingForm from './property-task-listing.saga';
import {
  watchGetPropertyInstanceDetails,
  watchGetPropertyInstanceDiagram,
  watchGetPropertyInstanceDiagramUrl,
  watchGetPropertyParentInstanceDiagramUrl,
  watchGetPropertyTaskCloseForm,
  watchGetPropertyTaskCloseInstanceDiagram,
  watchGetPropertyTaskDetails,
  watchGetPropertyTaskFormValue,
  watchGetPropertyTaskInstanceDiagramUrl,
  watchGetPropertyTaskOpenForm,
  watchGetPropertyTaskOpenInstanceDiagram,
  watchGetPropertyTaskParentInstanceDiagram,
  watchGetPropertyTaskParentInstanceDiagramUrl,
  watchGetPropertyTaskRootParentInstance,
  watchGoToProperty,
  watchPropertyTaskUpdate,
  watchGetCaseInstanceIdByPropertyIdWatcher
} from './property-task.saga';
import {
  watchGetPropertyUpdateForm,
  watchPropertyUpdate
} from './property-update.saga';
import { watchPropertyMilestone } from './property-milestone.saga';
import propertyGetAllWatcher from './property-get-all.saga';
import {
  watchGetAssignedUserRoleForm,
  watchFetchAssignedUserRole,
  watchUpdateUserRoles
} from './role-assign.saga';
import {
  watchOpenTaskCount,
  watchCompletedTaskCount,
  watchOfferCount,
  watchCompletedTeamTaskCount,
  watchOpenTeamTaskCount
} from './snapshot.saga';
import {
  watchGetPropertyStrategySnapshot,
  watchGetPropertyStrategyClaimForm,
  watchGetPropertyStrategyActualsForm,
  watchGetPropertyStrategyConveyanceForm,
  watchGetPropertyStrategyCWCOTForm,
  watchGetPropertyStrategyREOAsIsForm,
  watchGetPropertyStrategyREORepairForm,
  watchGetPropertyProjectionsGet,
  watchGetPropertyProjectionsAdd,
  watchGetPropertyProjectionsUpdate,
  watchGetPropertyProjectionsList,
  watchGetPropertyStrategyBaselineForm
} from './property-strategy.saga';
import {
  watchPropertyDownloadTemplate,
  watchPropertyUploadTemplate,
  watchGetErrorFileDetails
} from './property-bulkimport.saga';
import {watchGetPropertyLegacyMessage} from './property-mail-box.saga';
import { all, call } from 'redux-saga/effects';

export default function* propertySaga() {
  yield all([
    call(watchGoToProperty),
    call(watchPropertyAdd),
    call(watchPropertyUpdate),
    call(watchGetPropertyAddForm),
    call(watchGetPropertyUpdateForm),
    call(watchGetPropertyHeaderForm),
    call(watchGetProperty),
    call(watchGetPropertyTaskListingForm),
    call(watchPropertyTabsUpdate),
    call(watchGetPropertyTaskDetails),
    call(watchGetPropertyInstanceDetails),
    call(watchGetPropertyInstanceDiagram),
    call(watchGetPropertyInstanceDiagramUrl),
    call(watchGetPropertyParentInstanceDiagramUrl),
    call(watchGetPropertyTaskOpenForm),
    call(watchGetPropertyTaskCloseForm),
    call(watchGetPropertyTaskFormValue),
    call(watchPropertyTaskUpdate),
    call(watchGetPropertyTaskOpenInstanceDiagram),
    call(watchGetPropertyTaskCloseInstanceDiagram),
    call(watchGetPropertyTaskInstanceDiagramUrl),
    call(watchGetPropertyTaskParentInstanceDiagram),
    call(watchGetPropertyTaskParentInstanceDiagramUrl),
    call(watchGetPropertyTaskParentInstanceDiagramUrl),
    call(watchGetPropertyDocumentForm),
    call(watchDeletePropertyDocument),
    call(watchUploadPropertyDocument),
    call(watchDownloadPropertyDocument),
    call(watchGetPropertyDecisionForm),
    call(watchGetPropertyDecisions),
    call(watchGetPropertyDecisionGuidances),
    call(watchGetPropertyDecisionStatuses),
    call(watchGetPropertyDecisionResults),
    call(watchGetPropertyInit),
    call(watchGetPropertyStageOverview),
    call(watchGetPropertyCaseDefinition),
    call(watchGetPropertyTaskRootParentInstance),
    call(watchPropertyMilestone),
    call(propertyGetAllWatcher),
    call(watchGetAssignedUserRoleForm),
    call(watchFetchAssignedUserRole),
    call(watchUpdateUserRoles),
    call(watchGetCaseInstanceIdByPropertyIdWatcher),
    call(watchGetPropertyDocumentUploadForm),
    call(watchGetPropertyDocumentPreviewForm),
    call(watchGetPropertyPreviewFileData),
    call(watchOpenTaskCount),
    call(watchCompletedTaskCount),
    call(watchGetPropertyStrategySnapshot),
    call(watchGetPropertyStrategyClaimForm),
    call(watchGetPropertyStrategyActualsForm),
    call(watchGetPropertyStrategyConveyanceForm),
    call(watchGetPropertyStrategyCWCOTForm),
    call(watchGetPropertyStrategyREOAsIsForm),
    call(watchGetPropertyStrategyREORepairForm),
    call(watchGetPropertyProjectionsGet),
    call(watchGetPropertyProjectionsAdd),
    call(watchGetPropertyProjectionsUpdate),
    call(watchOfferCount),
    call(watchGetPropertyProjectionsList),
    call(watchGetPropertyStrategyBaselineForm),
    call(watchCompletedTeamTaskCount),
    call(watchOpenTeamTaskCount),
    call(watchPropertyDownloadTemplate),
    call(watchPropertyUploadTemplate),
    call(watchGetErrorFileDetails),
    call(watchGetPropertyLegacyMessage),
    call(watchGetS3FileData),
    call(watchProcessInstances)
  ]);
}
