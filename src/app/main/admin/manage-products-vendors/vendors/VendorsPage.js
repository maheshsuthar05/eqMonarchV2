import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import React from 'react';
import ListVendors from './ListVendors';

function VendorPage(props) {
  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Vendor Products'}
      leftSidebarContent={<></>}
      contentToolbar={<></>}
      content={
        <>
          <ListVendors />
        </>
      }
    />
  );
}

export default VendorPage;
