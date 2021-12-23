import { Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  titleTxt: {
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    textAlign: 'center',
    padding: '5px 20px',
    fontSize: '1rem',
    fontWeight: '400 !important',
    background: theme.palette.background.widgetTitleBg,
    color: theme.palette.primary.widgetTitleColor
  }
}));

const MonarchTitle = (props) => {
  const classes = useStyles();
  return (
    <Typography
      className={clsx(
        props.forceStyles ? props.className : 'font-semibold truncate',
        classes.titleTxt
      )}
      variant="h5"
    >
      {props.title}
    </Typography>
  );
};

export default MonarchTitle;
