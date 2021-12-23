import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
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
  },
  textSmall: {
    fontSize: '1rem'
  }
}));

const MonarchTileToolBar = (props) => {
  const classes = useStyles();
  return <Paper className={classes.root}>{props.contentToolbar}</Paper>;
};

MonarchTileToolBar.propTypes = {
  contentToolbar: PropTypes.node
};

MonarchTileToolBar.defaultProps = {};

export default React.memo(MonarchTileToolBar);
