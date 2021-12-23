import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import MonarchNavBadge from '../MonarchNavBadge';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // '& > *': {
    //   margin: theme.spacing(1)
    // },
    // borderRadius: '8px 8px 0px 0px',
    // borderTop: `1px solid ${theme.palette.divider}`,
    // borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    '&.MuiListItem-root': {
      width: 'auto',
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      borderColor: `${theme.palette.background.paper} ${theme.palette.divider}  ${theme.palette.background.paper} ${theme.palette.divider} `,
      border: '0px solid transparent',
      // borderRadius: '8px 8px 0px 0px',
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: theme.palette.background.paper
        // fontWeight: 'Bold'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {},
    '& .list-item-text': {
      color: theme.palette.text.disabled
    },
    color: theme.palette.text.disabled,
    textDecoration: 'none!important'
  }
}));

function MonarchNavHorizontalItem(props) {
  const classes = useStyles(props);
  const { item } = props;
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
      className={clsx('list-item', classes.root)}
      exact={item.exact}
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

      {item.badge && (
        <MonarchNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />
      )}
    </ListItem>
  );
}

MonarchNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
};

MonarchNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(React.memo(MonarchNavHorizontalItem));

export default NavHorizontalItem;
