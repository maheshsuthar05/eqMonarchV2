import React from 'react';

const TenantRolePrivilegeConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/tenant/details/:tenantId/role-privilege',
            component: React.lazy(() => import('./TenantRolePrivilegePage'))
        }
    ]
};

export default TenantRolePrivilegeConfig;