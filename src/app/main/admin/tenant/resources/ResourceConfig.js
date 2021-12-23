const resourceConfig = {
  route: 'property',
  conifugartion: [
    {
      pageName: 'property',
      pathName: '/admin/tenant',
      public: false,
      resources: [
        {
          key: 'Tenant_Admin_Tab_Property',
          display: 'Property',
          description: 'Tenant_Admin_Tab_Property'
        }
      ]
    }
  ]
};
export default resourceConfig;

export const resourceKeys = {
  Tenant_Admin_Tab_Property: 'Tenant_Admin_Tab_Property',
};
