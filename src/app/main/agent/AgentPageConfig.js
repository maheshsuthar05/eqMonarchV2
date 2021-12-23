import React from 'react';
import { Redirect } from 'react-router-dom';

const AgentAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/agent/dashboard',
      component: React.lazy(() => import('./dashboard/DashboardPage')),

      routes: [
        {
          path: '/agent/products',
          component: React.lazy(() => import('./products/ProductPage'))
        }
      ]
    },
    {
      path: '/agent/details',
      component: React.lazy(() => import('./AgentPage'))
    },
    {
      path: '/agent/account',
      component: React.lazy(() => import('app/main/vendor/account/AccountPage')),
      routes: [
        {
          path: '/agent/account/profile',
          component: React.lazy(() => import('app/main/vendor/account/profile/ProfilePage')),
        },
        {
          path: '/agent/account',
          component: () => <Redirect to="/agent/account/profile" />
        }
      ]
    },
    {
      path: '/agent',
      component: () => <Redirect to="/agent/dashboard" />
    }
  ]
};

export default AgentAppConfig;
