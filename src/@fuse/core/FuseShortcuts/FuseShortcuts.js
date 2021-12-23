import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import { amber } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import * as UserActions from 'app/auth/store/actions';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { openModal } from 'app/store/actions';
import { RiPaletteLine } from 'react-icons/ri';
import FuseThemeSchemes from '@fuse/core/FuseThemeSchemes';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.horizontal': {},
    '&.vertical': {
      flexDirection: 'column'
    }
  },
  item: {
    textDecoration: 'none!important',
    color: 'inherit'
  },
  addIcon: {
    color: amber[600]
  },
  IconButton: {
    color: theme.palette.navigation.horizontal.primary.color.inactive
  },
  icon: {
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.4rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4rem'
    }
  }
}));

function FuseShortcuts(props) {
  const dispatch = useDispatch();
  const shortcuts = useSelector(({ auth }) => auth.user.data.shortcuts);
  const navigationData = useSelector(({ fuse }) => fuse.navigation);
  const unreadMails = useSelector((state) => state.mailApp?.counter?.count);
  const classes = useStyles(props);
  const searchInputRef = useRef(null);
  const [addMenu, setAddMenu] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [navigation, setNavigation] = useState(null);

  const handleOpenDialog = (ev) => {
    ev.preventDefault();
    dispatch(
      openModal({
        title: 'Theme Color Schemes',
        children: <FuseThemeSchemes />,
        maxwidth: 'lg'
      })
    );
  };

  const shortcutItems = [
    {
      badge: true,
      icon: 'email',
      id: 'mail',
      title: 'Mail',
      translate: 'MAIL',
      type: 'item',
      url: '/mail/inbox'
    }
  ];

  useEffect(() => {
    function flattenNavigation() {
      setNavigation(FuseUtils.getFlatNavigation(navigationData));
    }

    flattenNavigation();
  }, [props.location, navigationData]);

  function addMenuClose() {
    setAddMenu(null);
  }

  function search(ev) {
    const newSearchText = ev.target.value;

    setSearchText(newSearchText);

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(
        navigation.filter((item) =>
          item.title.toLowerCase().includes(newSearchText.toLowerCase())
        )
      );
      return;
    }
    setSearchResults(null);
  }

  function toggleInShortcuts(id) {
    let newShortcuts = [...shortcuts];
    newShortcuts = newShortcuts.includes(id)
      ? newShortcuts.filter((_id) => id !== _id)
      : [...newShortcuts, id];
    dispatch(UserActions.updateUserShortcuts(newShortcuts));
  }

  function ShortcutMenuItem({ item, onToggle }) {
    return (
      <Link to={item.url} className={classes.item} role="button">
        <MenuItem key={item.id}>
          <ListItemIcon className="min-w-40">
            {item.icon ? (
              <Icon>{item.icon}</Icon>
            ) : (
              <span className="text-20 font-bold uppercase text-center">
                {item.title[0]}
              </span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              onToggle(item.id);
            }}
          >
            <Icon color="action">
              {shortcuts.includes(item.id) ? 'star' : 'star_border'}
            </Icon>
          </IconButton>
        </MenuItem>
      </Link>
    );
  }

  return (
    <div
      className={clsx(
        classes.root,
        props.variant,
        'flex flex-none',
        props.variant === 'vertical' && 'flex-grow-0 flex-shrink',
        props.className
      )}
    >
      <FuseAnimateGroup
        enter={{
          animation: 'transition.expandIn'
        }}
        className={clsx(
          'flex flex-1',
          props.variant === 'vertical' && 'flex-col'
        )}
      >
        {shortcutItems.map(
          (item) =>
            item && (
              <Link
                to={item.url}
                key={item.id}
                className={classes.item}
                role="button"
              >
                <Tooltip
                  title={item.title}
                  placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
                >
                  <IconButton
                    className={clsx(classes.IconButton, 'w-20 h-40 p-0')}
                    size="small"
                  >
                    {item.icon && item.badge && unreadMails > 0 ? (
                      <Badge color="secondary" variant="dot">
                        <Icon className={clsx(classes.icon, '')}>
                          {item.icon}
                        </Icon>
                      </Badge>
                    ) : (
                      <Icon className={clsx(classes.icon, '')}>
                        {item.icon}
                      </Icon>
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Theme Color Schemes">
                  <IconButton
                    className={clsx(classes.IconButton, 'w-40 h-40 p-0')}
                    aria-label="maximize"
                    component="span"
                    onClick={(ev) => handleOpenDialog(ev)}
                  >
                    <RiPaletteLine className={clsx(classes.icon, '')} />
                  </IconButton>
                </Tooltip>
              </Link>
            )
        )}
      </FuseAnimateGroup>

      <Menu
        id="add-menu"
        anchorEl={addMenu}
        open={Boolean(addMenu)}
        onClose={addMenuClose}
        classes={{
          paper: 'mt-48'
        }}
        onEntered={() => {
          searchInputRef.current.focus();
        }}
        onExited={() => {
          setSearchText('');
        }}
      >
        <div className="p-16 pt-8">
          <Input
            inputRef={searchInputRef}
            value={searchText}
            onChange={search}
            placeholder="Search for an app or page"
            className=""
            fullWidth
            inputProps={{
              'aria-label': 'Search'
            }}
          />
        </div>

        <Divider />

        {searchText.length !== 0 &&
          searchResults &&
          searchResults.map((item) => (
            <ShortcutMenuItem
              key={item.id}
              item={item}
              onToggle={() => toggleInShortcuts(item.id)}
            />
          ))}

        {searchText.length !== 0 && searchResults.length === 0 && (
          <Typography color="textSecondary" className="p-16 pb-8">
            No results..
          </Typography>
        )}

        {searchText.length === 0 &&
          shortcutItems.map(
            (item) =>
              item && (
                <ShortcutMenuItem
                  key={item.id}
                  item={item}
                  onToggle={() => toggleInShortcuts(item.id)}
                />
              )
          )}
      </Menu>
    </div>
  );
}

FuseShortcuts.propTypes = {};
FuseShortcuts.defaultProps = {
  variant: 'horizontal'
};

export default React.memo(FuseShortcuts);
