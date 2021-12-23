import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseNavBadge from '../FuseNavBadge';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 48,
    '&.active': {
      color: `${theme.palette.navigation.horizontal.primary.color.active}!important`,
      pointerEvents: 'none',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {},
    '& .list-item-text': {
      padding: '0 0 0 16px',
      margin: '2px 0 0 0'
    },
    color: theme.palette.navigation.horizontal.primary.color.inactive,
    textDecoration: 'none !important'
  },
  icon: {
    color: theme.palette.navigation.horizontal.primary.color.inactive,
    [theme.breakpoints.down('lg')]: {
      fontSize: '2.4rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem'
    },
  }
}));

function FuseNavHorizontalItem(props) {
  const userRole = useSelector(({ auth }) => auth.user.role);

  const classes = useStyles(props);
  const { item } = props;
  const { t } = useTranslation('navigation');

  const hasPermission = useMemo(
    () => FuseUtils.hasPermission(item.auth, userRole),
    [item.auth, userRole]
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx('list-item', classes.root)}
      exact={item.exact}
    >
      {item.icon && (
        <Icon
          className={clsx(classes.icon, 'list-item-icon flex-shrink-0')}
          color="action"
        >
          {item.icon}
        </Icon>
      )}

      <ListItemText
        className="list-item-text"
        primary={item.translate ? t(item.translate) : item.title}
        classes={{ primary: 'list-item-text-primary' }}
      />

      {item.badge && (
        <FuseNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />
      )}
    </ListItem>
  );
}

FuseNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(React.memo(FuseNavHorizontalItem));

export default NavHorizontalItem;
