import React from 'react';

const ServiceTestRouteConfig = {
    settings: {
      layout: {}
    },
    routes: [
      {
        path: '/service/test',
        component: React.lazy(() => import('./ServiceTestPage'))
      }
    ]
  };

const ServiceTestPageConfig=[
  ServiceTestRouteConfig
]


export default ServiceTestPageConfig