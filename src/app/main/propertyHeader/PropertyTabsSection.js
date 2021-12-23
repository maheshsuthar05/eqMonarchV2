import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';

const PropertyTabsSection1 =() => {
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
          justifyContent: 'flex-start'
        }
    },
    textSmall: {
        fontSize: '1rem'
    }
}));
const classes = useStyles();
const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
return (
    <>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab className="text-xs font-semibold" label="Claims" />
            <Tab className="text-xs font-semibold" label="Open" />
            <Tab className="text-xs font-semibold" label="Close" />
          </Tabs>
        </Paper>
    </>
)
}
export default PropertyTabsSection1;