import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import MonarchNavigation from '@monarch/core/MonarchNavigation/MonarchNavigation';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { renderRoutes } from 'react-router-config';
import Navigation from './Navigation.js';

import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import history from '@history';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle.js';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function VendorApp({ content, route }, props) {
  const classes = useStyles(props);
  const pageLayout = useRef(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    Navigation.children.map((_item) => {
      if (_item.url === history.location.pathname) {
        setSelectedContent(_item.title);
        return;
      }
    });
  }, [history.location.pathname]);

  return (
    <></>
    // <MonarchPageCarded
    //   classes={{
    //     root: classes.layoutRoot,
    //     toolbar: 'p-0'
    //   }}
    //   content={
    //     <FuseSuspense>
    //       {renderRoutes(route.routes, { pageLayout })}
    //     </FuseSuspense>
    //   }
    //   leftSidebarHeader={
    //     <>
    //       <MonarchTitle title={'Manage Products & Vendors'} />
    //     </>
    //   }
    //   leftSidebarContent={
    //     <>
    //       <MonarchNavigation
    //         className={clsx('navigation', classes.root)}
    //         navigation={Navigation.children}
    //       />
    //     </>
    //   }
    //   innerScroll
    //   ref={pageLayout}
    // />
  );
}

export default VendorApp;
