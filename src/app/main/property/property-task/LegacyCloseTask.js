import React from 'react';
import { withRouter } from 'react-router';
import LegacyCloseTaskList from 'app/main/task-management/legacyTask/LegacyCloseTaskList';

const ClaimsTask = () => {
  return (
    <LegacyCloseTaskList
      file={{
        path: 'tasks/legacy-task',
        name: 'LegacyCloseTaskList'
      }}
    />
  );
};

export default withRouter(ClaimsTask);
