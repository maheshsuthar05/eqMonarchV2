const SettingsSubNav = [
    {
      id: 'nav_workstation_configurations',
      title: 'Workstation Configurations',
      type: 'item',
      url:
        '/admin/tenant/<%= tenantId %>/settings/workstation-configuration',
      visible: true
    },   
    {
      id: 'nav_manage_workflow_settings',
      title: 'Manage Workflow Settings',
      type: 'item',
      url: '/admin/tenant/<%= tenantId %>/settings/manage-workflow-setting',
      visible: true
    },
    {
      id: 'nav_manage_set_reserve_price',
      title: 'Manage Set Reserve Price',
      type: 'item',
      url: '/admin/tenant/<%= tenantId %>/settings/manage-set-reserve-price',
      visible: true
    },
    {
      id: 'nav_state_appriasal',
      title: 'State appriasal',
      type: 'item',
      url: '/admin/tenant/<%= tenantId %>/settings/state-appriasal',
      visible: true
    }
  ];
  
  export default SettingsSubNav;
  