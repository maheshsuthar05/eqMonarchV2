import FuseSuspense from '@fuse/core/FuseSuspense';
import { makeStyles } from '@material-ui/core';
import MonarchNavigation from '@monarch/core/MonarchNavigation';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { useParams, withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Navigation from './Navigation';
import _ from '@lodash';
import { useSelector } from 'react-redux';
import { hasAccess } from 'app/common/helpers';

const useStyles = makeStyles({
  layoutRoot: {}
});

const PropertyTeamsTaskListPage = ({ content, route, match }, props) => {
  const pageLayout = useRef(null);
  const classes = useStyles();
  const routeParams = useParams();

  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  const navigationConfig = () => {
    const data = Navigation().children.map((navigation) => {
      const compiled = _.template(navigation.url);
      return {
        ...navigation,
        url: compiled({ caseInstanceId: routeParams.caseInstanceId }),
        visible: hasAccess(contextResources, navigation.id)
      };
    });
    return data;
  };

  return (
    <MonarchPageSimple
      classes={{
        root: classes.layoutRoot,
        toolbar: 'p-0'
      }}
      content={<FuseSuspense>{renderRoutes(route.routes)}</FuseSuspense>}
      contentToolbar={
        <MonarchNavigation
          className={clsx('navigation', classes.root)}
          navigation={navigationConfig()}
          layout="horizontal"
        />
      }
      innerScroll
      ref={pageLayout}
    />
  );
};

export default withRouter(PropertyTeamsTaskListPage);
