import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import NavbarMobileLayout2 from 'app/fuse-layouts/layout2/components/NavbarMobileLayout2';
import NavbarMobileToggleFab from 'app/fuse-layouts/shared-components/NavbarMobileToggleFab';
import * as Actions from 'app/store/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarLayout2 from './NavbarLayout2';

// const navbarWidth = 280;

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    height: theme.palette.navigation.horizontal.primary.height.default,
    minHeight: theme.palette.navigation.horizontal.primary.height.min,
    alignItems: 'center',
    zIndex: 6,
    boxShadow: theme.shadows[0],
    background: theme.palette.navigation.horizontal.primary.background,
    color: theme.palette.navigation.horizontal.primary.color,
    //borderRadius: theme.palette.navigation.horizontal.primary.borderRadius
  },
  navbarMobile: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    width: theme.palette.navigation.horizontal.primary.width.default,
    minWidth: theme.palette.navigation.horizontal.primary.width.min,
    height: '100%',
    zIndex: 4,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    })
  }
}));

function NavbarWrapperLayout2(props) {
  const dispatch = useDispatch();
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbarTheme = useSelector(({ fuse }) => fuse.settings.navbarTheme);
  const navbar = useSelector(({ fuse }) => fuse.navbar);

  const classes = useStyles(props);

  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <Hidden mdDown>
          <Paper className={classes.navbar} square>
            <NavbarLayout2 />
          </Paper>
        </Hidden>

        <Hidden lgUp>
          <Drawer
            anchor="left"
            variant="temporary"
            open={navbar.mobileOpen}
            classes={{
              paper: classes.navbarMobile
            }}
            onClose={(ev) => dispatch(Actions.navbarCloseMobile())}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <NavbarMobileLayout2 />
          </Drawer>
        </Hidden>
      </ThemeProvider>

      {config.navbar.display && !config.toolbar.display && (
        <Hidden lgUp>
          <NavbarMobileToggleFab />
        </Hidden>
      )}
    </>
  );
}

export default React.memo(NavbarWrapperLayout2);
