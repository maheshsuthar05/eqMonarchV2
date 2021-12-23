import React from 'react';

const TeanantAdminPageConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/admin/tenant/property',
      component: React.lazy(() => import('./property/PropertyPage'))
    },
    {
      path: '/admin/tenant/access-management',
      component: React.lazy(() =>
        import('./access-management/AccessManagementPage')
      )
    },
    {
      path: '/admin/tenant/documentation',
      component: React.lazy(() => import('./documentation/DocumentationPage'))
    },
    {
      path: '/admin/tenant/decision-rule',
      component: React.lazy(() => import('./business-rule/DecisionRulesPage'))
    },
    {
      path: '/admin/tenant/settings',
      component: React.lazy(() => import('./settings/SettingsPage'))
    },
    // {
    //   path: '/admin/tenant/system-health',
    //   component: React.lazy(() =>
    //     import('./system-health/SystemHealthPage')
    //   ),
    //   routes: [
    //     {
    //       path:
    //         '/admin/tenant/system-health/application-performance',
    //       component: React.lazy(() =>
    //         import(
    //           './system-health/system-health-tabs/ApplicationPerformancePage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/system-health',
    //       component: (props) => (
    //         <Redirect
    //           to={`/admin/tenant/${props.match.params.tenantId}/system-health/application-performance`}
    //         />
    //       )
    //     }
    //   ]
    // },
    {
      path: '/admin/tenant/task',
      component: React.lazy(() => import('./task/TaskPage'))
    }
    // {
    //   path: "/admin/tenant/imports-exports",
    //   component: React.lazy(() =>
    //     import("./imports-exports/ImportsExportsPage")
    //   ),
    // },
    // {
    //   path: '/admin/tenant/security',
    //   component: React.lazy(() => import('./security/SecurityPage')),
    //   routes: [
    //     {
    //       path: '/admin/tenant/security/login-rules',
    //       component: React.lazy(() =>
    //         import('./security/security-tabs/LoginRulesPage')
    //       )
    //     },
    //     {
    //       path:
    //         '/admin/tenant/security/user-permission-changes-report',
    //       component: React.lazy(() =>
    //         import(
    //           './security/security-tabs/UserPermissionChangesReportPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/security',
    //       component: (props) => (
    //         <Redirect
    //           to={`/admin/tenant/${props.match.params.tenantId}/security/login-rules`}
    //         />
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: '/admin/tenant/bulk-file-removal',
    //   component: React.lazy(() =>
    //     import('./bulk-file-removal/BulkFileRemovalPage')
    //   ),
    //   routes: [
    //     {
    //       path: '/admin/tenant/bulk-file-removal/remove-files',
    //       component: React.lazy(() =>
    //         import(
    //           './bulk-file-removal/bulk-file-removal-tabs/RemoveFilesPage'
    //         )
    //       )
    //     },
    //     {
    //       path:
    //         '/admin/tenant/bulk-file-removal/files-pending-review',
    //       component: React.lazy(() =>
    //         import(
    //           './bulk-file-removal/bulk-file-removal-tabs/FilesPendingReviewPage'
    //         )
    //       )
    //     },
    //     {
    //       path:
    //         '/admin/tenant/bulk-file-removal/files-pending-deletion',
    //       component: React.lazy(() =>
    //         import(
    //           './bulk-file-removal/bulk-file-removal-tabs/FilesPendingDeletionPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/bulk-file-removal/deleted-files',
    //       component: React.lazy(() =>
    //         import(
    //           './bulk-file-removal/bulk-file-removal-tabs/DeletedFilesPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/bulk-file-removal',
    //       component: (props) => (
    //         <Redirect
    //           to={`/admin/tenant/${props.match.params.tenantId}/bulk-file-removal/remove-files`}
    //         />
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: '/admin/tenant/communication',
    //   component: React.lazy(() =>
    //     import('./communication/CommunicationPage')
    //   ),
    //   routes: [
    //     {
    //       path: '/admin/tenant/communication/settings',
    //       component: React.lazy(() =>
    //         import('./communication/communication-tabs/SettingsPage')
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/communication/predefined-messages',
    //       component: React.lazy(() =>
    //         import(
    //           './communication/communication-tabs/PredefinedMessagesPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/communication/message-categories',
    //       component: React.lazy(() =>
    //         import(
    //           './communication/communication-tabs/MessageCategoriesPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/communication/message-recipients',
    //       component: React.lazy(() =>
    //         import(
    //           './communication/communication-tabs/MessageRecipientsPage'
    //         )
    //       )
    //     },
    //     {
    //       path: '/admin/tenant/communication',
    //       component: (props) => (
    //         <Redirect
    //           to={`/admin/tenant/${props.match.params.tenantId}/communication/settings`}
    //         />
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: '/admin/tenant/cbsa-mgt',
    //   component: React.lazy(() => import('./cbsa-mgt/CBSAMgtPage'))
    // }
  ]
};

export default TeanantAdminPageConfig;
