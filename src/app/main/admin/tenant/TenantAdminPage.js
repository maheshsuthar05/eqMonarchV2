import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

function TenantAdminPage() {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        { i: 'DecisionRulesPage', w: 12, h: 4, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'DocumentationPage', w: 8, h: 4, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'PropertyAdminPage', w: 4, h: 8, x: 8, y: 0, minW: 4, minH: 4 },
        {
          i: 'SettingsPage',
          w: 8,
          h: 4,
          x: 0,
          y: 4,
          minW: 4,
          minH: 4
        },
        { i: 'AccessManagementPage', w: 4, h: 4, x: 0, y: 8, minW: 4, minH: 4 }
      ],
      md: [
        { i: 'DecisionRulesPage', w: 12, h: 4, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'DocumentationPage', w: 4, h: 4, x: 6, y: 0, minW: 4, minH: 4 },
        { i: 'PropertyAdminPage', w: 3, h: 6, x: 0, y: 0, minW: 4, minH: 4 },
        {
          i: 'SettingsPage',
          w: 3,
          h: 4,
          x: 3,
          y: 0,
          minW: 4,
          minH: 4
        },
        { i: 'AccessManagementPage', w: 4, h: 4, x: 6, y: 2, minW: 4, minH: 4 }
      ],
      sm: [
        { i: 'DecisionRulesPage', w: 6, h: 2, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'DocumentationPage', w: 3, h: 2, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'PropertyAdminPage', w: 3, h: 2, x: 3, y: 0, minW: 4, minH: 4 },
        {
          i: 'SettingsPage',
          w: 3,
          h: 2,
          x: 0,
          y: 0,
          minW: 4,
          minH: 4
        },
        { i: 'AccessManagementPage', w: 3, h: 2, x: 3, y: 2, minW: 4, minH: 4 }
      ],
      xs: [
        { i: 'DecisionRulesPage', w: 4, h: 2, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'DocumentationPage', w: 4, h: 2, x: 0, y: 0, minW: 4, minH: 4 },
        { i: 'PropertyAdminPage', w: 4, h: 2, x: 0, y: 0, minW: 4, minH: 4 },
        {
          i: 'SettingsPage',
          w: 4,
          h: 2,
          x: 0,
          y: 0,
          minW: 4,
          minH: 4
        },
        { i: 'AccessManagementPage', w: 4, h: 2, x: 0, y: 0, minW: 4, minH: 4 }
      ]
    },
    components: [
      'DecisionRulesPage',
      'DocumentationPage',
      'PropertyAdminPage',
      'SettingsPage',
      'AccessManagementPage'
    ]
  };

  const fn = {
    onLayoutChange: () => {
      return config;
    }
  };

  return (
    <MonarchGridLayout
      classes={{
        root: classes.layoutRoot
      }}
      header={<></>}
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default TenantAdminPage;
