const resourceConfig = {
  route: 'home',
  conifugartion: [
    {
      pageName: 'dashboard',
      pathName: '/home/dashboard',
      public: true,
      resources: [
        {
          key: 'Navigation_Compliance',
          display: 'Compliance',
          description: 'Navigation_Compliance'
        },
        {
          key: 'Navigation_Compliance_DataStudio',
          display: 'Data Studio',
          description: 'Navigation_Compliance_DataStudio'
        },
        {
          key: 'Navigation_Compliance_DelinquencySnapshot',
          display: 'Delinquency Snapshot',
          description: 'Navigation_Compliance_DelinquencySnapshot'
        },
        {
          key: 'Navigation_Compliance_Foreclosure',
          display: 'Foreclosure',
          description: 'Navigation_Compliance_Foreclosure'
        },
        {
          key: 'Navigation_Compliance_LossMitigationEfforts',
          display: 'Loss Mitigation Efforts',
          description: 'Navigation_Compliance_LossMitigationEfforts'
        },
        {
          key: 'Navigation_Compliance_NoncompliantProperties',
          display: 'Non compliant Properties',
          description: 'Navigation_Compliance_NoncompliantProperties'
        },
        {
          key: 'Navigation_Compliance_PPIAudit',
          display: 'PPI Audit',
          description: 'Navigation_Compliance_PPIAudit'
        },
        {
          key: 'Navigation_Compliance_ProcessAudit',
          display: 'Process Audit',
          description: 'Navigation_Compliance_ProcessAudit'
        },
        {
          key: 'Navigation_Compliance_RolesandPermissionAudit',
          display: 'Roles and Permission Audit',
          description: 'Navigation_Compliance_RolesandPermissionAudit'
        },
        {
          key: 'Navigation_Configuration',
          display: 'Configuration',
          description: 'Navigation_Configuration'
        },
        {
          key: 'Navigation_Configuration_BusinessProcessDesign',
          display: 'Business Process Design',
          description: 'Navigation_Configuration_BusinessProcessDesign'
        },
        {
          key: 'Navigation_Configuration_Diagnostics',
          display: 'Diagnostics',
          description: 'Navigation_Configuration_Diagnostics'
        },
        {
          key: 'Navigation_Configuration_IdentityAccessManagement',
          display: 'Identity Access Management',
          description: 'Navigation_Configuration_IdentityAccessManagement'
        },
        {
          key: 'Navigation_Configuration_Integrations',
          display: 'Integrations',
          description: 'Navigation_Configuration_Integrations'
        },
        {
          key: 'Navigation_Configuration_SLA',
          display: 'SLA',
          description: 'Navigation_Configuration_SLA'
        },
        {
          key: 'Navigation_Configuration_TenantAdmin',
          display: 'Tenant Admin',
          description: 'Navigation_Configuration_TenantAdmin'
        },
        {
          key: 'Navigation_Configuration_ThemePalette',
          display: 'Theme Palette',
          description: 'Navigation_Configuration_ThemePalette'
        },
        {
          key: 'Navigation_Configuration_UserPreferences',
          display: 'User Preferences',
          description: 'Navigation_Configuration_UserPreferences'
        },
        {
          key: 'Navigation_Home',
          display: 'Home',
          description: 'Navigation_Home'
        },
        {
          key: 'Navigation_Marketplace',
          display: 'Marketplace',
          description: 'Navigation_Marketplace'
        },
        {
          key: 'Navigation_Marketplace_AgentApprovalMetrics',
          display: 'Agent Approval Metrics',
          description: 'Navigation_Marketplace_AgentApprovalMetrics'
        },
        {
          key: 'Navigation_Marketplace_AgentSearch',
          display: 'Agent Search',
          description: 'Navigation_Marketplace_AgentSearch'
        },
        {
          key: 'Navigation_Marketplace_Invocing_Billing',
          display: 'Invocing & Billing',
          description: 'Navigation_Marketplace_Invocing_Billing'
        },
        {
          key: 'Navigation_Marketplace_OrderManagement',
          display: 'Order Management',
          description: 'Navigation_Marketplace_OrderManagement'
        },
        {
          key: 'Navigation_Marketplace_PartnershipManagement',
          display: 'Partnership Management',
          description: 'Navigation_Marketplace_PartnershipManagement'
        },
        {
          key: 'Navigation_Marketplace_VendorProfile',
          display: 'Vendor Profile',
          description: 'Navigation_Marketplace_VendorProfile'
        },
        {
          key: 'Navigation_Marketplace_VendorRegistration',
          display: 'Vendor Registration',
          description: 'Navigation_Marketplace_VendorRegistration'
        },
        {
          key: 'Navigation_Platform',
          display: 'Platform',
          description: 'Navigation_Platform'
        },
        {
          key: 'Navigation_Platform_OnboardTenant',
          display: 'Onboard Tenant',
          description: 'Navigation_Platform_OnboardTenant'
        },
        {
          key: 'Navigation_Platform_Platform',
          display: 'Platform',
          description: 'Navigation_Platform_Platform'
        },
        {
          key: 'Navigation_Platform_TenantSystemAdmin',
          display: 'Tenant System Admin',
          description: 'Navigation_Platform_TenantSystemAdmin'
        },
        {
          key: 'Navigation_Servicer_Workspace',
          display: 'Servicer Workspace',
          description: 'Navigation_Servicer_Workspace'
        },
        {
          key: 'Navigation_Servicer_Workspace_AddProperty',
          display: 'Add Property',
          description: 'Navigation_Servicer_Workspace_AddProperty'
        },
        {
          key: 'Navigation_Servicer_Workspace_Dashboards',
          display: 'Dashboards',
          description: 'Navigation_Servicer_Workspace_Dashboards'
        },
        {
          key: 'Navigation_Servicer_Workspace_Mail',
          display: 'Mail',
          description: 'Navigation_Servicer_Workspace_Mail'
        },
        {
          key: 'Navigation_Servicer_Workspace_Offers',
          display: 'Offers',
          description: 'Navigation_Servicer_Workspace_Offers'
        },
        {
          key: 'Navigation_Servicer_Workspace_PropertyView',
          display: 'Property View',
          description: 'Navigation_Servicer_Workspace_PropertyView'
        },
        {
          key: 'Navigation_Servicer_Workspace_TaskManagement',
          display: 'Task Management',
          description: 'Navigation_Servicer_Workspace_TaskManagement'
        },
        {
          key: 'Navigation_Servicer_Workspace_UserAccounts',
          display: 'User Accounts',
          description: 'Navigation_Servicer_Workspace_UserAccounts'
        },
        {
          key: 'Navigation_Servicer_Workspace_DecisionRules',
          display: 'Business Rules',
          description: 'Navigation Servicer Workspace BusinessRules'
        },
        {
          key: 'Navigation_MarketPlace_ManageProducts',
          display: 'Manage Products',
          description: 'Navigation_MarketPlace_ManageProducts'
        },
        {
          key: 'Navigation_MarketPlace_ManageVendors',
          display: 'Manage Vendors',
          description: 'Navigation_MarketPlace_ManageVendors'
        },
        {
          key: 'Navigation_Configuration_Business_Process_Control',
          display: 'Business Process Control',
          description: 'Navigation_Configuration_Business_Process_Control'
        }
      ]
    }
  ]
};
export default resourceConfig;
