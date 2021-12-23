const SecuritySubNav = [
  {
    title: 'Login Rules',
    id: 'login-rules',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/security/login-rules',
    visible: true
  },
  {
    title: 'User Permission Changes Report',
    id: 'user-permission-changes-report',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/security/user-permission-changes-report',
    visible: true
  }
];

export default SecuritySubNav;
