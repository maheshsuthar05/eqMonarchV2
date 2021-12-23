import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

function ValuationWidgets(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%'
    },
    title: {
      color: theme.palette.primary.dark,
      fontWeight: 'bold !Important',
      fontSize: '12px'
    },
    value: {
      color: props.data.color
    },
    countSize: {
      fontSize: '3.6rem'
    }
  }));

  const classes = useStyles();
  return (
    <Card className="w-full rounded-8 shadow-1 border-0">
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="">
          <Typography className={clsx(classes.title)}>
            {props.data.title}
          </Typography>
          <Typography
            className={clsx(
              classes.value,
              classes.countSize,
              'font-300 leading-none text-center pt-12 pb-28'
            )}
          >
            {props?.amount}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(ValuationWidgets);
