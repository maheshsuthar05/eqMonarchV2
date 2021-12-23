const DecisionRulesSubNav = [
  {
    id: 'approval -rules',
    title: 'Rule Management',
    type: 'item',
    url: 'approval-rules',
    visible: true
  },
  // {
  //   id: 'nav_user_load_balance',
  //   title: 'User Load Balance',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/user-load-balance',
  //   visible: false
  // },
  // {
  //   id: 'nav_team_roles',
  //   title: 'Team Roles',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/team-role',
  //   visible: false
  // },
  // {
  //   id: 'nav_state_role_assignment',
  //   title: 'State/Role Assignment',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/role-assignment',
  //   visible: false
  // },
  {
    id: 'nav_state_eviction',
    title: 'State Eviction',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/decision-rule/state-eviction',
    visible: true
  },
  {
    id: 'nav_manage_commission',
    title: 'Manage Commission',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/decision-rule/manage-commission',
    visible: true
  },
  // {
  //   id: 'nav_workstation_configurations',
  //   title: 'Workstation Configurations',
  //   type: 'item',
  //   url:
  //     '/admin/tenant/<%= tenantId %>/decision-rule/workstation-configuration',
  //   visible: false
  // },
  {
    id: 'nav_manage_valuations',
    title: 'Manage Valuations',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/decision-rule/manage-valuation',
    visible: true
  },
  {
    id: 'nav_manage_timelines',
    title: 'Manage Timelines',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/decision-rule/manage-timeline',
    visible: true
  },
  // {
  //   id: 'nav_manage_workflow_settings',
  //   title: 'Manage Workflow Settings',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/manage-workflow-setting',
  //   visible: false
  // },
  // {
  //   id: 'nav_manage_set_reserve_price',
  //   title: 'Manage Set Reserve Price',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/manage-set-reserve-price',
  //   visible: false
  // },
  // {
  //   id: 'nav_state_appriasal',
  //   title: 'State appriasal',
  //   type: 'item',
  //   url: '/admin/tenant/<%= tenantId %>/decision-rule/state-appriasal',
  //   visible: false
  // }
];

export default DecisionRulesSubNav;
