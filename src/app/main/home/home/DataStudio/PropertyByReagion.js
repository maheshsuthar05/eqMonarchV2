import React from 'react';
import DataStudioWidgets from './DataStudioWidgets';

const PropertyByReagion = (props) => {
  return (
    <DataStudioWidgets
      resource={{ question: 1 }}
      title={'Property By State'}
      {...props}
    />
  );
};

export default PropertyByReagion;
