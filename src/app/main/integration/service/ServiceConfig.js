import React from 'react';

const ServicePageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/integration/services',
      exacts: true,
      component: React.lazy(() => import('./NewServicePage'))
    }
  ]
};

export default ServicePageConfig;
