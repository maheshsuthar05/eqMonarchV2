import React from 'react';
import { withRouter } from 'react-router';
import ClaimOpenTaskList from 'app/main/task-management/ClaimTask/ClaimOpenTaskList';
import { contextInfo } from 'app/common/helpers';
import _ from '@lodash';

const ClaimsTask = () => {
  return (
    <ClaimOpenTaskList
      file={{
        path: 'tasks/claim-task',
        name: `${_.upperCase(contextInfo().userType)}ClaimsOpenTaskList`
      }}
    />
  );
};

export default withRouter(ClaimsTask);
