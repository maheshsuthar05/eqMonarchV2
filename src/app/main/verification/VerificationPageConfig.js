import { authRoles } from 'app/auth';
import React from 'react';
import history from '@history';

const VerificationPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display:
            history.location.pathname === '/verification/successful'
              ? false
              : true
        },
        toolbar: {
          display:
            history.location.pathname === '/verification/successful'
              ? false
              : true
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
      component: React.lazy(() =>
        import('./verificationProcess/VerificationProcessPage')
      )
    },
    {
      path: '/verification/successful',
      exacts: true,
      component: React.lazy(() =>
        import('./verificationSuccessful/VerificationSuccessfulPage')
      )
    },
    {
      path: '/verification/user',
      exacts: true,
      component: React.lazy(() => import('./VerificationPage'))
    }
  ]
};

export default VerificationPageConfig;
