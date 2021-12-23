import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import reducer from 'app/main/mail-box/store/reducers';
import OfferListPropertyPage from 'app/main/offer/offer-list-property/OfferListPropertyPage';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';

const PropertyOfferListPage = (props) => {
  const pageLayout = useRef(null);

  return (
    <>
      <MonarchPageCarded
        innerGrid={'col-span-2'}
        contentTitle={'Offers'}
        leftSidebarContent={<></>}
        contentToolbar={<></>}
        content={<OfferListPropertyPage />}
        ref={pageLayout}
      />
    </>
  );
};

export default withReducer('offer', reducer)(PropertyOfferListPage);
