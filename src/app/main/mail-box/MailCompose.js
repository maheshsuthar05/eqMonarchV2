import React, { useEffect, useRef, useState } from 'react';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { useDispatch, useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import * as Actions from './store/actionTypes';
import { Form } from '@flowable/forms';
import { useParams, withRouter } from 'react-router-dom';
import { closeModal, openModal } from 'app/store/actions';
import { IconButton } from '@material-ui/core';
import _ from 'lodash';
import * as actions from 'app/common/store/actionTypes';
import { updateModal } from 'app/store/actions';
import { FiSend } from 'react-icons/fi';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import MonarchButton from '@monarch/core/MonarchButton/MonarchButton';
import clsx from 'clsx';
import { useFormStyles } from '@monarch/Flowable/useStyles';

const MailCompose = (props) => {
  const user = useSelector(({ auth }) => auth.user);
  const theme = useTheme();
  const flwClasses = useFormStyles();
  const stateAction = useSelector(({ mailApp }) => mailApp.compose.stateAction);
  const formDefinition = useSelector(
    ({ mailApp }) => mailApp.compose.formDefinition
  );
  const attachments = useSelector(({ fileUpload }) => fileUpload.uploadDetails);
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const routeParams = useParams();
  const mailComposeFormData = useSelector(
    ({ common }) => common.flowableFormData.formData
  );
  const formPayloadRef = useRef({});
  formPayloadRef.current = mailComposeFormData;
  const additionalData = {
    additionalData: {
      userType: user.data.userType.toLowerCase()
    }
  };
  const property =useSelector(({property})=> property.get?.property?.property);
  let defaultPropertyId = property?.propertyId ;

   useEffect(() => {
     defaultPropertyId = property?.propertyId
    },[property]);
  
  let enableParentId = _.has(routeParams, 'caseInstanceId') ? 'true' : 'false';
  const param = _.has(routeParams, 'caseInstanceId')
    ? {
        folderHandle: 'sent',
        mailId: undefined,
        propertyId: property?.propertyId
      }
    : { folderHandle: 'sent' };

  let tenantEncodedValue = user.data.encodedValue;

  if (!_.has(routeParams, 'caseInstanceId')) {
    defaultPropertyId = null;
    enableParentId = 'false';
  } else {
    tenantEncodedValue = user.data.encodedValue.filter((tenant) => {
      if (tenant.tenantID === user.tenantCode) {
        return tenant;
      }
      return false;
    });
  }

  useEffect(() => {
    if (isMounted.current) {
      dispatch({ type: Actions.GET_MAIL_COMPOSE_FORM });
      dispatch({ type: 'FETCH_LIST_OF_PROPERTIES' });
    }
  }, [isMounted, attachments.uploaded, dispatch]);

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

  const onFormButtonHandler = () => {
    dispatchMessage(formPayloadRef.current, null);
    dispatch(closeModal());
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Payload.afterChange' || 'Payload.beforeChange':
        if (api.formValid()) {
          dispatch({
            type: actions.GET_FLOWABLE_FORM_DATA_START,
            payload: api.payload.get()
          });
          dispatch(updateModal(api.formValid()));
        }
        break;
      default:
        break;
    }
    return true;
  };

  function handleOpenDialog() {
    dispatch(
      openModal({
        children: (
          <>
            {!stateAction ? (
              <FuseLoading />
            ) : (
              <div className="bg-white">
                <Form
                  debug={false}
                  onEvent={onEventHandler}
                  config={formDefinition}
                  additionalData={additionalData}
                  className={clsx(flwClasses.form, '')}
                  payload={{
                    senderId: user.data.userName,
                    tenantList: tenantEncodedValue,
                    defaultPropertyId: defaultPropertyId,
                    enableParentId: enableParentId
                  }}
                />
              </div>
            )}
          </>
        ),
        title: 'New Message',
        maxwidth: 'md',
        buttons: (
          <>
            <MonarchButton
              onClick={onFormButtonHandler}
              color="primary"
              variant="contained"
              size="small"
              disabled
            >
              {'Send'}
            </MonarchButton>
          </>
        )
      })
    );
  }

  return (
    <Tooltip title="Compose Mail">
      <IconButton
        color="primary"
        aria-label="maximize"
        component="span"
        onClick={(ev) => handleOpenDialog(ev)}
        size="small"
      >
        <FiSend className={theme.icons.fontSize} />
      </IconButton>
    </Tooltip>
  );
};

export default withRouter(MailCompose);
