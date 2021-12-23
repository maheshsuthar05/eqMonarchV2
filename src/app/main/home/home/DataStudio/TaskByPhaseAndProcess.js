import React from 'react';
import DataStudioWidgets from './DataStudioWidgets';

const TaskByPhaseAndProcess = (props) => {
  return (
    <DataStudioWidgets
      resource={{ question: 5 }}
      title={'Active Task Status By Phase and Process'}
      {...props}
    />
  );
};

export default TaskByPhaseAndProcess;
