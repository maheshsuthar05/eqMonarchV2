import React from 'react';
import { withRouter } from 'react-router';
import AssignedTaskOpenList from 'app/main/task-management/assignedTask/AssignedTaskOpenList';
import { contextInfo } from 'app/common/helpers';
import _ from '@lodash';

const OpenTaskList = () => {
  return (
    <AssignedTaskOpenList
      file={{
        path: 'tasks/assign-task',
        name: `${_.upperCase(contextInfo().userType)}OpenAssignTaskList`
      }}
    />
  );
};

export default withRouter(OpenTaskList);
