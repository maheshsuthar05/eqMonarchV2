import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import PropertyDecision from 'app/main/property/components/PropertyDecision';
import React from 'react';

const PropertyDecisionPage = (props) => {
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Rules'}
      leftSidebarContent={<></>}
      contentToolbar={<></>}
      content={<PropertyDecision {...props} />}
    />
  );
};

export default PropertyDecisionPage;
