import AppBar from '@material-ui/core/AppBar';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.contrastText,
    boxShadow: theme.shadows[0]
  },
  Typography: { color: theme.palette.background.contrastText }
}));

function FooterLayout2(props) {
  const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="equator-footer"
        className={clsx(classes.AppBar, 'relative z-10')}
        color="default"
      >
        <Toolbar
          className={clsx('flex flex-col items-center justify-center px-12')}
        >
          <Typography>
            ADA Compliance: If you are using a screen reader and are having
            problems using this website, please call (310) 469-9167 for
            assistance.
          </Typography>
          <Typography className={clsx(classes.Typography)}>
            © 2021 Equator®, An Altisource® Business Unit. All Rights Reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default React.memo(FooterLayout2);
