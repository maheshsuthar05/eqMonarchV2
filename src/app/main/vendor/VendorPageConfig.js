import React from 'react';
import { Redirect } from 'react-router-dom';

const VendorPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/vendor/details',
      component: React.lazy(() => import('./VendorPage'))
    },
    {
      path: '/vendor/dashboard',
      component: React.lazy(() => import('./dashboard/DashboardPage'))
    },
    {
      path: '/vendor/account',
      component: React.lazy(() => import('./account/AccountPage')),
      routes: [
        {
          path: '/vendor/account/profile',
          component: React.lazy(() => import('./account/profile/ProfilePage')),
        },
        {
          path: '/vendor/account',
          component: (props) => <Redirect to="/vendor/account/profile" />
        }
      ]
    },
    {
      path: '/vendor/orders',
      component: React.lazy(() => import('./OrderPage'))
    },
    {
      path: '/vendor/statements',
      component: React.lazy(() => import('./StatementPage'))
    },
    {
      path: '/vendor/expense',
      component: React.lazy(() => import('./ExpensePage'))
    },
    {
      path: '/vendor',
      component: () => <Redirect to="/vendor/dashboard" />
    }
  ]
};

const VendorAppConfig = [VendorPageConfig];

export default VendorAppConfig;
