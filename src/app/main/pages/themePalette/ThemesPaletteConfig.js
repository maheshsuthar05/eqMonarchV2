import React from 'react';

const ThemesPaletteConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/configuration/themeSetting',
      component: React.lazy(() => import('./ThemesPalettePage'))
    }
  ]
};

export default ThemesPaletteConfig;