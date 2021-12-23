import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import MailChip from '../MailChip';
import {
  convertNameToAvatar,
  convertTimeStamp
} from 'app/common/helpers/common-helper';

import Box from '@material-ui/core/Box';
import * as Actions from '../store/actions/index';

const pathToRegexp = require('path-to-regexp');

const useStyles = makeStyles((theme) => ({
  mailItem: {
    borderBottom: `1px solid  ${theme.palette.divider}`,

    '&.unread': {
      background: 'rgba(97, 218, 251, 0.08)'
    },
    '&.selected': {
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        display: 'block',
        height: '100%',
        width: 3,
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary[500],
    fontSize: '1.5rem'
  }
}));

const MailListItem = (props) => {
  const dispatch = useDispatch();
  const selectedMailIds = useSelector(
    ({ mailApp }) => mailApp.mails.selectedMailIds
  );
  const property = useSelector(
    (state) => state.property.get.property?.property?.propertyId
  );

  const routeParams = useParams();
  const classes = useStyles(props);
  const toPath = pathToRegexp.compile(props.match.path);
  const checked =
    selectedMailIds.length > 0 &&
    selectedMailIds.find((id) => id === props.mail.MESSAGE_ID) !== undefined;
  const param = property
    ? {
        folderHandle: routeParams.folderHandle,
        mailId: undefined,
        propertyId: property
      }
    : routeParams;
  const checkUrl =
    props.match.url === '/mail/inbox' || props.match.url === '/mail/sent'
      ? false
      : property;

  const handleDetailPageRoute = () => {
    checkUrl
      ? props.history.push({
          path: `${props.location.pathname}`,
          state: {
            folderHandle: 'inbox',
            mailId: props.mail.MESSAGE_ID,
            loanId: props.mail.LOAN_NUMBER,
            propertyId: property
          }
        })
      : props.history.push(
          toPath({
            ...param,
            mailId: props.mail.MESSAGE_ID,
            loanId: props.mail.LOAN_NUMBER
          })
        );
  };

  return (
    <ListItem
      dense
      button
      onClick={handleDetailPageRoute}
      className={clsx(
        classes.mailItem,
        checked && 'selected',
        !props.mail.IS_READ && 'unread'
      )}
    >
      <Checkbox
        tabIndex={-1}
        disableRipple
        checked={checked}
        onChange={() =>
          dispatch(Actions.toggleInSelectedMails(props.mail.MESSAGE_ID))
        }
        onClick={(ev) => ev.stopPropagation()}
      />
      <div style={{ width: '100%' }}>
        <Box display="flex">
          <Box
            p={1}
            display="inline-flex"
            width="24%"
            style={{ wordBreak: 'break-word' }}
          >
            <div className="flex" style={{ alignItems: 'center' }}>
              <Avatar className={classes.avatar}>
                {convertNameToAvatar(props.mail.SENDER_ID)}
              </Avatar>
              <Typography variant="subtitle1" className="mx-8">
                {props.mail.SENDER_ID}
              </Typography>
            </div>
          </Box>
          <Box p={1} flexGrow={1} width="62%">
            <Typography variant="subtitle1" className="mx-8">
              {_.truncate(
                props.mail.MAIN_CONTENT.replace(/<(?:.|\n)*?>/gm, ''),
                {
                  length: 100
                }
              )}
            </Typography>
          </Box>
          <Box p={0} fontSize={12} width="14%">
            <Box p={0.5}>{convertTimeStamp(props.mail.CREATED_DATE)}</Box>
            <Box display="flex">
              <Box p={0.5}>
                <MailChip title={props.mail.TENANT_ID} color="#ff7961" />
              </Box>
              <Box p={0.5} style={{ wordBreak: 'break-word' }}>
                <MailChip title={props.mail.LOAN_NUMBER} color="#757ce8" />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </ListItem>
  );
};

export default withRouter(MailListItem);
