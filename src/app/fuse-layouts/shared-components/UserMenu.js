import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import { navigationResourceStart } from 'app/common/store/actions';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '@history';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { selectedTenant } from 'app/auth/store/actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIdBadge,
  faSignOutAlt,
  faUserShield,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@material-ui/core/styles';
import { contextInfo } from 'app/common/helpers/common-helper';
import { Collapse, Divider } from '@material-ui/core';
import { CgProfile } from 'react-icons/cg';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .list-item-text': {
      color: theme.palette.navigation.horizontal.primary.contrastText
    },
    '&:hover': {
      background: 'none'
    }
  },
  textColor: {
    color: theme.palette.navigation.horizontal.primary.contrastText
  },
  iconColor: {
    color: theme.palette.primary.main
  },
  fontSmall: {
    fontSize: '1.5rem',
    color: theme.palette.primary.main
  },
  icon: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.4rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem'
    }
  }
}));

function UserMenu(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(({ auth }) => auth.user);
  const realm = useSelector(({ auth }) => auth.user.realm);
  // Cookies.set(forgerock.cookie.tenantCode, user.tenantCode);
  const [tenantCode, setTenantCode] = useState(user.tenantCode);
  const userType = contextInfo().userType;
  const [userMenu, setUserMenu] = useState(null);
  const [selectedIndex] = useState(0);
  const externalURLs = useSelector(({ auth }) => auth.user.externalURLs);

  const [open, setOpen] = React.useState(false);
  const [configOpen, setConfigOpen] = React.useState(false);

  const [tenantList, setTenantList] = useState([]);

  const handleAdminClick = () => {
    setOpen(!open);
  };

  const handleConfigClick = () => {
    setConfigOpen(!configOpen);
  };

  useEffect(() => {
    setTenantCode(user.tenantIds[0]);
  }, [user]);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    // Cookies.set(forgerock.cookie.tenantCode, user.tenantIds[index]);
    setTenantCode(user.tenantIds[index]);
    dispatch(
      authActions.changeUserTenant({
        type: authActions.USER_CHANGE_TENANT,
        tenantCode: user.tenantIds[index]
      })
    );
    dispatch(
      navigationResourceStart({
        tenantCode: user.tenantIds[index],
        realm: realm,
        from: 'userMenu'
      })
    );
    dispatch(selectedTenant(user.tenantIds[index]));
    setAnchorEl(null);
    history.push('/home/dashboard');
  };

  // const handleMenuItemClickForTenantChange = (event, index) => {
  //   // Cookies.set(forgerock.cookie.tenantCode, user.tenantIds[index]);
  //   setTenantCode(user.tenantIds[index]);
  //   dispatch(
  //     authActions.changeUserTenant({
  //       type: authActions.USER_CHANGE_TENANT,
  //       tenantCode: user.tenantIds[index]
  //     })
  //   );
  //   dispatch(
  //     navigationResourceStart({
  //       tenantCode: user.tenantIds[index],
  //       realm: realm
  //     })
  //   );
  //   dispatch(selectedTenant(user.tenantIds[index]));
  // };

  useEffect(() => {
    setTenantList(user.tenantIds);
  }, [user.tenantIds]);

  // useEffect(() => {
  //   if (
  //     !_.isUndefined(_cookies.getCookies('vendorTaskSearchTenant')) &&
  //     (userType === 'vendor' || userType === 'agent')
  //   ) {
  //     console.log(user);
  //     handleMenuItemClickForTenantChange(null, 0);
  //   }
  // }, [
  //   user.tenantCode,
  //   userType,
  //   _cookies.getCookies('vendorTaskSearchTenant')
  // ]);

  return (
    <>
      <List component="nav">
        <ListItem button onClick={handleClickListItem}>
          <div className="flex-col mx-12 items-start">
            <Typography component="span" className="normal-case flex">
              <ListItemText
                primary={tenantCode}
                className={clsx('text-14 list-item-text', classes.textColor)}
              />
            </Typography>
          </div>
          <Icon className={clsx('text-15', classes.textColor)} variant="action">
            keyboard_arrow_down
          </Icon>
        </ListItem>
      </List>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {tenantList.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Button onClick={userMenuClick}>
        <CgProfile className={clsx(classes.icon, classes.textColor)} />
        <div className="hidden md:flex flex-col mx-12 items-start">
          <Typography
            component="span"
            className={clsx(classes.textColor, 'normal-case flex')}
          >
            {user.data.displayName}
          </Typography>
        </div>

        <Icon className={clsx(classes.textColor, 'text-15')} variant="action">
          keyboard_arrow_down
        </Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {!user.tenantIds || user.tenantIds.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            {userType === 'vendor' || userType === 'agent' ? null : (
              <>
                <MenuItem
                  component={Link}
                  onClick={userMenuClose}
                  to={`/tenant/details/${userType}`}
                  role="button"
                >
                  <ListItemIcon className="min-w-20">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      className={clsx(theme.icons.fontSize, classes.iconColor)}
                    />
                  </ListItemIcon>
                  <ListItemText primary="IAM" />
                </MenuItem>
                <MenuItem
                  component={Link}
                  onClick={handleAdminClick}
                  role="button"
                >
                  <ListItemIcon className="min-w-20">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className={clsx(theme.icons.fontSize, classes.iconColor)}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                  {open ? (
                    <ExpandLess className={clsx('', classes.fontSmall)} />
                  ) : (
                    <ExpandMore className={clsx('', classes.fontSmall)} />
                  )}
                </MenuItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/property`}
                    >
                      <ListItemText primary="Property" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/decision-rule`}
                    >
                      <ListItemText primary="Rules" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/settings`}
                    >
                      <ListItemText primary="Settings" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/documentation`}
                    >
                      <ListItemText primary="Documentation" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/access-management`}
                    >
                      <ListItemText primary="Access management" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/admin/tenant/task`}
                    >
                      <ListItemText primary="Task" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/manage/products`}
                    >
                      <ListItemText primary="Manage Products" />
                    </MenuItem>
                  </List>
                </Collapse>
                {/* <Divider /> */}

                <MenuItem
                  component={Link}
                  onClick={handleConfigClick}
                  role="button"
                >
                  <ListItemIcon className="min-w-20">
                    <FontAwesomeIcon
                      icon={faCog}
                      className={clsx(theme.icons.fontSize, classes.iconColor)}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Configuration" />
                  {open ? (
                    <ExpandLess className={clsx('', classes.fontSmall)} />
                  ) : (
                    <ExpandMore className={clsx('', classes.fontSmall)} />
                  )}
                </MenuItem>

                <Collapse in={configOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={`/integration/services`}
                    >
                      <ListItemText primary="Integrations" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={{
                        pathname: `${externalURLs?.businessProcessDesign}`
                      }}
                      target="blank"
                    >
                      <ListItemText primary="Business Process Design" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={{
                        pathname: `${externalURLs?.businessProcessControl}`
                      }}
                      target="blank"
                    >
                      <ListItemText primary="Business Process Control" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={{ pathname: `${externalURLs?.diagnostics}` }}
                      target="blank"
                    >
                      <ListItemText primary="Diagnostics" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={{ pathname: `${externalURLs?.sla}` }}
                      target="blank"
                    >
                      <ListItemText primary="SLA" />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      role="button"
                      className={classes.nested}
                      onClick={userMenuClose}
                      component={Link}
                      to={{
                        pathname: `${externalURLs?.dataStudio}`
                      }}
                      target="blank"
                    >
                      <ListItemText primary="Data Studio" />
                    </MenuItem>
                  </List>
                </Collapse>
              </>
            )}
            <MenuItem
              component={Link}
              onClick={userMenuClose}
              to="/logout"
              role="button"
            >
              <ListItemIcon className="min-w-20">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={clsx(theme.icons.fontSize, classes.iconColor)}
                />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
