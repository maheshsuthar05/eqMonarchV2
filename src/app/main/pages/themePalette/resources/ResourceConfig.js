const resourceConfig = {
  route: 'configuration',
  conifugartion: [
    {
      pageName: 'themeSetting',
      pathName: '/configuration/themeSetting',
      public: false,
      resources: [
        {
          key: 'Navigation_Configuration_Theme_Palette_Icon',
          display: 'Theme Palette',
          description: 'Navigation_Configuration_Theme_Palette_Icon'
        },
        {
          key: 'Navigation_Configuration_Theme_Palette_Page',
          display: 'Theme Palette page',
          description: 'Navigation_Configuration_Theme_Palette_Page'
        }
      ]
    }
  ]
};
export default resourceConfig;
