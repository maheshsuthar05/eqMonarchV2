import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import MonarchNavHorizontalCollapse from './horizontal/MonarchNavHorizontalCollapse';
import MonarchNavHorizontalGroup from './horizontal/MonarchNavHorizontalGroup';
import MonarchNavHorizontalItem from './horizontal/MonarchNavHorizontalItem';
import MonarchNavHorizontalLink from './horizontal/MonarchNavHorizontalLink';
import MonarchNavVerticalCollapse from './vertical/MonarchNavVerticalCollapse';
import MonarchNavVerticalGroup from './vertical/MonarchNavVerticalGroup';
import MonarchNavVerticalItem from './vertical/MonarchNavVerticalItem';
import MonarchNavVerticalLink from './vertical/MonarchNavVerticalLink';
import MonarchNavItem, { registerComponent } from './MonarchNavItem';

/*
Register Fuse Navigation Components
 */
registerComponent('vertical-group', MonarchNavVerticalGroup);
registerComponent('vertical-collapse', MonarchNavVerticalCollapse);
registerComponent('vertical-item', MonarchNavVerticalItem);
registerComponent('vertical-link', MonarchNavVerticalLink);
registerComponent('horizontal-group', MonarchNavHorizontalGroup);
registerComponent('horizontal-collapse', MonarchNavHorizontalCollapse);
registerComponent('horizontal-item', MonarchNavHorizontalItem);
registerComponent('horizontal-link', MonarchNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function MonarchNavigation(props) {
  const useStyles = makeStyles((theme) => ({
    navigation: {
      // padding: '5px 0px 0px 5px !important',
      '& .list-item': {
        '&:hover': {
          backgroundColor:
            theme.palette.type === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0,0,0,.04)'
        },
        '&:focus:not(.active)': {
          backgroundColor:
            theme.palette.type === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0,0,0,.05)'
        }
      }
    },
    verticalNavigation: {
      height: '100%',
      marginTop: props.leftSidebarHeader?.childern ? '55px' : 16,
      '&.active-square-list': {
        '& .list-item, & .active.list-item': {
          width: '100%',
          height: '64px',
          borderRadius: '8px 0px 0 8px'
        }
      },
      '&.dense': {
        '& .list-item': {
          paddingTop: 0,
          paddingBottom: 0,
          height: 32
        }
      }
    },
    horizontalNavigation: {
      // '& .active': {
      //   color: theme.palette.secondary.main + '!important',
      // borderBottom: '1px solid ' + theme.palette.divider + ' !important',
      // },
      '&.active-square-list': {
        '& .list-item': {
          borderRadius: '0'
        }
      },
      '& .list-item': {
        // padding: '8px 12px 8px 12px',
        // height: 40,
        // minHeight: 40,
        // '&.level-0': {
        //   height: 44,
        //   minHeight: 44
        // },
        // '& .list-item-text': {
        //   padding: '0 0 0 8px'
        // }
      }
    },
    '@global': {
      '.popper-navigation-list': {
        '& .list-item': {
          padding: '8px 12px 8px 12px',
          height: 40,
          minHeight: 40,
          '& .list-item-text': {
            // padding: '0 0 0 8px'
          }
        },
        '&.dense': {
          '& .list-item': {
            minHeight: 32,
            height: 32,
            '& .list-item-text': {
              padding: '0 0 0 8px'
            }
          }
        }
      }
    }
  }));

  const classes = useStyles(props);
  const { navigation, layout, active, dense, className } = props;

  const verticalNav = (
    <List
      className={clsx(
        'navigation whitespace-no-wrap',
        classes.navigation,
        classes.verticalNavigation,
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (
        <MonarchNavItem
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
        />
      ))}
    </List>
  );

  const horizontalNav = (
    <List
      className={clsx(
        'navigation whitespace-no-wrap flex p-0',
        classes.navigation,
        classes.horizontalNavigation,
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (
        <MonarchNavItem
          key={_item.id}
          type={`horizontal-${_item.type}`}
          item={_item}
          nestedLevel={0}
          dense={dense}
        />
      ))}
    </List>
  );

  if (navigation.length > 0) {
    switch (layout) {
      case 'horizontal': {
        return horizontalNav;
      }
      case 'vertical':
      default: {
        return verticalNav;
      }
    }
  } else {
    return null;
  }
}

MonarchNavigation.propTypes = {
  navigation: PropTypes.array.isRequired
};

MonarchNavigation.defaultProps = {
  layout: 'vertical'
};

export default React.memo(MonarchNavigation);
