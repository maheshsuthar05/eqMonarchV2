import React from 'react';
import _ from '@lodash';
import { renderRoutes } from 'react-router-config';
import FuseSuspense from '@fuse/core/FuseSuspense';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple/MonarchPageSimple';
import MonarchNavigation from '@monarch/core/MonarchNavigation/MonarchNavigation';
import BulkFileRemovalSubNav from './Navigation';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

const BulkFileRemovalPage = ({ content, route }) => {
  const routeParams = useParams();
  const tenantId = routeParams.tenantId;
  const navigationConfig = () => {
    const data = BulkFileRemovalSubNav.map((navigation) => {
      const compiled = _.template(navigation.url);
      return {
        ...navigation,
        url: compiled({ tenantId: tenantId })
      };
    });
    return data;
  };

  return (
    <MonarchPageSimple
      classes={{
        toolbar: 'p-0',
        content: 'p-12'
      }}
      contentToolbar={
        <>
          <MonarchNavigation
            className={clsx('navigation')}
            navigation={navigationConfig()}
            layout="horizontal"
          />
        </>
      }
      content={<FuseSuspense> {renderRoutes(route.routes)}</FuseSuspense>}
      innerScroll
    />
  );
};

export default BulkFileRemovalPage;
