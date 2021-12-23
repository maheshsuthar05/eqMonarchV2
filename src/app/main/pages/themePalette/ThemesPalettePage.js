import React, { useRef } from 'react';
import FuseThemeSchemes from '@fuse/core/FuseThemeSchemes';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import MonarchTitle from '@monarch/core/MonarchTitle/MonarchTitle';
import { hasAccess } from 'app/common/helpers/common-helper';
import MonarchPageSimple from '@monarch/core/MonarchPageSimple';

const useStyles = makeStyles({
  layoutRoot: {}
});

const ThemePalettePage = () => {
  const classes = useStyles();
  const pageLayout = useRef(null);
  const contextResources = useSelector(
    (state) => state.common.IAMResource.contextResources
  );
  if (
    !hasAccess(contextResources, 'Navigation_Configuration_Theme_Palette_Page')
  ) {
    return null;
  }

  return (
    <MonarchPageSimple
      classes={{
        root: classes.layoutRoot
      }}
      contentToolbar={<MonarchTitle title="Theme Color Schemes" />}
      content={
        <FuseAnimateGroup
          enter={{
            animation: 'transition.slideUpBigIn',
            duration: 500
          }}
        >
          <FuseThemeSchemes />
        </FuseAnimateGroup>
      }
      innerScroll
      ref={pageLayout}
    />
  );
};

export default ThemePalettePage;
