import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const DecisionRulesPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 5,
          x: 0,
          y: 0,
          i: 'RulePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 12,
          h: 6,
          x: 0,
          y: 5,
          i: 'StateEvictionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 12,
          x: 6,
          y: 11,
          i: 'ManageCommissionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 12,
          x: 0,
          y: 11,
          i: 'ManageValuationPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
        // {
        //   w: 6,
        //   h: 6,
        //   x: 0,
        //   y: 17,
        //   i: 'ManageTimelinePage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // }
      ],
      md: [
        {
          w: 10,
          h: 7,
          x: 0,
          y: 0,
          i: 'RulePage',
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
          i: 'StateEvictionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 14,
          x: 5,
          y: 14,
          i: 'ManageCommissionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 14,
          x: 0,
          y: 14,
          i: 'ManageValuationPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
        // {
        //   w: 5,
        //   h: 7,
        //   x: 0,
        //   y: 21,
        //   i: 'ManageTimelinePage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // }
      ],
      sm: [
        {
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          i: 'RulePage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 7,
          x: 0,
          y: 6,
          i: 'StateEvictionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 7,
          x: 0,
          y: 13,
          i: 'ManageCommissionPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 7,
          x: 0,
          y: 20,
          i: 'ManageValuationPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
        // {
        //   w: 6,
        //   h: 7,
        //   x: 0,
        //   y: 27,
        //   i: 'ManageTimelinePage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // }
      ],
      xs: [
        {
          w: 4,
          h: 5,
          x: 0,
          y: 0,
          i: 'RulePage',
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
          i: 'StateEvictionPage',
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
          i: 'ManageCommissionPage',
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
          i: 'ManageValuationPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
        // {
        //   w: 4,
        //   h: 5,
        //   x: 0,
        //   y: 20,
        //   i: 'ManageTimelinePage',
        //   minW: 4,
        //   minH: 4,
        //   moved: false,
        //   static: false
        // }
      ]
    },
    components: [
      'RulePage',
      'StateEvictionPage',
      'ManageCommissionPage',
      'ManageValuationPage'
      // 'ManageTimelinePage'
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

export default DecisionRulesPage;
