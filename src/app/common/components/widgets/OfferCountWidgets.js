import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

function OfferCountWidgets(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    title: {
      color: theme.palette.primary.dark,
      fontWeight: 'bold !Important',
      fontSize: '12px'
    },
    hover: {
      cursor: props.offerCount.urlEnable ? 'pointer' : 'inherit'
    },
    countSize: {
      fontSize: '3.6rem'
    },
    value: {
      color:
        props.offerCount.color === ''
          ? theme.palette.text.primary
          : props.offerCount.color
    }
  }));

  const classes = useStyles();
  return (
    <>
      <Paper
        className={clsx(classes.hover, 'w-full rounded-8 shadow-1 border-0')}
      >
        <Link to={{ pathname: props.redirectUrl }}>
          <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
            <div className="">
              <Typography className={clsx(classes.title)}>
                {props.offerCount.type}
              </Typography>
            </div>
          </div>
          <div className="text-center pt-12 pb-28">
            <Typography
              className={clsx(
                `leading-none text-${props.offerCount.color}`,
                classes.countSize,
                classes.value
              )}
            >
              {props?.offerCount?.count}
            </Typography>
          </div>
        </Link>
      </Paper>
    </>
  );
}

export default React.memo(OfferCountWidgets);
