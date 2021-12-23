import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Route, Switch } from 'react-router-dom';

const TabContent = ({ tabs }) => {
  const match = useRouteMatch();

  return (
    <Switch>
      {tabs.map((tab) => (
        <Route
          key={tab.id}
          path={`${match.url}/${tab.routerLink}`}
          component={tab.component}
        ></Route>
      ))}
    </Switch>
  );
};

export default TabContent;

TabContent.propTypes = {
  tabs: PropTypes.array.isRequired,
};
