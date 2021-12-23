import React, { useState } from 'react';
import { Tab, Tabs, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { CustomTabValue } from './common/custom-tab-value/CustomTabValue';
import { TabPanel, a11yProps } from './common/tab-panel/TabPanel';

const tab = ['Pretty', 'Raw', 'Preview'];

const ServiceTestOutputPanel = () => {
  const classes = useStyles();
  const serviceData = useSelector(
    ({
      serviceTestReducers: {
        serviceTest: { serviceData }
      }
    }) => serviceData
  );
  const loading = useSelector(
    ({
      serviceTestReducers: {
        serviceTest: { loading }
      }
    }) => loading
  );
  const [value, setValue] = useState(0);
  const tabValue = [
    <CustomTabValue tab="pretty" loading={loading} data={serviceData} />,
    <CustomTabValue tab="raw" loading={loading} data={serviceData} />,
    <CustomTabValue tab="preview" loading={loading} data={serviceData} />
  ];
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="inherit"
        style={{ boxShadow: 'none', width: '100%' }}
      >
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
      {serviceData !== null &&
        serviceData !== undefined &&
        Object.keys(serviceData).length !== 0 && (
          <div className={classes.status}>
            <span>Status : </span>
            <span style={{ color: 'green' }}>
              {serviceData.status} {serviceData.request.statusText}
            </span>
          </div>
        )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
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
      paddingRight: '15px'
    }
  },
  status: {
    marginLeft: '-27%',
    zIndex: 9999,
    marginTop: '2%'
  }
}));

export default ServiceTestOutputPanel;
