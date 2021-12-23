const resourceConfig = {
  route: 'admin',
  conifugartion: [
    {
      pageName: 'tenant',
      pathName: '/admin/tenant',
      public: false,
      resources: []
    }
  ]
};

export default resourceConfig;

export const resourceManageProducts = {
  route: 'manage',
  conifugartion: [
    {
      pageName: 'manage',
      pathName: '',
      public: false,
      resources: []
    },
    {
      pageName: 'products',
      pathName: '/manage/products',
      public: false,
      resources: []
    }
  ]
};

export const resourceManageVendors = {
  route: 'manage-vendors',
  conifugartion: [
    {
      pageName: 'manage-vendor',
      pathName: '/manage-vendor',
      public: false,
      resources: []
    },
    {
      pageName: 'details',
      pathName: '/manage-vendor/details',
      public: false,
      resources: []
    }
  ]
};
