import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: '10px'
  },
  reqType: {
    width: '10%',
    // background: '#e8e8e8'
  },
  textField: {
    '& .MuiOutlinedInput-root, .MuiInput-root':{
      width: '100%',
      borderBottom: '1px solid #cccccc',
      // background: '#e8e8e8',  
    },
    marginRight: '1%',
    borderleft: '1px solid #ababab'
  }
}));

const ServiceTestHeader = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const integrationData = useSelector(
    ({ serviceTestReducers }) => serviceTestReducers.serviceTest.integrationData
  );

  const getService = () => {
    dispatch(actions.getApiServices());
  };
  return (
    <div className={classes.root}>
      <TextField
        id="standard-read-only-input"
        value={integrationData.method}
        className={classes.reqType}
        InputProps={{ readOnly: true }}
      />
      <TextField
        id="standard-read-only-input"
        fullWidth
        className={classes.textField}
        value={integrationData.url}
        InputProps={{ readOnly: true }}
      />
      <MonarchButton
        onClick={() => getService()}
        color="primary"
        variant="contained"
        size="small"
      >
        {'Send'}
      </MonarchButton>
    </div>
  );
};

export default ServiceTestHeader;


