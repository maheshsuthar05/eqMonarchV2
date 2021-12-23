import { makeStyles, Tab, Tabs } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { a11yProps } from './MonarchTabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'none',
    boxShadow: 'none',
    marginRight:'30px',
    minHeight: '0',
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
    }
  }
}));

const MonarchTabs = (props) => {
  const classes = useStyles();
  return (
    <Tabs
      value={props?.value}
      indicatorColor={props?.indicatorColor}
      textColor={props?.textColor}
      onChange={props?.onChange}
      className={clsx('navigation', classes.root)}
      variant="scrollable"
      scrollButtons="auto"
    >
      {props.children.map((_item, i) => {
        return _item.disabled ? null : (
          <Tab
            key={_item.title}
            label={_item.title}
            className={clsx(classes.root)}
            disabled={_item.disabled || false}
            {...a11yProps(i)}
          />
        );
      })}
    </Tabs>
  );
};

export default MonarchTabs;
