import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

function NewOperationPage() {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [{ i: 'OperationPage', w: 12, h: 12, x: 0, y: 0, minW: 4, minH: 4 }],
      md: [{ i: 'OperationPage', w: 10, h: 12, x: 0, y: 0, minW: 4, minH: 4 }],
      sm: [{ i: 'OperationPage', w: 6, h: 12, x: 0, y: 0, minW: 4, minH: 4 }],
      xs: [{ i: 'OperationPage', w: 4, h: 12, x: 0, y: 0, minW: 4, minH: 4 }]
    },
    components: ['OperationPage']
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
      header={''}
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
}

export default NewOperationPage;
