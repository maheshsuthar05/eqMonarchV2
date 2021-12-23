import React from 'react';
import { withRouter } from 'react-router';
import AssignedTaskCloseList from 'app/main/task-management/assignedTask/AssignedTaskCloseList';
import { contextInfo } from 'app/common/helpers';
import _ from '@lodash';

const CloseTaskList = () => {
  return (
    <AssignedTaskCloseList
      file={{
        path: 'tasks/assign-task',
        name: `${_.upperCase(contextInfo().userType)}CloseAssignTaskList`
      }}
    />
  );
};

export default withRouter(CloseTaskList);
