import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';
import DashboardPage from './dashboard/DashboardPage';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function VendorPage(props) {
  const classes = useStyles(props);

  const config = {
    layouts: {
      lg: [
        {
          w: 6,
          h: 12,
          x: 0,
          y: 0,
          i: 'ProfilePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 12,
          x: 6,
          y: 0,
          i: 'VendorServicesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 8,
          x: 0,
          y: 0,
          i: 'ProfilePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 10,
          h: 9,
          x: 0,
          y: 8,
          i: 'VendorServicesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 8,
          x: 0,
          y: 0,
          i: 'ProfilePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 8,
          x: 0,
          y: 8,
          i: 'VendorServicesPage',
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
          i: 'ProfilePage',
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
          i: 'VendorServicesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: ['ProfilePage', 'VendorServicesPage']
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
      header={
        <>
          <DashboardPage />
        </>
      }
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default VendorPage;
