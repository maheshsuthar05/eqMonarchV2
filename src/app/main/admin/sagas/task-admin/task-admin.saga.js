import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as Actions from 'app/main/admin/store/actionTypes';
import { taskAdminApi } from 'app/main/admin/service/task-admin/task-admin.service';
import * as CommonActions from 'app/store/actions/actionTypes';
import { closeModal } from 'app/store/actions';
import _ from 'lodash';
import { core } from 'app/config/flowable-core/services';

function* updateTaskConfigurations(action) {
  try {
    const {
      taskConfigurationId,
      openTaskNotification,
      completedTaskNotification,
      messageTextOpen,
      messageTextCompleted,
      commentsByAgentVendor,
      eqConnectPartnerCan
    } = action.payload;

    let vendorAgentComment = [];
    let openNotification = [];
    let closeNotification = [];

    commentsByAgentVendor.filter((res, inx) => {
      if (
        action.payload.taskConfigurationRoleCommentsAccessXrefs.some(
          (ele) => res.partyRoleType === ele.partyRoleType
        )
      ) {
        vendorAgentComment.push({
          partyRoleType: res.partyRoleType,
          taskConfigurationRoleCommentsAccessXrefId:
            action.payload.taskConfigurationRoleCommentsAccessXrefs[inx]
              .taskConfigurationRoleCommentsAccessXrefId
        });
        return true;
      } else {
        vendorAgentComment.push({ partyRoleType: res.partyRoleType });
        return true;
      }
    });

    const manageOpenTaskNotification = () => {
      return openTaskNotification.filter((res, index) => {
        if (
          action.payload.taskConfigurationRoleNotificationXrefs.some(
            (ele) => res.partyRoleType === ele.partyRoleType
          ) &&
          action.payload.taskConfigurationRoleNotificationXrefs.some(
            (ele) => ele.actionType === 'onTime'
          )
        ) {
          openNotification.push({
            actionType: 'onTime',
            messageText: messageTextOpen,
            partyRoleType: res.partyRoleType,
            taskConfigurationRoleCommentsAccessXrefId:
              action.payload.taskConfigurationRoleNotificationXrefs[index]
                .taskConfigurationRoleCommentsAccessXrefId
          });
          return true;
        } else {
          openNotification.push({
            actionType: 'onTime',
            messageText: messageTextOpen,
            partyRoleType: res.partyRoleType
          });
          return true;
        }
      });
    };

    const manageCloseTaskNotification = () => {
      return completedTaskNotification.filter((res, index) => {
        if (
          action.payload.taskConfigurationRoleNotificationXrefs.some(
            (ele) => res.partyRoleType === ele.partyRoleType
          ) &&
          action.payload.taskConfigurationRoleNotificationXrefs.some(
            (ele) => ele.actionType === 'complete'
          )
        ) {
          closeNotification.push({
            actionType: 'complete',
            messageText: messageTextCompleted,
            partyRoleType: res.partyRoleType,
            taskConfigurationRoleCommentsAccessXrefId:
              action.payload.taskConfigurationRoleNotificationXrefs[index]
                .taskConfigurationRoleCommentsAccessXrefId
          });
          return true;
        } else {
          closeNotification.push({
            actionType: 'complete',
            messageText: messageTextCompleted,
            partyRoleType: res.partyRoleType
          });
          return true;
        }
      });
    };

    if (action.payload.notifyEmailIndicator === 'Yes') {
      manageOpenTaskNotification();
    }

    if (action.payload.notifyOnCloseIndicator === 'Yes') {
      manageCloseTaskNotification();
    }

    const eqConnectInvestor = [
      {
        actionType: 'investorComplete',
        partyRoleType: 'investor',
        activeIndicator: eqConnectPartnerCan.investorComplete === true ? 1 : 0
      },
      {
        actionType: 'investorwhenComplete',
        partyRoleType: 'investor',
        activeIndicator:
          eqConnectPartnerCan.investorwhenComplete === true ? 1 : 0
      },
      {
        actionType: 'investorwhenOpen',
        partyRoleType: 'investor',
        activeIndicator: eqConnectPartnerCan.investorwhenOpen === true ? 1 : 0
      },
      {
        actionType: 'MICompanyWhenComplete',
        partyRoleType: 'miCompany',
        activeIndicator:
          eqConnectPartnerCan.MICompanyWhenComplete === true ? 1 : 0
      },
      {
        actionType: 'MICompanyWhenOpen',
        partyRoleType: 'miCompany',
        activeIndicator: eqConnectPartnerCan.MICompanyWhenOpen === true ? 1 : 0
      },
      {
        actionType: 'MICompanyComplete',
        partyRoleType: 'miCompany',
        activeIndicator: eqConnectPartnerCan.MICompanyComplete === true ? 1 : 0
      },
      {
        actionType: 'servicerWhenComplete',
        partyRoleType: 'servicer',
        activeIndicator:
          eqConnectPartnerCan.servicerWhenComplete === true ? 1 : 0
      },
      {
        actionType: 'servicerWhenOpen',
        partyRoleType: 'servicer',
        activeIndicator: eqConnectPartnerCan.servicerWhenOpen === true ? 1 : 0
      },
      {
        actionType: 'servicerComplete',
        partyRoleType: 'servicer',
        activeIndicator: eqConnectPartnerCan.servicerComplete === true ? 1 : 0
      }
    ];

    const combinedCloseOpenTask = _.concat(openNotification, closeNotification);
    const payload = {
      taskConfigurationId,
      taskDescription: action.payload.taskDescription,
      canPauseIndicator: action.payload.canPauseIndicator === 'Yes' ? 1 : 0,
      canUnpauseIndicator: action.payload.canUnpauseIndicator === 'Yes' ? 1 : 0,
      canSkipIndicator: action.payload.canUnpauseIndicator === 'Yes' ? 1 : 0,
      userCanReopenIndicator:
        action.payload.userCanReopenIndicator === 'Yes' ? 1 : 0,
      maxDaysToPause: action.payload.maxDaysToPause,
      daysToWarning: action.payload.daysToWarning,
      daysToComplete: action.payload.daysToComplete,
      notifyOnCloseIndicator:
        action.payload.notifyOnCloseIndicator === 'Yes' ? 1 : 0,
      notifyEmailIndicator:
        action.payload.notifyEmailIndicator === 'Yes' ? 1 : 0,
      taskConfigurationRoleNotificationXrefs: combinedCloseOpenTask,
      taskConfigurationPartyTypeRoleXrefs: eqConnectInvestor,
      taskConfigurationRoleCommentsAccessXrefs: vendorAgentComment
    };
    yield all([
      yield call(taskAdminApi.updateTaskConfigurations, payload),
      yield put({
        type: Actions.STATE_ROLE_REFRESH_TABLE,
        payload: true
      }),
      yield put({
        type: Actions.STATE_ROLE_REFRESH_TABLE,
        payload: false
      }),
      yield put(closeModal()),
      yield put({
        type: CommonActions.API_CALL_SUCCESS,
        message: 'Task Configuration Updated successfully'
      })
    ]);
  } catch (error) {
    yield all([
      yield put({
        type: CommonActions.API_CALL_ERROR,
        error: 'Failed to update the Task Configuration'
      }),
      yield put(closeModal())
    ]);
  }
}

