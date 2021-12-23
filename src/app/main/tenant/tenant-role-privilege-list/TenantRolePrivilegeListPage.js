import FuseLoading from '@fuse/core/FuseLoading';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import useIsMounted from 'app/common/hooks/useIsMounted';
import {
  fetchTenantResourceListStart,
  fetchTenantRoleListStart,
  setTenantRolePrivilegeDataForEditStart,
  tenantGetStart
} from 'app/main/tenant/store/actions';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TenantRolePrivilegePage from '../tenant-role-privilege/TenantRolePrivilegePage';
import { truncateString, contextInfo } from 'app/common/helpers/common-helper';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import { IoAddCircleOutline } from 'react-icons/io5';
import { openModal } from 'app/store/actions';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      background: 'none'
    },
    '& .MuiTableCell-stickyHeader': {
      background: 'none'
    }
  },
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      fontSize: '0.875rem',
      color: theme.palette.primary.valueTextColor,
      borderBottom: '1px solid #e5e5e5'
    },
    '& .MuiTableCell-head': {
      fontWeight: '500',
      color: theme.palette.primary.labelTextColor
    }
  },
  content: {
    backgroundColor: theme.palette.background.paper
  },
  layoutRoot: {},
  addRole: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  editRoleIcon: {
    cursor: 'pointer',
    paddingLeft: '8px'
  },
  addRoleIcon: {
    cursor: 'pointer',
    paddingLeft: '4px'
  },
  settingsIcon: {
    cursor: 'pointer',
    paddingLeft: '4px'
  },
  container: {
    maxHeight: '100%'
  },
  sticky: {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.background.paper
  },
  stickyPermissionHeaderCell: {
    position: 'sticky',
    left: 0,
    zIndex: 3
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  },
  popupScroll: {
    display: 'flex',
    maxHeight: 'calc(100% - 64px)',
    justifyContent: 'center',
    minWidth: '100%'
  },
  iconColor: {
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
    cursor: 'pointer'
  }
}));

