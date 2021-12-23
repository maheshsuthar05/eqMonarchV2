import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CustomTable from './common/custom-table/CustomTable';
import { useSelector, useDispatch } from 'react-redux';
import { TabPanel, a11yProps } from './common/tab-panel/TabPanel';
import * as actions from '../store/actions';

const tab = ['Body', 'Headers', 'Params'];

const ServiceTestInputPanel = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const integrationData = useSelector(
    ({ serviceTestReducers }) => serviceTestReducers.serviceTest.integrationData
  );

  const tabValue = [
    <BodyField />,
    <CustomTable data={integrationData.headerValue} />,
    <CustomTable data={integrationData.paramsValue} />
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" style={{ boxShadow: 'none' }}>
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tab.map((res, key) => (
            <Tab
              label={res}
              style={{ textTransform: 'capitalize' }}
              {...a11yProps(key)}
              key={key}
            />
          ))}
        </Tabs>
        {tabValue.map((res, key) => (
          <TabPanel value={value} index={key} key={key}>
            {res}
          </TabPanel>
        ))}
      </AppBar>
    </div>
  );
};

const BodyField = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const bodyValue = useSelector(
    ({ serviceTestReducers }) => serviceTestReducers.serviceTest.bodyValue
  );
  const setBody = (value) => {
    dispatch(actions.setBodyValue(value));
  };
  return (
    <textarea
      cols="25"
      rows="17"
      value={bodyValue}
      onChange={(e) => setBody(e.target.value)}
      className={classes.body}
      autoFocus={true}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
    '& .MuiTab-root': {
      minWidth: '0',
      minHeight: '0',
      marginRight: '2px',
      marginBottom: '1px',
      background: theme.palette.background.tabsBg,
      color: theme.palette.primary.valueTextColor,
      textTransform: 'capitalize',
      fontSize: '0.875rem',
      fontWeight: '500',
      padding: '6px 15px'
    },
    '& .MuiTabs-root': {
      minHeight: '0',
      background: '#ffffff',
      color: '#000000'
    },
    '& .MuiAppBar-root': {
      boxShadow: 'none',
      background: 'none !important'
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'start'
    },
    '& .panelBg': {
      background: '#f6fbff'
    },
    '& .Mui-selected': {
      background: theme.palette.background.tabsSelectedBg,
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: theme.palette.primary.tabSelectedTextColor,
    },
    '& .PrivateTabIndicator-colorPrimary-404': {
      backgroundColor: theme.palette.background.tabsSelectedIndicator,
    },
    '& .MuiTabs-scrollable': {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '25px'
    }
  },
  body: {
    width: '90%',
    padding: '15px 15px',
    marginLeft: '5%',
    marginTop: '4%',
    height: '68vh',
    border: '2px solid #ccc'
  }
}));

export default ServiceTestInputPanel;
