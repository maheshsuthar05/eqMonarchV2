import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { IconButton } from '@material-ui/core';
import MonarchTitle from '../MonarchTitle/MonarchTitle';
import Tooltip from '@material-ui/core/Tooltip';

import { RiFullscreenExitLine, RiFullscreenLine } from 'react-icons/ri';

const MonarchPageCarded = React.forwardRef((props, ref, handleToggleGrid) => {
  const toolbarHeight = 34;
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      position: 'relative',
      height: '100%',
      backgroundColor: 'none',
      boxShadow: theme.shadows[theme.palette.contentTiles.boxShadow],
      borderRadius: theme.palette.radius,
      '& .MuiIconButton-colorPrimary': {
        '&:hover': {
          background: 'none !important'
        }
      }
    },
    innerScroll: {
      flex: '1 1 auto',
      height: '100%'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 100%',
      zIndex: 0,
      maxWidth: '100%',
      minWidth: 0,
      minHeight: 0,
      [theme.breakpoints.down('xs')]: {},
      [theme.breakpoints.down('md')]: {},
      paddingLeft: props.leftSidebarContent.props?.children ? 0 : '0 !important'
    },
    contentCard: {
      display: 'flex',
      flex: '1 1 100%',
      flexDirection: 'column',
      backgroundColor: 'none',
      minHeight: 0
    },
    toolbar: {
      height: toolbarHeight,
      minHeight: toolbarHeight,
      display: 'flex',
      alignItems: 'center'
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },
    backdrop: {
      position: 'absolute'
    },
    leftSidebarContent: {
      background: 'rgb(0, 93, 162)',
      color: 'rgb(255, 255, 255)',
      padding: '10px',
      position: 'relative',
      fontSize: '15px',
      display: 'flex',
      flexDirection: 'row',
      zIndex: '-1',
      writingMode: 'vertical-rl',
      transform: 'rotateZ(180deg)',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px'
    },
    title: {
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 400
    },
    dragHandle: {
      cursor: 'move',
      margin: '0 1rem 0 1rem',
      width: '40%',
      minHeight: '34px'
    }
  }));

  const rootRef = useRef(ref);
  const classes = useStyles(props);

  const fn = {
    handleOnClick: (ev, item) => {
      setIsOpen(!isOpen);
      props.handleToggleGrid(ev, isOpen, item);
    }
  };

  return (
    <div
      className={clsx(classes.root, `p-8 pl-0 bg-white rounded-md`)}
      ref={rootRef}
    >
      <div className={clsx(classes.contentWrapper)}>
        <div
          className={clsx(
            classes.contentCard,
            props.innerScroll && 'inner-scroll'
          )}
        >
          {props.contentToolbar && (
            <div
              className={clsx(
                classes.toolbar,
                'flex flex-auto justify-between'
              )}
            >
              <MonarchTitle
                title={props.contentTitle}
                className={clsx(classes.title)}
              />
              <div className={clsx(classes.dragHandle, 'drag-handle')}></div>
              <div className={clsx('flex justify-items-center')}>
                {props.contentToolbar}
                <Tooltip title="Expand">
                  <IconButton
                    color="primary"
                    aria-label="maximize"
                    component="span"
                    onClick={(ev) => {
                      fn.handleOnClick(ev, props.item);
                    }}
                    size="small"
                  >
                    {isOpen ? (
                      <RiFullscreenExitLine className={theme.icons.fontSize} />
                    ) : (
                      <RiFullscreenLine className={theme.icons.fontSize} />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
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
  );
});

MonarchPageCarded.propTypes = {
  contentTitle: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  innerScroll: PropTypes.bool,
  leftSidebarContent: PropTypes.node
};

MonarchPageCarded.defaultProps = {};

export default React.memo(MonarchPageCarded);
