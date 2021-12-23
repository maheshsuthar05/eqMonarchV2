const resourceConfig = {
  route: 'mail',
  conifugartion: [
    {
      pageName: 'mail',
      pathName: '/mail',
      public: false,
      resources: []
    },
    {
      pageName: 'inbox',
      pathName: '/mail/inbox',
      public: false,
      resources: []
    },
    {
      pageName: 'filter',
      pathName: '/mail/filter',
      public: false,
      resources: []
    },
    {
      pageName: 'sent',
      pathName: '/mail/sent',
      public: false,
      resources: []
    }
    
  ]
};
export default resourceConfig;