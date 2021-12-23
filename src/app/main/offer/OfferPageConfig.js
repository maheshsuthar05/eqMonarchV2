import React from 'react';
const OfferPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/offer/list',
      component: React.lazy(() => import('./offer-list/OfferListPage'))
    },
    {
      path: [
        '/offer/property/:caseInstanceId/offerlist/:offerId?',
        '/offer/property/:caseInstanceId/offer-details/:offerId?'
      ],
      component: React.lazy(() => import('./OfferApp'))
    }
  ]
};

export default OfferPageConfig;
