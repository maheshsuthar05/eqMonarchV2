import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FuseNavBadge from '../FuseNavBadge';

import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  item: (props) => ({
    height: 40,
    width: 'calc(100%)',
    marginLeft: 5,
    borderRadius: '8px 0px 0px 8px',
    paddingRight: 12,
    display: 'list-item',
    [theme.breakpoints.down('lg')]: {
      display: 'flex'
    },
    paddingLeft: props.itemPadding > 80 ? 80 : 15,
    '&.active': {
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      marginRight: 16
    },
    '& .list-item-text': {},
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none!important'
  })
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(12),
    left: '-10px'
  }
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
}

function FuseNavVerticalItem(props) {
  const userRole = useSelector(({ auth }) => auth.user.role);
  const dispatch = useDispatch();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { item, nestedLevel } = props;
  const classes = useStyles({
    itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
  });
  const { t } = useTranslation('navigation');

  const hasPermission = useMemo(
    () => FuseUtils.hasPermission(item.auth, userRole),
    [item.auth, userRole]
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <BootstrapTooltip
      title={item.translate ? t(item.translate) : item.title}
      placement="right"
    >
      <ListItem
        button
        component={NavLinkAdapter}
        to={item.url}
        activeClassName="active"
        className={clsx(classes.item)}
        onClick={(ev) => mdDown && dispatch(Actions.navbarCloseMobile())}
        exact={item.exact}
      >
        {item.icon && (
          <Icon className="list-item-icon text-14 flex-shrink-0" color="action">
            {item.icon}
          </Icon>
        )}

        <ListItemText
          className="list-item-text"
          primary={item.translate ? t(item.translate) : item.title}
          classes={{ primary: 'list-item-text-primary' }}
        />

        {item.badge && <FuseNavBadge badge={item.badge} />}
      </ListItem>
    </BootstrapTooltip>
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.any,
    url: PropTypes.string
  })
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;
