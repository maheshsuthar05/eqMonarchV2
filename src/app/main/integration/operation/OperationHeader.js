import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  titleHeading: {
    position: 'fixed',
    top: '15px',
    left: '10%',
    display: '-webkit-inline-box'
  }
}));

function OperationHeader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="flex flex-1 w-full items-center justify-between">
        <div className={clsx(classes.titleHeading, 'flex items-center')}>
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography
              className="normal-case flex items-center sm:mb-12"
              component={Link}
              role="button"
              to="/integration/services"
              color="inherit"
            >
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4"> {props.serviceName}</span>
            </Typography>
          </FuseAnimate>
        </div>
      </div>
    </div>
  );
}

export default OperationHeader;
