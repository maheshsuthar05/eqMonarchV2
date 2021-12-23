import React from 'react';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple/MonarchPageSimple';

const CBSAMgtPage = ({ content, route }) => {
  return (
    <MonarchPageSimple
      classes={{
        content: 'p-12'
      }}
      
      content={
        <div>CBSAMgtPage</div>
      }
      innerScroll
    />
  );
};

export default CBSAMgtPage;
