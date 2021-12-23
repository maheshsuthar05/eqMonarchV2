import React from 'react';
import DataStudioWidgets from './DataStudioWidgets';

const TaskActiveDetails = (props) => {
  return (
    <DataStudioWidgets
      resource={{ dashboard: 4 }}
      title={'Active Task Details'}
      {...props}
    />
  );
};

export default TaskActiveDetails;
