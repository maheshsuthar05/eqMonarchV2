import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MonarchNavBadge from '../MonarchNavBadge';

const useStyles = makeStyles((theme) => ({
  item: (props) => ({
    height: 40,
    // width: 'calc(100% - 16px)',
    borderRadius: '8px 0px 0px 8px',
    paddingRight: 12,
    paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      // backgroundColor: theme.palette.background.paper,
      color: `${theme.palette.background.paper}!important`,
      boxShadow: theme.shadows[2],
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

function MonarchNavVerticalItem(props) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { item, nestedLevel } = props;
  const classes = useStyles({
    itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
  });
  const { t } = useTranslation('navigation');

  const hasPermission = useMemo(() => item.visible, [item.visible]);

  if (!hasPermission) {
    return null;
  }

  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx(classes.item, item.id)}
      onClick={(ev) => mdDown && dispatch(Actions.navbarCloseMobile())}
      exact={item.exact}
      // data-tour={item.id}
    >
      {item.icon && (
        <Icon className="list-item-icon text-16 flex-shrink-0" color="action">
          {item.icon}
        </Icon>
      )}

      <ListItemText
        className="list-item-text"
        primary={item.translate ? t(item.translate) : item.title}
        classes={{ primary: 'text-12 list-item-text-primary' }}
      />

      {item.badge && <MonarchNavBadge badge={item.badge} />}
    </ListItem>
  );
}

MonarchNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
};

MonarchNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(MonarchNavVerticalItem));

export default NavVerticalItem;
