import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';
import HeaderPage from './details/AgentDetailsHeader';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function VendorPage(props) {
  const classes = useStyles(props);

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 12,
          x: 0,
          y: 0,
          i: 'ProfilePage',
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
          i: 'ProfilePage',
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
          i: 'ProfilePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 10,
          x: 0,
          y: 0,
          i: 'ProfilePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: ['ProfilePage']
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
          <HeaderPage />
        </>
      }
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default VendorPage;
