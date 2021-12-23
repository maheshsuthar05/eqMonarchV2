const taskSubNav = [
  {
    title: 'Task Guidelines',
    id: 'task-guidelines',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/task/task-guidelines',
    visible: true
  },
  {
    title: 'Task Properties',
    id: 'task-properties',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/task/task-properties',
    visible: true
  }
];

export default taskSubNav;
