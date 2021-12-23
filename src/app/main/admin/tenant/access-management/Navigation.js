const AccessManagementSubNav = [
  // {
  //   title: 'Workstation Users',
  //   id: 'workstation-users',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/access-management/workstation-users',
  //   visible: true
  // },
  // {
  //   title: 'Add User',
  //   id: 'add-user',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/access-management/add-user',
  //   visible: true
  // },
  // {
  //   title: 'User Groups',
  //   id: 'user-groups',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/access-management/user-groups',
  //   visible: true
  // },
  // {
  //   title: 'Change Log',
  //   id: 'change-log',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/access-management/change-log',
  //   visible: true
  // },
  // {
  //   title: 'Floor Value Acceptance',
  //   id: 'floor-value-acceptance',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/access-management/floor-value-acceptance',
  //   visible: true
  // },
  {
    title: 'MI-Companies',
    id: 'mi-companies',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/access-management/mi-companies',
    visible: true
  },
  {
    title: 'Manage Investor Groups',
    id: 'manage-investor-group',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/access-management/investor-group',
    visible: true
  },
  {
    title: 'Manage Investors',
    id: 'manage-investor',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/access-management/investor',
    visible: true
  },
];

export default AccessManagementSubNav;
