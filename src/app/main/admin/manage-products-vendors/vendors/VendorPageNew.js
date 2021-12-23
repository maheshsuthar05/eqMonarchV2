import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';
import VendorHeaderPage from './VendorHeaderPage';

const useStyles = makeStyles({
  layoutRoot: {
    '& .MuiPaper-rounded': {
      boxShadow: 'none'
    }
  }
});

function Vendor() {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 11,
          x: 0,
          y: 0,
          i: 'VendorsPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 11,
          x: 0,
          y: 0,
          i: 'VendorsPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 11,
          x: 0,
          y: 0,
          i: 'VendorsPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 11,
          x: 0,
          y: 0,
          i: 'VendorsPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: ['VendorsPage']
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
      header={<VendorHeaderPage />}
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default Vendor;
