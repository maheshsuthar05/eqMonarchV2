import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    backgroundColor: theme.buttons.background,
    color: theme.buttons.color,
    fontSize: theme.buttons.fontSize,
    borderRadius: theme.buttons.borderRadius,
    boxShadow: theme.buttons.boxShadow,
    padding: theme.buttons.padding,
    display: 'flex',
    fontWeight: '500',
    textTransform: theme.buttons.textTransform,
    '&:hover': {
      backgroundColor: theme.buttons.buttonBackgroundHover,
      color: theme.buttons.buttonHoverColor
    }
  }
}));

const MonarchButton = (props) => {
  const classes = useStyles();
  return (
    <Button {...props} className={clsx(classes.button, props.className)} />
  );
};

export default MonarchButton;
