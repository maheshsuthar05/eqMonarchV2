import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const TabHeader = ({ pathname, tabs }) => {
  const match = useRouteMatch();

  return (
    <Tabs
      value={pathname}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map(
        (tab, index) =>
          tab.visible && (
            <Tab
              disabled={tab.disabled}
              key={'tab-' + index}
              label={
                <>
                  <div>
                    {tab.icon} {tab.label}
                  </div>
                </>
              }
              value={`${match.url}/${tab.routerLink}`}
              component={Link}
              to={`${match.url}/${tab.routerLink}`}
            ></Tab>
          )
      )}
    </Tabs>
  );
};

export default TabHeader;

TabHeader.propTypes = {
  pathname: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
};