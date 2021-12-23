import React from 'react';

const PropertyListPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/property/list',
      exact: true,
      component: React.lazy(() =>
        import('app/main/property/property-list/PropertyListPage')
      )
    }
  ]
};

export default PropertyListPageConfig;
