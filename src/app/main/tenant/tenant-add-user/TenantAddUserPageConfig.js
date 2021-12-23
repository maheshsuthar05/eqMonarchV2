import React from 'react';

const TenantAddUserConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/tenant/details/:tenantId/users/adduser',
            component: React.lazy(() => import('./TenantAddUserPage'))
        }
    ]
};

export default TenantAddUserConfig;