const TenantRolePrivilegeListPage = (props) => {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const [rolePrivilegeMatrixData, setRolePrivilegeMatrixData] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonAction, setButtonAction] = useState(null);
  const [reLoad, setReLoad] = useState(false);

  const resourceLoading = useSelector(
    ({ tenant }) => tenant.resourceList.resourceList.loading
  );
  const roleLoading = useSelector(
    ({ tenant }) => tenant.roleList.roleList.loading
  );
  const resourcesData = useSelector(
    ({ tenant }) => tenant.resourceList.resourceList.data
  );
  const rolesData = useSelector(({ tenant }) => tenant.roleList.roleList.data);

  const tenantListLoaded = useSelector(
    ({ tenant }) => tenant.tenantGet.stateAction
  );

  const buttonActions = {
    editRole: 'EDITROLE',
    addRole: 'ADDROLE'
  };

  const RolePrivilegeData = useCallback((roles, resources) => {
    let rolePrivilegeData = {
      heading: [{ name: 'Privilege' }],
      data: []
    };
    roles.map((role) => {
      rolePrivilegeData.heading.push({ ...role });
      return role;
    });

    resources.map((resource) => {
      rolePrivilegeData.data.push(DataRow(resource, roles));
      return resource;
    });
    setRolePrivilegeMatrixData(rolePrivilegeData);
  }, []);

  const loadRolePrivilege = useCallback(() => {
    dispatch(fetchTenantRoleListStart(contextInfo().tenantCode));
    dispatch(fetchTenantResourceListStart(contextInfo().tenantCode));
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(tenantGetStart());
    }
  }, [dispatch, isMounted]);

  useEffect(() => {
    if (tenantListLoaded) {
      setLoading(true);
      loadRolePrivilege();
    }
  }, [loadRolePrivilege, tenantListLoaded, reLoad]);

  useEffect(() => {
    if (!resourceLoading && !roleLoading && tenantListLoaded) {
      RolePrivilegeData(rolesData, resourcesData);
      setLoading(false);
    }
  }, [
    resourceLoading,
    roleLoading,
    tenantListLoaded,
    rolesData,
    resourcesData,
    RolePrivilegeData
  ]);

  const handleClose = (action = '') => {
    if (typeof action === 'string' && action.toLowerCase() === 'reload') {
      setReLoad(!reLoad);
    }
  };

  const DataRow = (resource, roles) => {
    let returnData = [
      { ...resource, showCheckBox: false, resourcekey: resource.name }
    ];
    roles.map((role) => {
      const resourcesFormatted = role?.resources?.map(function (value) {
        return value.toLowerCase();
      });
      returnData.push({
        resourceTypeUuid: role.resourceTypeUuid,
        roleId: role.roleId,
        description: role.description,
        name: role.name,
        resourcekey: resource.name,
        checked: resourcesFormatted.includes(resource?.name?.toLowerCase()),
        showCheckBox: true
      });
      return role;
    });
    return returnData;
  };

  const handleEditOpenDialog = (event, columnIndex) => {
    setButtonAction(buttonActions.editRole);
    const data = {
      role: {},
      resources: { selected: [], available: [] },
      action: buttonActions.editRole
    };
    rolePrivilegeMatrixData.data.map((rowData) => {
      if (rowData[columnIndex].checked) {
        data.resources.selected.push(rowData[columnIndex]?.resourcekey);
      } else {
        data.resources.available.push(rowData[columnIndex]?.resourcekey);
      }
      return true;
    });
    data.role = rolePrivilegeMatrixData.heading[columnIndex];
    dispatch(setTenantRolePrivilegeDataForEditStart(data));
    handleAddRolePrivilegeModal(true);
  };

  const handleAddRoleOpenDialog = () => {
    setButtonAction(buttonActions.addRole);
    const data = {
      role: {},
      resources: { selected: [], available: [] },
      action: buttonActions.addRole
    };
    rolePrivilegeMatrixData.data.map((rowData) => {
      data.resources.available.push(rowData[0]?.resourcekey);
      return rowData;
    });
    data.role = '';
    dispatch(setTenantRolePrivilegeDataForEditStart(data));
    handleAddRolePrivilegeModal(false);
  };

  const RolePrivilege = (props) => {
    return (
      <div className={classes.root}>
        <TableContainer
          component={Paper}
          className={clsx(classes.container, 'rolePrivilegeList')}
        >
          <Table
            key="tbl_role_privilege"
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {rolePrivilegeMatrixData.heading.map(
                  (heading, headingIndex) => (
                    <TableCell
                      align={headingIndex > 0 ? 'center' : 'left'}
                      key={heading.name}
                      className={
                        (headingIndex > 0
                          ? ''
                          : classes.stickyPermissionHeaderCell,
                        'truncate')
                      }
                      style={{
                        width: 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'unset',
                        padding: '6px 24px 6px 16px'
                      }}
                    >
                      {headingIndex === 0 ? (
                        <>{heading.name}</>
                      ) : (
                        <>
                          <Box display="flex" justifyContent="center">
                            <Box alignItems="flex-start">
                              <Tooltip
                                title={`${heading.name}`}
                                aria-label="add"
                                placement="bottom-start"
                              >
                                <span>
                                  <>{truncateString(heading?.name, 15)}</>
                                </span>
                              </Tooltip>
                              <Tooltip
                                title={`Edit`}
                                aria-label="add"
                                placement="bottom-start"
                              >
                                <span className="pl-8">
                                  <EditIcon
                                    className={classes.iconColor}
                                    onClick={(event) =>
                                      handleEditOpenDialog(event, headingIndex)
                                    }
                                  />
                                </span>
                              </Tooltip>
                            </Box>
                          </Box>
                        </>
                      )}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rolePrivilegeMatrixData.data.map((rowData, rowDataIndex) => (
                <TableRow key={rowDataIndex}>
                  {rowData.map((row, rowIdex) => (
                    <TableCell
                      align={row.showCheckBox ? 'center' : 'left'}
                      key={`${rowDataIndex}_${rowIdex}_${row.roleId}`}
                      className={
                        (row.showCheckBox ? '' : classes.sticky, 'truncate')
                      }
                      style={{
                        width: 'auto',
                        wordWrap: 'break-word',
                        whiteSpace: 'unset',
                        padding: '6px 24px 6px 16px'
                      }}
                    >
                      {row.showCheckBox ? (
                        <>
                          {row.checked ? (
                            <CheckCircleOutlineIcon
                              className={classes.iconColor}
                            />
                          ) : (
                            <CancelIcon className={classes.iconColor} />
                          )}
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title={row.description}
                            aria-label="add"
                            placement="bottom-start"
                          >
                            <span style={{ cursor: 'pointer' }}>
                              {row.name}
                            </span>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const DialogPopup = (props) => {
    return (
      <div className="flex flex-col">
        <DialogContent dividers={false}>
          {buttonAction === buttonActions.editRole ? (
            <TenantRolePrivilegePage onPopupClose={handleClose} />
          ) : (
            <TenantRolePrivilegePage onPopupClose={handleClose} />
          )}
        </DialogContent>
      </div>
    );
  };

  const handleAddRolePrivilegeModal = (isEdit) => {
    dispatch(
      openModal({
        children: <DialogPopup />,
        title: isEdit ? 'Edit Role Privilege' : 'Add Role Privilege',
        maxwidth: 'md'
      })
    );
  };

  return (
    <>
      <MonarchPageCarded
        {...props}
        contentTitle={'Access Group Privileges'}
        contentToolbar={
          <>
            <Tooltip title="Add Role Privilege">
              <IconButton
                color="primary"
                aria-label="maximize"
                component="span"
                onClick={(e) => handleAddRoleOpenDialog(false)}
                size="small"
              >
                <IoAddCircleOutline />
              </IconButton>
            </Tooltip>
          </>
        }
        content={
          <>
            {loading ? (
              <FuseLoading />
            ) : (
              <div className="p-12">
                <RolePrivilege />
              </div>
            )}
          </>
        }
        leftSidebarContent={<></>}
        ref={pageLayout}
      />
    </>
  );
};

export default TenantRolePrivilegeListPage;
