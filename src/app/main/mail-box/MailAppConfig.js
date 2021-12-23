import React from 'react';
import { Redirect } from 'react-router-dom';

const MailAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: [
        '/mail/label/:labelHandle/:mailId?/:loanId?',
        '/mail/filter/:filterHandle/:mailId?/:loanId?',
        '/mail/:folderHandle/:mailId?/:loanId?',
        '/mail/:folderHandle/:mailId?/:loanId?'
      ],
      component: React.lazy(() => import('./MailAppPage'))
    },
    {
      path: '/mail',
      component: () => <Redirect to="/mail/inbox" />
    }
  ]
};

export default MailAppConfig;
