import React from 'react';

const PropertyAddPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/create/property',
      exact: true,
      component: React.lazy(() => import('./property-add/PropertyAddPage'))
    },
    {
      path: '/create',
      component: () => <Redirect to="/create/property" />
    }
  ]
};

export default PropertyAddPageConfig;
