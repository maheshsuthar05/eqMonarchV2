import { makeStyles, useTheme } from '@material-ui/core/styles';
import DynamicComponentRender from 'app/main/DynamicComponentRender/DynamicComponentRender';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import MonarchPageSimpleHeader from '../MonarchPageSimple/MonarchPageSimpleHeader';
import { useDispatch } from 'react-redux';
import { clearGridLayout, saveGridLayout } from 'app/store/actions/monarch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    position: 'relative',
    flex: '1 0 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    '& .MuiPaper-rounded': {
      borderRadius: '.6rem'
    }
  },
  header: {
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    margin: '1rem 1.2rem 0rem 1.2rem'
  },
  content: {
    flex: '1 0 auto'
  }
}));

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MonarchGridLayout = React.forwardRef((props, ref) => {
  const rootRef = React.useRef(null);
  const classes = useStyles(props);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [breakpoint, setBreakpoint] = React.useState(null);
  const [currentLayout, setCurrentLayout] = React.useState(null);
  const [allLayouts, setAllLayouts] = React.useState(null);

  const [layouts, setLayouts] = React.useState({
    layouts: props.onLayoutChange().layouts,
    mounted: false
  });

  useEffect(() => {
    dispatch(saveGridLayout(breakpoint, currentLayout, allLayouts));
    return () => {
      dispatch(clearGridLayout());
    };
  }, [dispatch, breakpoint, currentLayout, allLayouts]);

  useEffect(() => {
    if (!layouts.mounted) {
      setLayouts({
        layouts: props.config.layouts,
        mounted: true
      });

      rootRef.current = layouts;
    }
  }, [layouts, props.config.layouts]);

  const fn = {
    handleToggleGrid: (ev, isOpen, item) => {
      const { layouts } = props.onLayoutChange();
      const newLayouts = { ...layouts };

      if (!isOpen) {
        newLayouts[breakpoint] = layouts[breakpoint].map((layout) => {
          const newLayout = { ...layout };
          if (newLayout.i === item) {
            newLayout.w = 12;
            newLayout.h = 12;
          }
          return newLayout;
        });
      }

      setLayouts({
        layouts: newLayouts,
        mounted: true
      });

      ev.preventDefault();
    },
    handleBreakPointChange: (breakpoint) => {
      //user Preference
      // console.log(breakpoint);
      setBreakpoint(breakpoint);
    },
    handleOnLayoutChange: (currentLayout, allLayouts) => {
      //user Preference
      setCurrentLayout(currentLayout);
      setAllLayouts(allLayouts);
      // console.log('currentLayout', JSON.stringify(currentLayout));
      // console.log('allLayouts', JSON.stringify(allLayouts));
    },
    handleOnwidthChange: (containerWidth, margin, cols, containerPadding) => {
      // console.log('containerWidth', containerWidth);
      // console.log('margin', margin);
      // console.log('cols', cols);
      // console.log('containerPadding', containerPadding);
    }
  };

  return (
    <div className={clsx(classes.root)} ref={rootRef}>
      <div className="flex flex-auto flex-col container z-10 h-full">
        {props.header && (
          <MonarchPageSimpleHeader header={props.header} classes={classes} />
        )}

        <ResponsiveReactGridLayout
          className="layout"
          layouts={layouts.layouts}
          breakpoints={theme.breakpoints.values}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          draggableHandle=".drag-handle"
          useCSSTransforms
          isDraggable
          isResizable
          resizeHandles={['sw', 'se']}
          isRearrangeable
          onBreakpointChange={(breakpoint) =>
            fn.handleBreakPointChange(breakpoint)
          }
          onLayoutChange={(currentLayout, allLayouts) =>
            fn.handleOnLayoutChange(currentLayout, allLayouts)
          }
          onWidthChange={(containerWidth, margin, cols, containerPadding) =>
            fn.handleOnwidthChange(
              containerWidth,
              margin,
              cols,
              containerPadding
            )
          }
        >
          {props.config.components.map((_item) => (
            <div
              key={_item}
              data-grid={_item}
              className={clsx(classes.gridRoot)}
            >
              <DynamicComponentRender
                component={_item}
                key={_item}
                dataGrid={_item}
                item={_item}
                {...fn}
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
});

MonarchGridLayout.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node
};

MonarchGridLayout.defaultProps = {};

export default React.memo(MonarchGridLayout);
