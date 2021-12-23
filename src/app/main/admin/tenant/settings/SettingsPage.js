import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const SettingsPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        // {
        //   w: 6,
        //   h: 6,
        //   x: 0,
        //   y: 13,
        //   i: 'WorkstationConfigurationPage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // },
        {
          w: 12,
          h: 6,
          x: 0,
          y: 0,
          i: 'ManageWorkflowSettingPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 12,
          h: 7,
          x: 0,
          y: 6,
          i: 'ManageSetReservePricePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 12,
          h: 6,
          x: 6,
          y: 13,
          i: 'StateAppriasalPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        // {
        //   w: 5,
        //   h: 6,
        //   x: 0,
        //   y: 14,
        //   i: 'WorkstationConfigurationPage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // },
        {
          w: 10,
          h: 7,
          x: 0,
          y: 0,
          i: 'ManageWorkflowSettingPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 10,
          h: 7,
          x: 0,
          y: 7,
          i: 'ManageSetReservePricePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 6,
          x: 5,
          y: 14,
          i: 'StateAppriasalPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        // {
        //   w: 6,
        //   h: 6,
        //   x: 0,
        //   y: 12,
        //   i: 'WorkstationConfigurationPage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // },
        {
          w: 6,
          h: 7,
          x: 0,
          y: 0,
          i: 'ManageWorkflowSettingPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 7,
          i: 'ManageSetReservePricePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 18,
          i: 'StateAppriasalPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        // {
        //   w: 4,
        //   h: 5,
        //   x: 0,
        //   y: 10,
        //   i: 'WorkstationConfigurationPage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // },
        {
          w: 4,
          h: 5,
          x: 0,
          y: 0,
          i: 'ManageWorkflowSettingPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 5,
          x: 0,
          y: 5,
          i: 'ManageSetReservePricePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 5,
          x: 0,
          y: 15,
          i: 'StateAppriasalPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: [
      // 'WorkstationConfigurationPage',
      'ManageWorkflowSettingPage',
      'ManageSetReservePricePage',
      'StateAppriasalPage'
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
};

export default SettingsPage;
