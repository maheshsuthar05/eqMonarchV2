import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    border: 0,
    boxShadow: 'none',
    background: theme.palette.background.default,
    height: 50
  },
  toolbarheight: {
    minHeight: '50px !important'
  }
}));

function ToolbarLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);
  const theme = useTheme();

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="equator-toolbar"
        className={clsx(classes.AppBar, 'flex relative z-10')}
      >
        <Toolbar className={clsx(classes.toolbarheight, 'p-0')}>
          {config.navbar.display && config.navbar.position === 'left' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-40 p-0" />
              <div className={classes.separator} />
            </Hidden>
          )}
          <Hidden mdDown>
            <NavbarFoldedToggleButton className="w-40 h-40 p-0 ml-12" />
          </Hidden>

          <Hidden lgUp>
            <NavbarMobileToggleButton className="w-40 h-40 p-0">
              <Icon>
                {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"
              </Icon>
            </NavbarMobileToggleButton>
          </Hidden>

          <div className="flex">
            <Logo />
          </div>

          <div className="flex flex-1">
            <FuseShortcuts className="px-16" />
          </div>

          <div className="flex">
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton />
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default React.memo(ToolbarLayout1);
