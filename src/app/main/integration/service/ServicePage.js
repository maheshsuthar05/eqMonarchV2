import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import ServiceTable from './ServiceTable';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded/MonarchPageCarded';

function ServicePage() {
  return (
    <MonarchPageCarded
      contentTitle={'Integration'}
      leftSidebarContent={<></>}
      contentToolbar={
        <>
          <div class="show-clear-filter">&nbsp;</div>
        </>
      }
      content={<ServiceTable />}
      innerScroll
    />
  );
}

export default withReducer('integration', reducer)(ServicePage);
