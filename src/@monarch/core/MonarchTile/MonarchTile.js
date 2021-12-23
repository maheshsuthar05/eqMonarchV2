import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import MonarchTileToolBar from './MonarchTileToolBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  text11: {
    fontSize: '1.1rem'
  },
  textSmall: {
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#ffffff !important',
    color: '#000000',
    fontSize: '10px !important',
    borderRadius: '15px',
    boxShadow: 'rgba(0,0,0,0.3) 0 0 3px',
    padding: '4px 12px',
    display: 'flex',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#000000 !important',
      color: '#ffffff'
    }
  },
  heightSec: {
    height: '150px'
  },
  verticalText: {
    letterSpacing: '2px',
    writingMode: 'vertical-rl'
  },
  paper: {
    flexGrow: 1,
    background: 'none',
    boxShadow: 'none',
    '& .MuiTab-root': {
      minWidth: '0',
      minHeight: '0'
    },
    '& .MuiTabs-root': {
      minHeight: '0'
    },
    '& .MuiTabs-centered': {
      justifyContent: 'flex-end'
    }
  }
}));

const MonarchTile = (props) => {
  const classes = useStyles();
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-10">
      <div className="col-span-2 shadow-md p-8 flex-wrap bg-white rounded-md">
        <div className="flex w-full bg-grey-100">
          <div className="w-full text-black text-left">
            <div className="justify-end flex">
              <h5 className="text-xs font-semibold p-8">
                {props.contentTitle}
                <Paper className={classes.paper}>{props.contentToolbar}</Paper>
              </h5>
            </div>
          </div>
        </div>
        <div
          className={clsx('flex w-full mt-6 overflow-auto', classes.heightSec)}
        >
          {props.content}
        </div>
      </div>
    </div>
  );
};

MonarchTile.propTypes = {
  contentTitle: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  innerScroll: PropTypes.bool
};

MonarchTile.defaultProps = {};

export default React.memo(MonarchTile);
