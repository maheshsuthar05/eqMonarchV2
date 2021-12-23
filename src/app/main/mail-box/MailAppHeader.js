import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  layoutRoot: {},
  root: {
    // border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    height: '38px'
  }
});

function MailAppHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);
  const { t } = useTranslation('mailApp');
  const routeParams = useParams();
  const classes = useStyles();

  return (
    <div className={clsx('flex flex-1', classes.root)}>
      <Paper className="flex items-center w-full" elevation={0}>
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
            aria-label="open left sidebar"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>

        {/* <Icon color="action">search</Icon> */}

        {/* <Input
          placeholder={t('SEARCH')}
          className="px-16"
          disableUnderline
          type="search"
          fullWidth
          value={searchText}
          inputProps={{
            'aria-label': 'Search'
          }}
          onChange={(ev) => dispatch(Actions.setSearchText(ev, routeParams))}
        /> */}
      </Paper>
    </div>
  );
}

export default MailAppHeader;
