import React from 'react';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import OperationInputTable from './OperationInputTable';
import OperationOutputTable from './OperationOutputTable';
import OperationMappingTable from './OperationMappingTable';
import OperationTemplates from './OperationTemplates';

const panelStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  }
}));

function TabPanel(props) {
  const classes = panelStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.root}
    >
      {value === index && (
        <Box p={3}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    fontSize: theme.typography.pxToRem(12)
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    fontSize: theme.typography.pxToRem(12)
  }
}));

function OperationDetails({data}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        <Tab label="Input" {...a11yProps(0)} />
        <Tab label="Output" {...a11yProps(1)} />
        <Tab label="Mappings" {...a11yProps(2)} />
        <Tab label="Template" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <OperationInputTable inputInforamtion={data}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OperationOutputTable inputInforamtion={data}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OperationMappingTable inputInforamtion={data}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OperationTemplates templateData={data}/>
      </TabPanel>
    </div>
  );
}

export default withReducer('integration', reducer)(OperationDetails);
