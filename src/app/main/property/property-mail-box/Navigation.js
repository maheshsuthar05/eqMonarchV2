const Navigation = {
  children: [
    {
      id: 'taskManagmentClaims',
      title: 'Inbox',
      type: 'item',
      icon: '',
      url: '/property/details/<%= caseInstanceId %>/property-mail/inbox',
      visible: true,
      disabled: false
    },
    {
      id: 'taskManagmentOpenTasks',
      title: 'Legacy',
      type: 'item',
      icon: '',
      url: '/property/details/<%= caseInstanceId %>/property-mail/legacy',
      visible: true,
      disabled: false
    }
  ]
};

export default Navigation;
