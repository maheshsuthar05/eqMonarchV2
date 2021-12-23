const TenantAdminNav = {
  id: 'tanent-admin',
  title: 'Tanent Admin',
  type: 'group',
  icon: 'star',
  sideNav: [
    {
      id: 'property',
      title: 'Property',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/property`,
      visible: true
    },
    {
      id: 'access-management',
      title: 'Access Management',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/access-management`,
      visible: true
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/documentation`,
      visible: true
    },
    {
      id: 'decision-rules',
      title: 'Business Rules',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/decision-rule`,
      visible: true
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/settings`,
      visible: true
    },
    {
      id: 'system-health',
      title: 'System Health',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/system-health`,
      visible: true
    },
    {
      id: 'task',
      title: 'Task',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/task`,
      visible: true
    },
    {
      id: 'imports-exports',
      title: 'Imports | Exports',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/imports-exports`,
      visible: true
    },
    {
      id: 'security',
      title: 'Security',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/security`,
      visible: true
    },
    {
      id: 'bulk-file-removal',
      title: 'Bulk File Removal',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/bulk-file-removal`,
      visible: true
    },
    {
      id: 'state-eviction',
      title: 'State Eviction',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/state-eviction`,
      visible: true
    },
    {
      id: 'communication',
      title: 'Communication',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/communication`,
      visible: true
    },
    {
      id: 'cbsa-mgt',
      title: 'CBSA Mgt',
      type: 'item',
      url: `/admin/tenant/<%= tenantId %>/cbsa-mgt`,
      visible: true
    }
  ]
};

export default TenantAdminNav;
