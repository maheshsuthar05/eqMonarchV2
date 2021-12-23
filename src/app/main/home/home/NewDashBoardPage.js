import { makeStyles } from '@material-ui/core';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout';
import AdvanceSearchApp from 'app/main/advance-search/AdvanceSearchApp';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const NewDashboardPage = () => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 4,
          h: 5,
          x: 0,
          y: 0,
          i: 'PropertyByReagion',
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          w: 4,
          h: 5,
          x: 4,
          y: 0,
          i: 'TaskByPhase',
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          w: 4,
          h: 5,
          x: 8,
          y: 0,
          i: 'TaskByPhaseAndProcess',
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          w: 12,
          h: 10,
          x: 0,
          y: 5,
          i: 'TaskActiveDetails',
          moved: false,
          isDraggable: false,
          isResizable: false
        }
      ],
      md: [
        {
          w: 5,
          h: 4,
          x: 0,
          y: 0,
          i: 'PropertyByReagion',
          moved: false
          // isDraggable: true
        },
        {
          w: 5,
          h: 4,
          x: 5,
          y: 0,
          i: 'TaskByPhase',
          moved: false
          // isDraggable: true
        },
        {
          w: 10,
          h: 6,
          x: 0,
          y: 4,
          i: 'TaskByPhaseAndProcess',
          moved: false
          // isDraggable: true
        },
        {
          w: 10,
          h: 7,
          x: 0,
          y: 10,
          i: 'TaskActiveDetails',
          moved: false
          // isDraggable: true
        }
      ],
      sm: [
        {
          i: 'PropertyByReagion',
          w: 10,
          h: 4,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskByPhase',
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskByPhaseAndProcess',
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskActiveDetails',
          w: 6,
          h: 5,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        }
      ],
      xs: [
        {
          i: 'PropertyByReagion',
          w: 10,
          h: 4,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskByPhase',
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskByPhaseAndProcess',
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        },
        {
          i: 'TaskActiveDetails',
          w: 4,
          h: 4,
          x: 0,
          y: 0,
          moved: false,
          isDraggable: false,
          isResizable: false
        }
      ]
    },
    components: [
      'PropertyByReagion',
      'TaskByPhase',
      'TaskByPhaseAndProcess',
      'TaskActiveDetails'
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
      header={<AdvanceSearchApp />}
      config={fn.onLayoutChange()}
      {...fn}
    />
  );
};

export default NewDashboardPage;
