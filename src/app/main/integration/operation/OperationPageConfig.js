import React from 'react';

const OperationPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/integration/service/:serviceId/operations',
      exacts: true,
      component: React.lazy(() => import('./NewOperationPage'))
    }
  ]
};

export default OperationPageConfig;
