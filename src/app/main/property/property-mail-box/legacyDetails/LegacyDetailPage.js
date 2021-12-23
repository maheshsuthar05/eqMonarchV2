import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import React from 'react';
import { withRouter } from 'react-router';
import LegacyDetail from './LegacyDetail';
import LegacyDetailHeader from './LegacyDetailHeader';

const LegacyDetailPage = (props) => {
  return (
    <MonarchPageSimple
      contentToolbar={<LegacyDetailHeader />}
      content={<LegacyDetail />}
      innerScroll
    />
  );
};

export default withRouter(LegacyDetailPage);
