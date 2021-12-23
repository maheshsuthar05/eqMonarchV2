import React from 'react';
import DataStudioWidgets from './DataStudioWidgets';

const TaskByPhase = (props) => {
  return (
    <DataStudioWidgets
      resource={{ question: 6 }}
      title={'Active Task Count By Phase'}
      {...props}
    />
  );
};

export default TaskByPhase;
