import React from 'react';

const TenantAddPrivilegeConfig = {
    settings: {
        layout: {}
    },
    routes: [{
        path: '/tenant/details/:userType/privileges/addprivilege',
        component: React.lazy(() => import('./TenantAddPrivilegePage'))
    }]
};

export default TenantAddPrivilegeConfig;