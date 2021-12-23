import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React, { useRef } from 'react';
import MonarchPageCardedHeader from './MonarchPageHeaderCardedHeader';
import MonarchPageHeaderCardedSidebar from './MonarchPageHeaderCardedSidebar';
import Hidden from '@material-ui/core/Hidden';

const MonarchPageHeaderCarded = React.forwardRef((props, ref) => {
  const drawerWidth = 240;
  const headerHeight = 200;
  const toolbarHeight = 64;
  const headerContentHeight = headerHeight - toolbarHeight;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100%',
      position: 'relative',
      flex: '1 0 auto',
      height: 'auto'
      // backgroundColor: theme.palette.background.default
    },
    headerRoot: {
      flexDirection: 'column',
      position: 'relative',
      flex: '1 0 auto',
      height: 'auto',
      backgroundColor: theme.palette.background.default
    },
    headerContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 100%',
      zIndex: 0,
      maxWidth: '100%',
      minWidth: 0,
      minHeight: 0,
      [theme.breakpoints.down('xs')]: {},
      [theme.breakpoints.down('md')]: {}
    },
    innerScroll: {
      flex: '1 1 auto',
      height: '100%'
    },
    topBg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: headerHeight,
      background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      backgroundSize: 'cover',
      pointerEvents: 'none'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      // padding: '0 1.2rem',
      flex: '1 1 100%',
      zIndex: 0,
      maxWidth: '100%',
      minWidth: 0,
      minHeight: 0,
      [theme.breakpoints.down('xs')]: {
        // padding: '0 1.2rem'
      },
      [theme.breakpoints.down('md')]: {
        // padding: '0 1.2rem'
      },
      paddingLeft: props.leftSidebarContent.props?.children
        ? 0
        : '0 !important',
      border: `1px solid ${theme.palette.divider}`
    },
    headerCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      minHeight: 0,
      borderRadius: '8px',
      margin: '2rem 1.2rem'
    },
    header: {
      minHeight: headerContentHeight,
      display: 'flex',
      color: '#000000'
    },
    headerSidebarToggleButton: {
      color: theme.palette.primary.contrastText
    },
    headerContent: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },
    headerContentCard: {
      display: 'flex',
      flex: '1 1 100%',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      minHeight: 0
    },
    headerSidebarContent: {
      flex: '1 1 auto',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      display: 'none',
      color: theme.palette.text.primary,
      [theme.breakpoints.up('lg')]: {
        '-webkit-overflow-scrolling': 'touch'
      }
    },
    contentCard: {
      display: 'flex',
      flex: '1 1 100%',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      // boxShadow: theme.shadows[3],
      minHeight: 0,
      borderRadius: '8px 8px 0 0'
    },
    toolbar: {
      height: toolbarHeight,
      minHeight: toolbarHeight,
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },
    sidebarWrapper: {
      position: 'absolute',
      backgroundColor: 'transparent',
      // zIndex: 5,
      overflow: 'hidden',
      '&.permanent': {
        [theme.breakpoints.up('lg')]: {
          zIndex: 0,
          position: 'relative'
        }
      },
      // padding: '0rem 5px 0 1.2rem',
      borderTop: `1px solid ${theme.palette.divider}`,
      display: props.leftSidebarContent.props?.children ? 'flex' : 'none'
    },
    sidebar: {
      // borderRadius: '8px 8px 0 0',
      // boxShadow: theme.shadows[3],
      position: 'absolute',
      '&.permanent': {
        [theme.breakpoints.up('lg')]: {
          backgroundColor: 'transparent',
          position: 'relative',
          border: 'none',
          overflow: 'hidden'
        }
      },
      width: drawerWidth,
      height: '100%'
      // marginTop: '55px'
    },
    leftSidebar: {},
    rightSidebar: {},
    sidebarHeader: {
      height: headerHeight,
      minHeight: headerHeight,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
      '&.permanent': {
        [theme.breakpoints.up('lg')]: {
          backgroundColor: 'transparent'
        }
      }
    },
    sidebarContent: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      [theme.breakpoints.up('lg')]: {
        overflow: 'auto',
        '-webkit-overflow-scrolling': 'touch'
      }
      // marginTop: '64px',
      // paddingTop: '1.2rem'
    },
    backdrop: {
      position: 'absolute'
    }
  }));
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);
  const classes = useStyles(props);
  const isRightSidebar = props.rightSidebarHeader || props.rightSidebarContent;
  const isLeftSidebar = props.leftSidebarHeader || props.leftSidebarContent;

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
    <>
      <div className={clsx(classes.headerRoot)} ref={rootRef}>
        <div className="flex">
          <Hidden mdDown>
            <div className={clsx(classes.headerSidebarContent)}>
              <MonarchPageHeaderCardedSidebar
                position="left"
                header={props.leftSidebarHeader}
                content={props.leftSidebarContent}
                variant={props.leftSidebarVariant || 'permanent'}
                innerScroll={props.innerScroll}
                classes={classes}
                ref={leftSidebarRef}
                rootRef={rootRef}
              />
            </div>
          </Hidden>
          {props.header && (
            <div className={clsx(classes.headerContentWrapper)}>
              <div
                className={clsx(
                  classes.headerContentCard,
                  props.innerScroll && 'inner-scroll'
                )}
              >
                <div
                  className={clsx(
                    classes.headerContent,
                    props.innerScroll && 'inner-scroll'
                  )}
                >
                  <div className="pt-6 pb-0">
                    <div className="flex flex-wrap">
                      <MonarchPageCardedHeader
                        header={props.header}
                        classes={classes}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(classes.root, props.innerScroll && classes.innerScroll)}
        ref={rootRef}
      >
        {/* <div className={clsx(classes.innerRoot)}> */}
        {isLeftSidebar && (
          <MonarchPageHeaderCardedSidebar
            position="left"
            // header={props.leftSidebarHeader}
            content={props.leftSidebarContent}
            variant={props.leftSidebarVariant || 'permanent'}
            innerScroll={props.innerScroll}
            classes={classes}
            ref={leftSidebarRef}
            rootRef={rootRef}
          />
        )}

        <div
          className={clsx(
            classes.contentWrapper,
            isLeftSidebar &&
              (props.leftSidebarVariant === undefined ||
                props.leftSidebarVariant === 'permanent') &&
              'lg:ltr:pl-0 lg:rtl:pr-0',
            isRightSidebar &&
              (props.rightSidebarVariant === undefined ||
                props.rightSidebarVariant === 'permanent') &&
              'lg:pr-0'
          )}
        >
          <div
            className={clsx(
              classes.contentCard,
              props.innerScroll && 'inner-scroll'
            )}
          >
            {props.contentToolbar?.children && (
              <div className={classes.toolbar}>{props.contentToolbar}</div>
            )}

            {props.content && (
              <FuseScrollbars
                className={classes.content}
                enable={props.innerScroll}
                scrollToTopOnRouteChange={props.innerScroll}
              >
                {props.content}
              </FuseScrollbars>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

MonarchPageHeaderCarded.propTypes = {
  rightSidebarHeader: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  leftSidebarHeader: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  innerScroll: PropTypes.bool
};

MonarchPageHeaderCarded.defaultProps = {};

export default React.memo(MonarchPageHeaderCarded);
