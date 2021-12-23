import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { forgerock } from 'app/config/api';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(${darken(
      theme.palette.primary.dark,
      0.5
    )} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  }
}));

function VerificationSuccessfulPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const realm = useSelector(({ auth }) => auth.user.realm);
  const url = realm
    ? forgerock.api.PostLogoutUrl(
        realm.slice(1),
        window.location.host,
        window.location.protocol
      )
    : '/';

  useEffect(() => {
    dispatch({ type: '[USER] LOGGED OUT' });
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
                Congratulations !! You are now Registered !!
              </Typography>

              <Typography color="textSecondary" className="mb-40">
                Please click
                <a href={url} style={{ textDecoration: 'none' }}>
                  {' '}
                  here{' '}
                </a>
                to login
              </Typography>
            </CardContent>
          </Card>
        </Grow>
      </div>
    </div>
  );
}

export default VerificationSuccessfulPage;
