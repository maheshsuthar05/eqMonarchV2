import React from 'react';

const TenantAddRoleConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/tenant/details/:userType/roles/addrole',
            component: React.lazy(() => import('./TenantAddRolePage'))
        }
    ]
};

export default TenantAddRoleConfig;