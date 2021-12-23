const resourceConfig = {
  route: 'tenant',
  conifugartion: [
    {
      pageName: 'details',
      pathName: '/tenant/details',
      public: false,
      resources: [
        {
          key: 'Tenant_Tab_Details',
          display: 'Details',
          description: 'Tenant_Tab_Details'
        },
        {
          key: 'Tenant_Tab_Completed_Tasks',
          display: 'Completed Task',
          description: 'Tenant_Tab_Completed_Tasks'
        },
        {
          key: 'Tenant_Tab_Open_Tasks',
          display: 'Open Task',
          description: 'Tenant_Tab_Open_Tasks'
        },
        {
          key: 'Tenant_Tab_Users',
          display: 'Users',
          description: 'Tenant_Tab_Users'
        },
        {
          key: 'Tenant_Tab_Property_Roles',
          display: 'Property Roles',
          description: 'Tenant_Tab_Property_Roles'
        },
        {
          key: 'Tenant_Tab_Resource_Privileges',
          display: 'Resource Privileges',
          description: 'Tenant_Tab_Resource_Privileges'
        },
        {
          key: 'Tenant_Tab_Access_Groups',
          display: 'Access Groups',
          description: 'Tenant_Tab_Access_Groups'
        },
        {
          key: 'Tenant_Tab_IAM_Audit',
          display: 'IAM Audit',
          description: 'Tenant_Tab_IAM_Audit'
        },
        {
          key: 'Tenant_Tab_Access_Group_Privileges',
          display: 'Access Group Privileges',
          description: 'Tenant_Tab_Access_Group_Privileges'
        },
        {
          key: 'Tenant_Tab_DataMasking',
          display: 'Data Masking',
          description: 'Tenant_Tab_DataMasking'
        }
      ]
    },
    {
      pageName: 'list',
      pathName: '/tenant/list',
      public: false,
      resources: []
    },
    {
      pageName: 'create',
      pathName: '/tenant/create',
      public: false,
      resources: []
    }
  ]
};
export default resourceConfig;

export const resourceKeys = {
  Tenant_Tab_Details: 'Tenant_Tab_Details',
  Tenant_Tab_Completed_Tasks: 'Tenant_Tab_Completed_Tasks',
  Tenant_Tab_Open_Tasks: 'Tenant_Tab_Open_Tasks',
  Tenant_Tab_Users: 'Tenant_Tab_Users',
  Tenant_Tab_Property_Roles: 'Tenant_Tab_Property_Roles',
  Tenant_Tab_Resource_Privileges: 'Tenant_Tab_Resource_Privileges',
  Tenant_Tab_Access_Groups: 'Tenant_Tab_Access_Groups',
  Tenant_Tab_IAM_Audit: 'Tenant_Tab_IAM_Audit',
  Tenant_Tab_Access_Group_Privileges: 'Tenant_Tab_Access_Group_Privileges',
  Tenant_Tab_DataMasking: 'Tenant_Tab_DataMasking',
};
