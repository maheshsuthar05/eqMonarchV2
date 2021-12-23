import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React from 'react';

const ManageTaskPage = (props) => {
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Manage Tasks'}
      leftSidebarContent={<></>}
      contentToolbar={<></>}
      content={
        <>
          <div>content comes here</div>
        </>
      }
    />
  );
};

export default ManageTaskPage;
