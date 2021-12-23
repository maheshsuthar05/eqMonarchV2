import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

function TaskWidgets(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      background:'none',
      width: '100%'
    },
    title: {
      color: theme.palette.primary.dark,
      fontWeight: 'bold !Important',
      fontSize: '12px'
    },
    hover: {
      cursor: props.widget.url.enable ? 'pointer' : 'inherit'
    },
    countSize: {
      fontSize: '3.6rem'
    }
  }));

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.hover, 'w-full rounded-8 shadow-1 border-0')}
    >
      <Link to={{ pathname: props.redirectUrl }}>
        <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
          <div className="">
            <Typography className={clsx(classes.title)}>
              {props.widget.title}
            </Typography>
          </div>
        </div>
        <div className="text-center pt-12 pb-28">
          <Typography
            className={clsx(
              `leading-none text-${props.widget.data.color}`,
              classes.countSize
            )}
          >
            {props.counts}
          </Typography>
          <Typography className="text-16" color="textSecondary">
            {props.widget.data.label}
          </Typography>
        </div>
      </Link>
    </div>
  );
}

export default React.memo(TaskWidgets);
