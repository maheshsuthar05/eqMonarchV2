import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const TaskPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 12,
          x: 0,
          y: 0,
          i: 'TaskPropertiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: true
        }
      ],
      md: [
        {
          w: 10,
          h: 12,
          x: 0,
          y: 0,
          i: 'TaskPropertiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: true
        }
      ],
      sm: [
        {
          w: 6,
          h: 12,
          x: 0,
          y: 0,
          i: 'TaskPropertiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: true
        }
      ],
      xs: [
        {
          w: 4,
          h: 12,
          x: 0,
          y: 0,
          i: 'TaskPropertiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: true
        }
      ]
    },
    components: ['TaskPropertiesPage']
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

export default TaskPage;
