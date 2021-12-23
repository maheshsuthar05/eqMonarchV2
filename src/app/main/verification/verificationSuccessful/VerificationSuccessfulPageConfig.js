import { authRoles } from 'app/auth';
import React from 'react';

const VerificationProcessPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
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
      path: '/verification/successful',
      exacts: true,
      component: React.lazy(() => import('./VerificationSuccessfulPage'))
    }
  ]
};

export default VerificationProcessPageConfig;
