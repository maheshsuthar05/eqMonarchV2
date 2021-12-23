import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import * as Actions from 'app/auth/store/actions';
import { host } from 'app/config/api';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(${darken(
      theme.palette.primary.dark,
      0.5
    )} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  }
}));

const Logout = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const url = host.isDevEnv()
    ? '/login'
    : window.location.protocol + '//' + window.location.host;

  useEffect(() => {
    dispatch({ type: Actions.USER_LOGGED_OUT });
  }, [dispatch]);

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <Grow in>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center text-center p-48">
              <img
                className="w-128 m-32"
                src="assets/images/logos/equator-logo.png"
                alt="logo"
                style={{ background: '#151230' }}
              />

              <Typography variant="subtitle1" className="mb-16">
                You have Successfully Logged out
              </Typography>

              <Typography color="textSecondary" className="mb-40">
                If you wish to login again to Equator , please click
                <a href={url} style={{ textDecoration: 'none' }}>
                  {' '}
                  here{' '}
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      </div>
    </div>
  );
};

export default Logout;
