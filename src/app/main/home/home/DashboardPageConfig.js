import React from 'react';

const DashboardConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/home/dashboard',
      component: React.lazy(() => import('./NewDashBoardPage'))
    }
  ]
};

export default DashboardConfig;
