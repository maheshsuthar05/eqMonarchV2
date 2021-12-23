import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const AccessManagementPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 6,
          x: 0,
          y: 0,
          i: 'MICompaniesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 8,
          h: 8,
          x: 0,
          y: 6,
          i: 'InvestorPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 8,
          y: 6,
          i: 'InvestorGroupPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 5,
          x: 0,
          y: 0,
          i: 'MICompaniesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 7,
          x: 5,
          y: 5,
          i: 'InvestorPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 7,
          x: 0,
          y: 5,
          i: 'InvestorGroupPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 5,
          x: 0,
          y: 0,
          i: 'MICompaniesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 10,
          i: 'InvestorPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 5,
          i: 'InvestorGroupPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 5,
          x: 0,
          y: 0,
          i: 'MICompaniesPage',
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
          i: 'InvestorPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 5,
          x: 0,
          y: 10,
          i: 'InvestorGroupPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: ['MICompaniesPage', 'InvestorPage', 'InvestorGroupPage']
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

export default AccessManagementPage;
