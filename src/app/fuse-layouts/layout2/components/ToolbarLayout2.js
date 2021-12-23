import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import AdvanceSearch from 'app/main/advance-search/AdvanceSearch';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.navigation.horizontal.primary.background,
    color: theme.palette.navigation.horizontal.primary.color
  },
  iconColor: {
    color: theme.palette.primary.contrastText
  },
}));

function ToolbarLayout2(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx(classes.root, 'flex relative z-10')}
        color="inherit"
      >
        <Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className={clsx('w-40 h-40 p-0 mx-0 sm:mx-8', classes.iconColor)} />
            </Hidden>
          )}
          <div className="flex flex-1">
            <AdvanceSearch />
            <FuseShortcuts />
          </div>

          <div className="flex items-center px-8">
            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default React.memo(ToolbarLayout2);
