import _ from 'lodash';

export const getRoleListInterSection = (partyRolesList, msgTask) => {
  let roleListInterSection = _.intersectionBy(
    partyRolesList,
    msgTask,
    'partyRoleType'
  );
  const taskData = _.map(roleListInterSection, (res) => {
    let _id = JSON.stringify(res);
    return {
      ...res,
      _id
    };
  });

  return taskData;
};
export const taskEditFormData = (args, partyRolesList) => {
  let msgOpen = _.filter(
    args.taskConfigurationRoleNotificationXrefs,
    (res) => res.actionType === 'onTime'
  );
  let msgClose = _.filter(
    args.taskConfigurationRoleNotificationXrefs,
    (res) => res.actionType === 'complete'
  );
  let eqConnectCanSwitches = _.reduce(
    args.taskConfigurationPartyTypeRoleXrefs,
    (obj, item) => {
      obj[item.actionType] = item.activeIndicator === 1 ? true : false;
      return obj;
    },
    {}
  );

  return {
    canPauseIndicator: args.canPauseIndicator === 1 ? 'Yes' : 'No',
    canUnpauseIndicator: args.canUnpauseIndicator === 1 ? 'Yes' : 'No',
    canSkipIndicator: args.canSkipIndicator === 1 ? 'Yes' : 'No',
    userCanReopenIndicator: args.userCanReopenIndicator === 1 ? 'Yes' : 'No',
    notifyEmailIndicator: args.notifyEmailIndicator === 1 ? 'Yes' : 'No',
    notifyOnCloseIndicator: args.notifyOnCloseIndicator === 1 ? 'Yes' : 'No',
    messageTextOpen: msgOpen[0]?.messageText,
    messageTextCompleted: msgClose[0]?.messageText,
    openTaskNotification: getRoleListInterSection(partyRolesList, msgOpen),
    completedTaskNotification: getRoleListInterSection(
      partyRolesList,
      msgClose
    ),
    eqConnectPartnerCan: eqConnectCanSwitches,
    commentsByAgentVendor: getRoleListInterSection(
      partyRolesList,
      args.taskConfigurationRoleCommentsAccessXrefs
    )
  };
};
