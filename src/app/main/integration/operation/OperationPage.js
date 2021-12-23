import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import OperationTable from './OperationTable';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';

function OperationPage() {
  return (
    <MonarchPageCarded
      contentTitle={'Operations'}
      leftSidebarContent={<></>}
      contentToolbar={<></>}
      content={<OperationTable />}
      innerScroll
    />
  );
}

export default withReducer('integration', reducer)(OperationPage);
