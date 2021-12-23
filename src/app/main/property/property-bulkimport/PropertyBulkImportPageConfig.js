import React from 'react';

const PropertyBulkImportPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/bulkimport/property',
      component: React.lazy(() => import('./PropertyBulkImportPage'))
    }
  ]
};

export default PropertyBulkImportPageConfig;

