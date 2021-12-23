import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

export default function MonarchSimpleBackdrop() {
  const classes = useStyles();
  const open = useSelector(({ fuse }) => fuse.backDrop.state);

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <Typography className="m-10"> Processing please wait</Typography>
      </Backdrop>
    </div>
  );
}
