import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React from 'react';

function ExpensePage() {
  return (
    <MonarchPageCarded
      contentTitle={'Expenses'}
      contentToolbar={<></>}
      leftSidebarContent={<></>}
      content={<></>}
      innerScroll
    />
  );
}

export default ExpensePage;
