import {
  Icon,
  ListItem,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { openModal } from 'app/store/actions';
import AdvanceSearchApp from './AdvanceSearchApp';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import _ from '@lodash';

const AdvanceSearch = () => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const historyLister = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: 35,
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
        padding: '0 0 0 8px',
        margin: '2px 0 0 0'
      },
      color: theme.palette.navigation.horizontal.primary.color.inactive,
      textDecoration: 'none!important',
      display: active ? 'inherit !important' : 'none'
    },
    icon: {
      color: theme.palette.navigation.horizontal.primary.color.inactive,
      [theme.breakpoints.down('lg')]: {
        fontSize: '1.4rem'
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.4rem'
      }
    },
    button: {
      height: '40px',
      padding: '8px 12px 8px 12px',
      minHeight: '40px',
      '&.MuiButton-root': {
        textTransform: 'capitalize'
      }
    },
    IconButton: {
      color: theme.palette.navigation.horizontal.primary.color.inactive
    },
    IconText: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  }));

  const classes = useStyles();
  const rolesList = useSelector(
    ({ TaskManagementApp }) => TaskManagementApp?.claimsTask
  );
  const onAdvanceSearchClick = (event) => {
    event.preventDefault();
    dispatch(
      openModal({
        children: <AdvanceSearchApp roles={rolesList.candidateGroupIn} />,
        title: 'Advance Search',
        maxwidth: 'lg'
      })
    );
  };

  const getFirstItem = (thePath) => {
    const segments = thePath.split('/');
    return `/${segments[1]}/${segments[2]}`;
  };

  useEffect(() => {
    if (!_.isEmpty(historyLister.location.pathname)) {
      const toPath = getFirstItem(historyLister.location.pathname);
      toPath === '/home/dashboard' ? setActive(false) : setActive(true);
    }
  }, [historyLister.location.pathname, active, setActive]);

  return (
    <>
      {active ? (
        <div className={classes.root}>
          <Tooltip title={`Search`} placement={'bottom'}>
            <ListItem
              button
              className={clsx('list-item', classes.root)}
              onClick={onAdvanceSearchClick}
            >
              <Icon
                className={clsx(classes.icon, 'list-item-icon flex-shrink-0')}
                color="action"
              >
                search
              </Icon>

              <ListItemText
                className={clsx('list-item-text', classes.IconText)}
                primary={'Search'}
                classes={{ primary: 'list-item-text-primary' }}
                variant="body1"
              />
            </ListItem>
          </Tooltip>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AdvanceSearch;
