import FuseAnimate from '@fuse/core/FuseAnimate';
import history from '@history';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import * as Actions from 'app/auth/store/actions';
import { forgerock } from 'app/config/api';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from 'react-icons/cg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(${darken(
      theme.palette.primary.dark,
      0.5
    )} 0%, ${theme.palette.primary.dark} 80%)`,
    color: theme.palette.primary.contrastText
  },
  textColor: {
    color: theme.palette.navigation.horizontal.primary.contrastText
  },
  icon: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '2.4rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem'
    }
  }
}));

function LockPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const realm = useSelector((state) => state.auth.user.realm);
  const url = realm
    ? forgerock.api.PostLogoutUrl(
        realm.slice(1),
        window.location.host,
        window.location.protocol
      )
    : '/';

  useEffect(() => {
    dispatch({ type: Actions.USER_INVALID_SESSION });
  }, [dispatch]);

  setTimeout(() => {
    history.push(url);
  }, 30000);

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <div className="min-w-full flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:items-center -mx-8">
                <div className="relative mx-8">
                  {/* <Avatar className="w-72 h-72" src={user?.data?.photoURL} /> */}
                  <CgProfile
                    className={clsx(classes.icon, classes.textColor)}
                  />
                  <Icon
                    className="text-32 absolute right-0 bottom-0"
                    color="error"
                  >
                    lock
                  </Icon>
                </div>

                <div className="mx-8">
                  <Typography variant="h6" className="mb-8">
                    YOUR SESSION IS LOCKED
                  </Typography>
                  <Typography color="textSecondary">
                    Due to inactivity, your session is locked.
                  </Typography>
                </div>
              </div>
              <img
                className="w-128 m-32"
                src="assets/images/logos/equator-logo.png"
                alt="logo"
                style={{ background: '#151230' }}
              />
              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                If you wish to login again to Equator, please click
                <a href={url} style={{ textDecoration: 'none' }}>
                  here
                </a>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default LockPage;
