import { resourceKeys } from 'app/main/tenant/resources/ResourceConfig';
const TenantNavigation = {
  id: 'tenant',
  title: 'tenant',
  type: 'group',
  icon: 'star',
  children: [
    {
      id: resourceKeys.Tenant_Tab_Details,
      title: 'Details',
      type: 'item',
      url: `/tenant/details/<%= userType %>/details`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_Users,
      title: 'Users',
      type: 'item',
      url: `/tenant/details/<%= userType %>/users`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_Property_Roles,
      title: 'Property Roles',
      type: 'item',
      url: `/tenant/details/<%= userType %>/property-roles`,
      visible: true,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_Resource_Privileges,
      title: 'Resource Privileges',
      type: 'item',
      url: `/tenant/details/<%= userType %>/privileges`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_Access_Groups,
      title: 'Access Group',
      type: 'item',
      url: `/tenant/details/<%= userType %>/roles`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_IAM_Audit,
      title: 'IAM Audit',
      type: 'item',
      url: `/tenant/details/<%= userType %>/compliance-check`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_Access_Group_Privileges,
      title: 'Access Group Privileges',
      type: 'item',
      url: `/tenant/details/<%= userType %>/role-privilege-deatils`,
      visible: false,
      disabled: false
    },
    {
      id: resourceKeys.Tenant_Tab_DataMasking,
      title: 'Data Masking',
      type: 'item',
      url: `/tenant/details/<%= userType %>/data-masking`,
      visible: false,
      disabled: false
    }
  ]
};

export default TenantNavigation;
