import React from 'react';
import { Redirect } from 'react-router-dom';

const ManageProductVendorConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/manage',
      component: React.lazy(() => import('./products/ProductsPage')),
      routes: [
        {
          path: '/manage/products',
          component: React.lazy(() => import('./products/ProductsPage'))
        },
        {
          path: '/manage',
          component: () => <Redirect to="/manage/products" />
        }
      ]
    },
    {
      path: '/manage-vendor/details/:vendorId',
      component: React.lazy(() => import('./vendors/VendorPageNew')),
      routes: [
        {
          path: '/manage-vendor/details/:vendorId',
          component: React.lazy(() => import('./vendors/VendorPageNew')),
          exact: true
        }
      ]
    },
    
  ]
};

export default ManageProductVendorConfig;
