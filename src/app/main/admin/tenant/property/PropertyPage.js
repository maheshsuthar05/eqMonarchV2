import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles({
  layoutRoot: {}
});

const PropertyPage = (props) => {
  const classes = useStyles();

  const config = {
    layouts: {
      lg: [
        {
          w: 12,
          h: 8,
          x: 0,
          y: 0,
          i: 'StateRoleAssignmentPage',
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
          i: 'DefaultRolesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 4,
          y: 6,
          i: 'TeamRolesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 0,
          y: 6,
          i: 'LegalEntitiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 10,
          h: 6,
          x: 0,
          y: 0,
          i: 'StateRoleAssignmentPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 12,
          x: 5,
          y: 6,
          i: 'DefaultRolesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 7,
          x: 0,
          y: 6,
          i: 'TeamRolesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 5,
          h: 5,
          x: 0,
          y: 13,
          i: 'LegalEntitiesPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          i: 'StateRoleAssignmentPage',
          w: 6,
          h: 6,
          x: 0,
          y: 0,
          minW: 4,
          minH: 4
        },
        { i: 'DefaultRolesPage', w: 6, h: 6, x: 0, y: 6, minW: 4, minH: 4 },
        {
          i: 'TeamRolesPage',
          w: 6,
          h: 6,
          x: 0,
          y: 18,
          minW: 4,
          minH: 4
        },
        {
          i: 'LegalEntitiesPage',
          w: 6,
          h: 6,
          x: 0,
          y: 12,
          minW: 4,
          minH: 4
        }
      ],
      xs: [
        {
          i: 'StateRoleAssignmentPage',
          w: 4,
          h: 6,
          x: 0,
          y: 0,
          minW: 4,
          minH: 4
        },
        { i: 'DefaultRolesPage', w: 4, h: 6, x: 0, y: 4, minW: 4, minH: 4 },
        {
          i: 'TeamRolesPage',
          w: 4,
          h: 6,
          x: 0,
          y: 8,
          minW: 4,
          minH: 4
        },
        {
          i: 'LegalEntitiesPage',
          w: 4,
          h: 6,
          x: 0,
          y: 10,
          minW: 4,
          minH: 4
        }
      ]
    },
    components: [
      'StateRoleAssignmentPage',
      'DefaultRolesPage',
      'TeamRolesPage',
      'LegalEntitiesPage'
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

export default PropertyPage;