function* getPartyRoleTypes() {
  try {
    const {
      page: { totalElements }
    } = yield call(taskAdminApi.getPartyRoleTypes);
    const {
      _embedded: { partyRoleTypes }
    } = yield call(taskAdminApi.getPartyRoleTypes, totalElements);
    yield put({
      type: Actions.GET_PARTY_ROLE_TYPE_LIST_SUCCESS,
      payload: partyRoleTypes
    });
  } catch (error) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to Get the data'
    });
  }
}

function* delStateEviction(args) {
  try {
    yield call(core.delete, args.payload.id);
    yield put({
      type: CommonActions.API_CALL_SUCCESS,
      message: `Deleted succesfully`
    });
    yield put({
      type: args.refresh,
      payload: true
    });
  } catch (e) {
    yield put({
      type: CommonActions.API_CALL_ERROR,
      error: 'Failed to delete',
      showError: true
    });
    yield put({
      type: args.refresh,
      payload: true
    });
  }
}

export function* getPartyRoleTypesWatchers() {
  yield takeLatest(Actions.GET_PARTY_ROLE_TYPE_LIST_START, getPartyRoleTypes);
}

export function* updateTaskConfigurationsWatchers() {
  yield takeLatest(
    Actions.TENANT_ADMIN_TASK_PROPERTIES_EDIT_START,
    updateTaskConfigurations
  );
}

export function* deleteStateEvictionByIdWatcher() {
  yield takeLatest(Actions.DELETE_STATE_EVITION_BY_ID, delStateEviction);
}
