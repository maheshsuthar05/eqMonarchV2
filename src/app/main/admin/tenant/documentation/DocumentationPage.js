import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const DocumentationPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 12,
          x: 0,
          y: 0,
          i: 'LenderLibraryPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 12,
          x: 0,
          y: 0,
          i: 'LenderLibraryPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 12,
          x: 0,
          y: 0,
          i: 'LenderLibraryPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 12,
          x: 0,
          y: 0,
          i: 'LenderLibraryPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: ['LenderLibraryPage']
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

export default DocumentationPage;
