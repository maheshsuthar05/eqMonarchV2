import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .logo-icon': {
      with: 110,
      height: 30,
      transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    },
    '& .react-badge, & .logo-text': {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '-1rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '0.5rem'
    }
  },
  reactBadge: {
    backgroundColor: '#121212',
    color: '#61DAFB'
  }
}));

function Logo(props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, 'flex items-center', props.className)}>
      <img
        className="logo-icon"
        src="assets/images/logos/equator-logo.png"
        alt="logo"
      />
    </div>
  );
}

export default Logo;
