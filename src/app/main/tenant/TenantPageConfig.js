import React from 'react';
import TenantAddUserConfig from './tenant-add-user/TenantAddUserPageConfig';
import TenantAddRoleConfig from './tenant-add-role/TenantAddRolePageConfig';
import TenantAddPrivilegeConfig from './tenant-add-privilege/TenantAddPrivilegePageConfig';

export const TenantRouteConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/tenant/details/:userType',
      component: React.lazy(() => import('./TenantPage')),
      routes: [
        {
          path: '/tenant/details/:userType/users',
          component: React.lazy(() =>
            import('./tenant-user-list/TenantUserListPage')
          )
        },
        {
          path: '/tenant/details/:userType/groups',
          component: React.lazy(() =>
            import('./tenant-group-list/TenantGroupListPage')
          )
        },
        {
          path: '/tenant/details/:userType/property-roles',
          component: React.lazy(() =>
            import('./tenant-property-roles/TenantPropertyRolesListPage')
          )
        },
        {
          path: '/tenant/details/:userType/privileges',
          component: React.lazy(() =>
            import('./tenant-privilege-list/TenantPrivilegeListPage')
          )
        },
        {
          path: '/tenant/details/:userType/roles',
          component: React.lazy(() =>
            import('./tenant-role-list/TenantRoleListPage')
          )
        },
        {
          path: '/tenant/details/:userType/details',
          exact: true,
          component: React.lazy(() =>
            import('./tenant-details/TenantDetailsPage')
          )
        },
        {
          path: '/tenant/details/:userType/task/:taskId/:taskType',
          component: React.lazy(() => import('./tenant-task/TenantTaskPage'))
        },
        {
          path: '/tenant/details/:userType/tasks/:taskType',
          component: React.lazy(() =>
            import('./tenant-task-list/TenantTaskListPage')
          )
        },
        {
          path: '/tenant/details/:userType/role-privilege-deatils',
          component: React.lazy(() =>
            import('./tenant-role-privilege-list/TenantRolePrivilegeListPage')
          )
        },
        {
          path: '/tenant/details/:userType/data-masking',
          component: React.lazy(() => import('./data-masking/DataMaskingPage'))
        }
      ]
    },
    {
      path: '/tenant/create',
      component: React.lazy(() => import('./tenant-add/TenantAddPage'))
    }
  ]
};

const TenantConfig = [
  TenantAddUserConfig,
  TenantAddRoleConfig,
  TenantAddPrivilegeConfig,
  TenantRouteConfig
];

export default TenantConfig;
