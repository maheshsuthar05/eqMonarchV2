import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import MailChip from '../MailChip';
import {
  convertNameToAvatar,
  convertTimeStamp
} from 'app/common/helpers/common-helper';
import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import clsx from 'clsx';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import * as Actions from '../store/actionTypes';
import _ from 'lodash';
import { RiMailLine } from 'react-icons/ri';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  arrowIcon: {
    cursor: 'pointer'
  },
  details: {
    marginLeft: '5%',
    border: '1px solid #d9d9d9',
    padding: '7px',
    width: 'fit-content',
    borderRadius: '5px'
  },
  mailView: {
    [theme.breakpoints.down('lg')]: {
      width: '80%'
    },
    margin: '0 auto',
    border: '2px solid #e2e4ef',
    marginTop: '10px',
    position: 'relative',
    zIndex: '0'
  },
  navArrow: {
    left: '-10px',
    top: '14px'
  },
  mailContent: {
    overflow: 'auto',
    // height: '200px',
    width: '100%',
    paddingTop: '15px',
    color: theme.palette.primary.contrastDark
  },
  avatarBg: {
    background: '#4f4f4f',
    fontSize: '1rem',
    color: theme.palette.primary.contrastText
  },
  selectItem: {
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translate(0%, -50%)',
    color: theme.palette.primary.contrastDark
  },
  mailViewSection: {
    color: theme.palette.primary.contrastDark
  }
}));

function MailDetails(props) {
  const classes = useStyles();
  const theme = useTheme();
  const flwClasses = useFormStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const mail = useSelector(({ mailApp }) => mailApp.mail.mailList);
  const flowable = useSelector(({ mailApp }) => mailApp.flowable);
  const [formButtonState, setFormButtonState] = useState(false);
  const [formPayload, setFormPayload] = useState('');

  let defaultPropertyId = _.has(routeParams, 'caseInstanceId')
    ? routeParams.caseInstanceId
    : null;
  let enableParentId = _.has(routeParams, 'caseInstanceId') ? 'true' : 'false';
  const param = _.has(routeParams, 'caseInstanceId')
    ? {
        folderHandle: 'sent',
        mailId: undefined,
        propertyId: routeParams.caseInstanceId
      }
    : { folderHandle: 'sent' };

  const dispatchMessage = (payload, attachment) => {
    if (!_.has(routeParams, 'caseInstanceId')) {
      payload.mainContent = payload.mainContent.toString().replace(/"/g, "'");
      dispatch({
        type: Actions.POST_MAIL_COMPOSE_DATA,
        data: payload,
        attachment: attachment
      });
    } else {
      payload.parentId = defaultPropertyId;
      payload.mainContent = payload.mainContent.toString().replace(/"/g, "'");
      dispatch({
        type: Actions.POST_MAIL_COMPOSE_DATA,
        data: payload,
        attachment: attachment
      });
    }
    dispatch({ type: Actions.FETCH_MAILS, routeParams: param });
  };

  const sendMailMessage = (data) => {
    const payload = {
       defaultPropertyId,
       enableParentId,
      // fileCategoryType: 'Message',
      // mainContent: formPayload,
      // mainContentType: data.message.mainContentType,
      // parentId: data.message.parentId,
      // recipientId: data.message.recipientId,
      // senderId: data.message.senderId,
      // tags: ', ',
      // tenantId: { tenantID: data.message.tenantId }
      //  defaultPropertyId,
      //  enableParentId,
       from: data.message.senderId,
       fileCategoryType: 'Message',
       propertyId: data.message.parentId,
       to: data.message.recipientId,
       cc: data.message.cc,
       mainContentType: data.message.mainContentType,
       mainContent: data.message.mainContent,
       highImportance: data.message.highImportance,
       tenantId: data.message.tenantId,
       replyToMessageId: null,
       fromPartyRoleType:null,
       threadId:null,
       attachmentDtos:[]
       
    };

    dispatchMessage(payload, null);
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange':
        if (_.has(api.payload.get(), 'mainContent')) {
          setFormButtonState(api.formValid());
          setFormPayload(api.payload.get().mainContent);
        }
        break;
      default:
        break;
    }
  };

  if (props.mailModified) {
    return null;
  }

  return !mail ? (
    <div className={clsx('flex w-full flex-wrap', classes.selectItem)}>
      <div className="flex w-full justify-center">
        <RiMailLine className={clsx(theme.icons.fontSize, 'm-auto')} />
      </div>
      <div className="flex w-full justify-center">
        <span>Select an item to read</span>
      </div>
    </div>
  ) : (
    <div>
      <div className={clsx('w-full flex flex-wrap', classes.mailViewSection)}>
        <div className="flex w-full">
          <Typography variant="subtitle1" className="flex">
            {mail?.message?.mainContentType}
          </Typography>
        </div>

        <div className="flex w-full">
          <MailChip
            className="mt-4 mx-2"
            title={mail?.message?.tenantId}
            color="red"
          />
         </div>

        <div className="flex w-full pt-8">
          <div className="flex w-2/4">
            <Avatar className={classes.avatarBg}>
              {convertNameToAvatar(mail?.message?.senderId)}
            </Avatar>
            <div className="flex flex-wrap flex-col w-2/4 pl-8">
              <div className="font-bold pb-4">{mail?.message?.senderId}</div>
              <div>
                {' '}
                To <span className="pl-4">{mail?.message?.recipientId}</span>
              </div>
              <div>
                {' '}
                cc <span className="pl-4">{mail?.message?.cc}</span>
              </div>
            </div>
          </div>
          <div className="flex w-2/4 justify-end">
            {convertTimeStamp(mail?.message?.createdDate, true)}
          </div>
        </div>
      </div>
      <div className={clsx('flex flex-wrap', classes.mailContent)}>
        <div className="flex w-full mb-10">
          <Typography
            dangerouslySetInnerHTML={{ __html: mail?.message?.mainContent }}
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap messagingBox">
        <div className="flex w-full">
          {!flowable['Mail_Message_Reply']?.processed ? (
            <FuseLoading />
          ) : (
            <Form
              debug={false}
              config={flowable['Mail_Message_Reply'].formDef}
              onEvent={onEventHandler}
              className={clsx(flwClasses.form, '')}
            />
          )}
        </div>
        <div className="flex w-full justify-end mt-10">
          <MonarchButton
            onClick={() => sendMailMessage(mail)}
            color="primary"
            variant="contained"
            size="small"
            disabled={!formButtonState}
          >
            Send
          </MonarchButton>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MailDetails);
