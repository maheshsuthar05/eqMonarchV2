import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseLoading from '@fuse/core/FuseLoading';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as Actions from 'app/auth/store/actionTypes';
import { hasAccess } from 'app/common/helpers/common-helper';
import resourceKeys from 'app/fuse-configs/navigationResourceConfig';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  faHandshake,
  faSearch,
  faThumbsUp,
  faCashRegister,
  faFileInvoiceDollar,
  faTasks,
  faUserEdit,
  faChartBar,
  faFileContract,
  faCompass,
  faCalculator,
  faHome,
  faUserLock,
  faHistory,
  faDatabase,
  faIdBadge,
  faFileMedicalAlt,
  faServer,
  faPalette,
  faEnvelope,
  faUserShield,
  faProjectDiagram,
  faObjectGroup,
  faLayerGroup,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GavelIcon from '@material-ui/icons/Gavel';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import { contextInfo } from 'app/common/helpers/common-helper';
import _ from 'lodash';
import Error403Page from 'app/main/pages/errors/403/Error403Page';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  content: {},
  container: {
    padding: '10px 10px 0 0'
  },
  grid: {
    marginRight: 36
  },
  paper: {
    padding: '20px 10px',
    minHeight: 100,
    minWidth: 100,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderRadius: '5px',
    fontWeight: 'bold',
    color: theme.palette.background.iconcolor,
    backgroundColor: theme.palette.background.iconbg,
    boxShadow: theme.shadows[1],
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  paperdisabled: {
    padding: '20px 10px',
    minHeight: 100,
    minWidth: 100,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderRadius: '5px',
    '&:hover': {
      cursor: 'no-drop'
    },
    cursor: 'default',
    color: 'rgba(0,0,0,0.11)',
    backgroundColor: theme.palette.background.iconbg,
    boxShadow: theme.shadows[1]
  },
  icon: {
    textAlign: 'center',
    '& svg': {
      fontSize: '3rem'
    }
  },
  icon_text: {
    paddingTop: 10,
    fontSize: 10
  },
  title: {
    fontSize: '14px',
    color: theme.palette.background.detailtextColor,
    fontWeight: 'bold',
    padding: '5px 0 5px 12px'
  },
  spaceContainer: {
    padding: '10px !important'
  },
  box: {
    background: 'none',
    boxShadow: 'none'
  },
  modelStyle: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  paper_action: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(0, 0, 0, 0.11)',
    paddingTop: 5,
    marginTop: 10
  },
  dualIcon: {
    display: 'inline-block',
    position: 'relative'
  },
  miniIcon: {
    top: '1px',
    right: '-20px',
    bottom: '15px',
    position: 'absolute',
    fontSize: '1em !important'
  },
  itemSpace: {
    padding: '5px 12px !important'
  }
}));

const DashboardPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentTenant, setCurrentTenant] = useState(null);
  const [open, setOpen] = useState(false);
  const tenantCode = useSelector(({ auth }) => auth.user.tenantCode);
  const tenantCodeChange = useSelector(
    ({ auth }) => auth.user.tenantCodeChanged
  );
  const userType = contextInfo().userType;
  const dashboardResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  const tenant = useSelector(
    ({ tenant }) => tenant?.list?.tenant?.tenant?.tenants
  );
  const loadedTenant = useSelector(({ tenant }) => tenant.list?.loadedTenant);

  const externalURLs = useSelector(({ auth }) => auth.user.externalURLs);
  const datastudioAuth = useSelector(({ auth }) => auth.user.datastudioAuth);
  const redirect = useSelector(({ auth }) => auth.user.redirect);

  const authDetails = datastudioAuth.filter((ele) => {
    if (ele.tenantId === tenantCode) {
      return ele;
    }
    return false;
  });

  useEffect(() => {
    if (loadedTenant && tenant !== undefined) {
      const selectedTenant = tenant?.filter(
        (tenant) =>
          tenant?.tenantCode.toLowerCase() === tenantCode.toLowerCase()
      );
      selectedTenant.length
        ? setCurrentTenant(selectedTenant[0])
        : setCurrentTenant(null);
    }
    dispatch({
      type: Actions.DATASTUDIO_REDIRECT_START,
      authDetails,
      tenantCodeChange
    });
  }, [
    loadedTenant,
    authDetails,
    dispatch,
    tenant,
    tenantCode,
    tenantCodeChange
  ]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (e, resource) => {
    dispatch({
      type: Actions.DASHBOARD_SET_SELECTED_RESOURCE_START,
      selectedResource: { id: resource.id, url: resource.url }
    });
  };

  // Check user has access to a specific Resource
  const checkResourceAccess = (resourceKey, action = 'GET') => {
    return hasAccess(dashboardResources, resourceKey);
  };

  // Landing Icons and Its Groups
  const landingNavigationConfig = [
    {
      id: resourceKeys.Navigation_Marketplace,
      title: 'Marketplace',
      type: 'group',
      icon: '',
      children: [
        {
          id: resourceKeys.Navigation_MarketPlace_ManageProducts,
          title: 'Manage Products',
          icon: (
            <span className={classes.dualIcon}>
              <FontAwesomeIcon icon={faSearch} className={classes.miniIcon} />
              <FontAwesomeIcon icon={faLayerGroup} />
            </span>
          ),
          url: '/manage'
        },
        {
          id: resourceKeys.Navigation_Marketplace_Partnership_Management,
          title: 'Partnership Management',
          icon: <FontAwesomeIcon icon={faHandshake} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Marketplace_Agent_Search,
          title: 'Agent Search',
          icon: <FontAwesomeIcon icon={faSearch} size="xs" />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Marketplace_Agent_Approval_Metrics,
          title: 'Agent Approval Metrics',
          icon: <FontAwesomeIcon icon={faThumbsUp} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Marketplace_Order_Management,
          title: 'Order Management',
          icon: <FontAwesomeIcon icon={faCashRegister} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Marketplace_Invocing_Billing,
          title: 'Invocing & Billing',
          icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
          url: ''
        }
      ]
    },
    {
      id: resourceKeys.Navigation_Servicer_Workspace,
      title: 'Servicer Workspace',
      type: 'group',
      icon: '',
      children: [
        {
          id: resourceKeys.Navigation_Servicer_Workspace_Dashboards,
          title: 'Dashboards',
          icon: <DashboardIcon />,
          url: `${externalURLs?.dashboards}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Servicer_Workspace_Mail,
          title: 'Mail',
          icon: <FontAwesomeIcon icon={faEnvelope} />,
          url: '/mail/inbox'
        },
        {
          id: resourceKeys.Navigation_Servicer_Workspace_User_Accounts,
          title: 'User Accounts',
          icon: <FontAwesomeIcon icon={faUserEdit} />,
          url: `/tenant/details/${currentTenant?.caseInstanceId}/users`
        },
        {
          id: resourceKeys.Navigation_Servicer_Workspace_Decision_Rules,
          title: 'Business Rules',
          translate: 'Business Rules',
          type: 'item',
          icon: <GavelIcon />,
          url: `/admin/tenant/${currentTenant?.caseInstanceId}/decision-rule`
        },
        {
          id: resourceKeys.Navigation_Servicer_Workspace_Task_Management,
          title: 'Task Management',
          icon: <FontAwesomeIcon icon={faTasks} />,
          url: ''
        }
      ]
    },
    {
      id: resourceKeys.Navigation_Compliance,
      title: 'Compliance',
      type: 'group',
      icon: '',
      children: [
        {
          id: resourceKeys.Navigation_Compliance_Data_Studio,
          title: 'Data Studio',
          icon: <FontAwesomeIcon icon={faDatabase} />,
          url: `${externalURLs?.dataStudio}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Compliance_Roles_and_Permission_Audit,
          title: 'Roles and Permission Audit',
          icon: <FontAwesomeIcon icon={faUserLock} />,
          url: `/tenant/details/${currentTenant?.caseInstanceId}/roles`
        },
        {
          id: resourceKeys.Navigation_Compliance_Delinquency_Snapshot,
          title: 'Delinquency Snapshot',
          icon: <FontAwesomeIcon icon={faChartBar} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Compliance_Loss_Mitigation_Efforts,
          title: 'Loss Mitigation Efforts',
          icon: <FontAwesomeIcon icon={faCompass} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Compliance_Non_compliant_Properties,
          title: 'Non-compliant Properties',
          icon: <FontAwesomeIcon icon={faFileContract} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Compliance_PPI_Audit,
          title: 'PPI Audit',
          icon: <FontAwesomeIcon icon={faCalculator} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Compliance_Foreclosure,
          title: 'Foreclosure',
          icon: <FontAwesomeIcon icon={faHome} />,
          url: ''
        },
        {
          id: resourceKeys.Navigation_Compliance_Process_Audit,
          title: 'Process Audit',
          icon: <FontAwesomeIcon icon={faHistory} />,
          url: ''
        }
      ]
    },
    {
      id: resourceKeys.Navigation_Configuration,
      title: 'Configuration',
      type: 'group',
      icon: '',
      children: [
        {
          id: resourceKeys.Navigation_Configuration_Tenant_Admin,
          title: 'Tenant Admin',
          icon: <FontAwesomeIcon icon={faShieldAlt} />,
          url: `/admin/tenant/${currentTenant?.caseInstanceId}/property/legal-entities`
        },
        {
          id: resourceKeys.Navigation_Configuration_Integrations,
          title: 'Integrations',
          icon: <FontAwesomeIcon icon={faProjectDiagram} />,
          url: '/integration/services'
        },
        {
          id: resourceKeys.Navigation_Configuration_Business_Process_Design,
          title: 'Business Process Design',
          icon: <FontAwesomeIcon icon={faObjectGroup} />,
          url: `${externalURLs?.businessProcessDesign}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Configuration_Business_Process_Control,
          title: 'Business Process Control',
          icon: <DeveloperBoardIcon />,
          url: `${externalURLs?.businessProcessControl}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Configuration_Diagnostics,
          title: 'Diagnostics',
          icon: <FontAwesomeIcon icon={faFileMedicalAlt} />,
          url: `${externalURLs?.diagnostics}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Configuration_Identity_Access_Management,
          title: 'Identity Access Management',
          icon: <FontAwesomeIcon icon={faIdBadge} />,
          url: `/tenant/details/${userType}/${currentTenant?.caseInstanceId}`
        },
        {
          id: resourceKeys.Navigation_Configuration_SLA,
          title: 'SLA',
          icon: <FontAwesomeIcon icon={faServer} />,
          url: `${externalURLs?.sla}`,
          target: true
        },
        {
          id: resourceKeys.Navigation_Configuration_Theme_Palette,
          title: 'Theme Palette',
          icon: <FontAwesomeIcon icon={faPalette} />,
          url: '/configuration/themeSetting'
        }
      ]
    },
    {
      id: resourceKeys.Navigation_Platform,
      title: 'Platform',
      type: 'group',
      icon: '',
      children: [
        {
          id: resourceKeys.Navigation_Platform_Tenant_System_Admin,
          title: 'Tenant System Admin',
          icon: <FontAwesomeIcon icon={faUserShield} />,
          url: '/tenant/list'
        }
      ]
    }
  ];

  // Dashboard - Landing Page Icons
  const DashboardSection = (props) => {
    let sectionWithIcons = '';
    const sectionIndex = landingNavigationConfig.findIndex((item) => {
      return item.id === props.groupId;
    });
    if (sectionIndex >= 0) {
      const landingSection = landingNavigationConfig[sectionIndex];
      if (checkResourceAccess(landingSection.id)) {
        sectionWithIcons = (
          <Grid
            item
            xs={12}
            sm={6}
            md={12}
            key={landingSection.id}
            className={classes.itemSpace}
          >
            <Card
              className={classes.box}
              style={}
              data-tour={`${landingSection.id}`}
            >
              <CardHeader
                disableTypography
                className={classes.title}
                title={landingSection.title}
              />
              <CardContent className={classes.spaceContainer}>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    {landingSection.children.map((subItem) => {
                      // Check user privilege to access or not
                      let hasResourceAccess =
                        subItem.id === 'Navigation_Compliance_DataStudio'
                          ? checkResourceAccess(subItem.id) && redirect
                          : checkResourceAccess(subItem.id);
                      let elevation = 0;
                      let clickHandler = handleOpen;
                      let cursor = 'no-drop';
                      let classTest = classes.paperdisabled;
                      if (hasResourceAccess && subItem.url.length > 0) {
                        elevation = 0;
                        clickHandler = preventDefault;
                        cursor = 'pointer';
                        classTest = classes.paper;
                      }
                      return (
                        <Grid
                          className={classes.itemSpace}
                          item
                          xs
                          key={subItem.id}
                          style={{ minHeight: 25 }}
                          data-tour={`${subItem.id}`}
                        >
                          {subItem.target ? (
                            <a
                              href={subItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', cursor: cursor }}
                              onClick={(event) =>
                                clickHandler(event, subItem.url)
                              }
                            >
                              <Paper
                                className={classTest}
                                elevation={elevation}
                              >
                                <div className={classes.icon}>
                                  {subItem.icon}
                                </div>
                                <div className={classes.icon_text}>
                                  {subItem.title}
                                </div>
                              </Paper>
                            </a>
                          ) : (
                            <Paper
                              onClick={(event) => clickHandler(event, subItem)}
                              className={classTest}
                              elevation={elevation}
                              style={{ textDecoration: 'none', cursor: cursor }}
                            >
                              <div className={classes.icon}>{subItem.icon}</div>
                              <div className={classes.icon_text}>
                                {subItem.title}
                              </div>
                            </Paper>
                          )}
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      }
    }

    return sectionWithIcons;
  };

  const NoAccessPopupMessage = () => {
    return (
      <Snackbar
        style={{ paddingTop: '75px' }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="You are not authorized to view this page!"
      ></Snackbar>
    );
  };

  return _.isEmpty(dashboardResources) ? (
    <Error403Page content={currentTenant?.tenantCode} />
  ) : (
    <div>
      <CssBaseline />
      <div>
        {!loadedTenant && (
          <div className="flex flex-auto items-center justify-center w-full h-screen">
            <Typography color="textSecondary" variant="h5">
              <FuseLoading />
            </Typography>
          </div>
        )}
        <FuseAnimateGroup>
          {loadedTenant && (
            <>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                className="flex p-16"
              >
                <DashboardSection
                  groupId={resourceKeys.Navigation_Marketplace}
                />
                <DashboardSection
                  groupId={resourceKeys.Navigation_Servicer_Workspace}
                />
                <DashboardSection
                  groupId={resourceKeys.Navigation_Compliance}
                />
                <DashboardSection
                  groupId={resourceKeys.Navigation_Configuration}
                />
                <DashboardSection groupId={resourceKeys.Navigation_Platform} />
              </Grid>
              <NoAccessPopupMessage />
            </>
          )}
        </FuseAnimateGroup>
      </div>
    </div>
  );
};
export default DashboardPage;
