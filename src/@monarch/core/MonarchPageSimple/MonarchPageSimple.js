import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React, { useRef } from 'react';
import MonarchPageSimpleHeader from './MonarchPageSimpleHeader';

const headerHeight = 120;
const toolbarHeight = 64;
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    position: 'relative',
    flex: '1 0 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default
  },
  innerScroll: {
    flex: '1 1 auto',
    height: '100%'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    zIndex: 2,
    maxWidth: '100%',
    minWidth: 0,
    height: '100%',
    backgroundColor: '#fff' //theme.palette.background.default
  },
  header: {
    boxShadow: theme.palette.shadow,
    borderRadius: theme.palette.radius
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    zIndex: 9999,
    padding: '0.5rem 0.5rem 0.5rem 0'
  },
  toolbar: {
    height: toolbarHeight,
    minHeight: toolbarHeight,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flex: '1 0 auto',
    marginTop: theme.palette.marginTop
  },
  sidebarWrapper: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative'
      }
    }
  },
  sidebar: {
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        position: 'relative'
      }
    },
    width: drawerWidth,
    height: '100%'
  },
  leftSidebar: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      borderLeft: 0
    }
  },
  rightSidebar: {
    [theme.breakpoints.up('lg')]: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: 0
    }
  },
  sidebarHeader: {
    height: headerHeight,
    minHeight: headerHeight,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  sidebarHeaderInnerSidebar: {
    backgroundColor: 'transparent',
    color: 'inherit',
    height: 'auto',
    minHeight: 'auto'
  },
  sidebarContent: {},
  backdrop: {
    position: 'absolute'
  }
}));

const MonarchPageSimple = React.forwardRef((props, ref) => {
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);
  const classes = useStyles(props);

  React.useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: () => {
      leftSidebarRef.current.toggleSidebar();
    },
    toggleRightSidebar: () => {
      rightSidebarRef.current.toggleSidebar();
    }
  }));

  return (
    <div
      className={clsx(classes.root, props.innerScroll && classes.innerScroll)}
      ref={rootRef}
    >
      <div className="flex flex-auto flex-col container z-10 h-full">
        {props.header && props.sidebarInner && (
          <MonarchPageSimpleHeader header={props.header} classes={classes} />
        )}

        <div className={classes.wrapper}>
          <FuseScrollbars
            className={classes.contentWrapper}
            enable={props.innerScroll && !props.sidebarInner}
          >
            {props.header && !props.sidebarInner && (
              <MonarchPageSimpleHeader
                header={props.header}
                classes={classes}
              />
            )}

            {props.contentToolbar && (
              <div className={classes.toolbar}>{props.contentToolbar}</div>
            )}

            {props.content && (
              <div className={classes.content}>{props.content}</div>
            )}
          </FuseScrollbars>
        </div>
      </div>
    </div>
  );
});

MonarchPageSimple.propTypes = {
  leftSidebarHeader: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  rightSidebarHeader: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  sidebarInner: PropTypes.bool,
  innerScroll: PropTypes.bool
};

MonarchPageSimple.defaultProps = {};

export default React.memo(MonarchPageSimple);
