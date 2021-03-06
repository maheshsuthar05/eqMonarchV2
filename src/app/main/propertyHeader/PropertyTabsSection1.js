import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const PropertyTabsSection =() => {
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '50%',
        '& .MuiTab-root': {
            minWidth: '140px',
        },
        '& .MuiTab-wrapper': {
            fontSize: '12px'
        }
    },
    textSmall: {
        fontSize: '1rem'
    }
}));
const classes = useStyles();
const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
};
return (
    <>
        <div className={classes.root}>
            <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Claims" {...a11yProps(0)} />
                <Tab label="Open" {...a11yProps(1)} />
                <Tab label="Close" {...a11yProps(2)} />
            </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    </>
)
}
export default PropertyTabsSection;