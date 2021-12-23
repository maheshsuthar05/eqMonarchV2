import { authRoles } from 'app/auth';
import React from 'react';

const VerificationProcessPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true
        },
        toolbar: {
          display: true
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/verification/process',
      exacts: true,
      component: React.lazy(() => import('./VerificationProcessPage'))
    }
  ]
};

export default VerificationProcessPageConfig;
