import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 72,
    height: 72,
    position: 'absolute',
    top: 130,
    padding: 8,
    // background: theme.palette.background.default,
    boxSizing: 'content-box',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    }),
    '& > img': {
      borderRadius: '50%'
    }
  }
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);

  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      classes={{ root: classes.root }}
      className="user relative flex flex-col items-center justify-center pt-24 pb-24 mb-32 z-0"
    >
      <Typography
        className="username text-16 whitespace-no-wrap"
        color="inherit"
      >
        {user.data.displayName}
      </Typography>
    </AppBar>
  );
}

export default UserNavbarHeader;
