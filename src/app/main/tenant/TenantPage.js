import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MonarchGridLayout from '@monarch/core/MonarchGridLayout/MonarchGridLayout.js';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function Tenant(props) {
  const classes = useStyles(props);

  const config = {
    layouts: {
      lg: [
        {
          w: 6,
          h: 4,
          x: 0,
          y: 0,
          i: 'TenantDetails',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 6,
          x: 0,
          y: 4,
          i: 'TenantIAMGroups',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 10,
          x: 6,
          y: 0,
          i: 'TenantUserListPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 7,
          x: 0,
          y: 10,
          i: 'TenantIAMRoles',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 7,
          x: 6,
          y: 10,
          i: 'TenantIAMPrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 9,
          x: 6,
          y: 17,
          i: 'TenantIAMDataMasking',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 9,
          x: 0,
          y: 17,
          i: 'TenantIAMRolePrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      md: [
        {
          w: 6,
          h: 4,
          x: 0,
          y: 0,
          i: 'TenantDetails',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 4,
          x: 0,
          y: 8,
          i: 'TenantIAMGroups',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 8,
          x: 6,
          y: 0,
          i: 'TenantUserListPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 4,
          x: 0,
          y: 4,
          i: 'TenantIAMRoles',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 4,
          x: 6,
          y: 8,
          i: 'TenantIAMPrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 4,
          x: 6,
          y: 12,
          i: 'TenantIAMDataMasking',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 4,
          x: 0,
          y: 12,
          i: 'TenantIAMRolePrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      sm: [
        {
          w: 6,
          h: 4,
          x: 0,
          y: 0,
          i: 'TenantDetails',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 4,
          i: 'TenantIAMGroups',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 20,
          i: 'TenantUserListPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 9,
          i: 'TenantIAMRoles',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 6,
          x: 0,
          y: 25,
          i: 'TenantIAMPrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 6,
          x: 0,
          y: 14,
          i: 'TenantIAMDataMasking',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 6,
          h: 5,
          x: 0,
          y: 31,
          i: 'TenantIAMRolePrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ],
      xs: [
        {
          w: 4,
          h: 4,
          x: 0,
          y: 0,
          i: 'TenantDetails',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 6,
          x: 0,
          y: 4,
          i: 'TenantIAMGroups',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 6,
          x: 0,
          y: 10,
          i: 'TenantUserListPage',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 6,
          x: 0,
          y: 16,
          i: 'TenantIAMRoles',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 5,
          x: 0,
          y: 22,
          i: 'TenantIAMPrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 6,
          x: 0,
          y: 27,
          i: 'TenantIAMDataMasking',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        },
        {
          w: 4,
          h: 7,
          x: 0,
          y: 33,
          i: 'TenantIAMRolePrivilege',
          minW: 4,
          minH: 4,
          moved: false,
          static: false
        }
      ]
    },
    components: [
      'TenantDetails',
      'TenantIAMGroups',
      'TenantUserListPage',
      'TenantIAMRoles',
      'TenantIAMPrivilege',
      'TenantIAMDataMasking',
      'TenantIAMRolePrivilege'
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
}

export default Tenant;
