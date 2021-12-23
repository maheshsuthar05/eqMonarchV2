import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React from 'react';

const OrderStatusPage = (props) => {
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Orders Status'}
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

export default OrderStatusPage;
