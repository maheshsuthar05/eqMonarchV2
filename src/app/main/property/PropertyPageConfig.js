import React from 'react';
import { Redirect } from 'react-router-dom';

export const PropertyPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/property/details/:caseInstanceId',
      component: React.lazy(() => import('./PropertyPage'))
    },
    {
      path: '/property/list',
      exact: true,
      component: React.lazy(() => import('./property-list/PropertyListPage'))
    },
    {
      path: '/property',
      component: () => <Redirect to="/property/list" />
    },
    {
      path: '/create/property',
      exact: true,
      component: React.lazy(() => import('./property-add/PropertyAddPage'))
    }
  ]
};

export default PropertyPageConfig;
