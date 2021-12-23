import FuseLoading from '@fuse/core/FuseLoading';
import { Button } from '@material-ui/core';
import ShowMessage from 'app/common/components/ShowMessage';
import * as CommonActions from 'app/common/store/actionTypes';
import MailCompose from 'app/main/mail-box/offer/MailCompose';
import * as Actions from 'app/main/mail-box/store/actionTypes.js';
import reducer from 'app/main/mail-box/store/reducers';
import * as OfferActions from 'app/main/offer/store/actions';
import {
  getOfferMailPayload,
  restOfferMailPayload
} from 'app/main/offer/store/actions';
import { closeModal, openModal, updateModal } from 'app/store/actions';
import withReducer from 'app/store/withReducer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OfferSendWorksheet = (props) => {
  const dispatch = useDispatch();
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [sendFlag, setSendFlag] = useState(false);
  const [formPayload, setFormPayload] = useState({});
  const formPayloadRef = useRef({});
  formPayloadRef.current = formPayload;
  const saveInProgresRef = useRef({});
  saveInProgresRef.current = saveInProgress;
  let eventHandlers = null;
  const { fileDetails, fileGenerated } = useSelector(
    ({ common }) => common.downloadFile
  );
  const {
    offerMailPayload,
    offerMailAdditionalData,
    offerSendWorkSheetPopup,
    offerWorkSheetDataLoaded
  } = useSelector(({ offer }) => offer.offerList);

  const modalDialog = useSelector(({ fuse }) => fuse.modalDialog.state);
  const user = useSelector(({ auth }) => auth.user);
  const property = useSelector(({ property }) => property.get.property);

  useEffect(() => {
    if (offerSendWorkSheetPopup.show) {
      dispatch({ type: 'RESET_FILE_UTILITY' });
      dispatch({
        type: CommonActions.CHECK_TEMPLATE_START,
        templateDetails: {
          templateKey: 'OFFERWORKSHEET'
        }
      });
      dispatch(restOfferMailPayload());
      dispatch(
        getOfferMailPayload({
          ...offerSendWorkSheetPopup.offerData,
          source: 'OFFERWORKSHEET',
          user: user,
          property: property
        })
      );
    }
  }, [
    offerSendWorkSheetPopup.show,
    offerSendWorkSheetPopup.offerData,
    user,
    property,
    dispatch
  ]);

  const handleClose = useCallback(() => {
    setSaveInProgress(false);
    setSendFlag(false);
    dispatch(closeModal());
    dispatch(OfferActions.hideSendWorkSheetPopup());
  }, [dispatch]);

  const dispatchMessage = useCallback(() => {
    const payload = { ...formPayloadRef.current };
    setSendFlag(true);
    setSaveInProgress(true);
    dispatch(updateModal(false));
    if (
      payload.hasOwnProperty('offerWorkSheet') &&
      payload.offerWorkSheet === true
    ) {
      const options = {
        uploadFile: payload.offerWorkSheet,
        fileCategoryType: payload?.fileCategoryType
      };
      dispatch(
        OfferActions.getOfferWorkSheetData(
          formPayloadRef.current.offerData,
          options
        )
      );
    } else {
      dispatch({
        type: Actions.POST_MAIL_COMPOSE_DATA,
        data: payload,
        attachment: null
      });
      handleClose();
    }
  }, [dispatch, handleClose]);

  const sendOfferWorkSheetPopup = useCallback(() => {
    dispatch(
      openModal({
        children: (
          <>
            {!offerMailPayload.loaded ? (
              <FuseLoading />
            ) : (
              <>
                <MailCompose
                  payload={offerMailPayload}
                  additionalData={offerMailAdditionalData}
                  eventHandlers={eventHandlers}
                  source="OFFERWORKSHEET"
                />
                <ShowMessage
                  show={saveInProgresRef.current}
                  message="Processing please wait..."
                />
              </>
            )}
          </>
        ),
        title: 'Send Offer Worksheet',
        maxwidth: 'md',
        buttons: (
          <>
            <Button
              onClick={dispatchMessage}
              color="primary"
              variant="contained"
              size="small"
            >
              {'Send'}
            </Button>
          </>
        )
      })
    );
  }, [
    dispatch,
    dispatchMessage,
    eventHandlers,
    offerMailAdditionalData,
    offerMailPayload
  ]);

  useEffect(() => {
    if (offerMailPayload.loaded && offerSendWorkSheetPopup.show) {
      sendOfferWorkSheetPopup();
    }
  }, [
    offerMailPayload.loaded,
    offerSendWorkSheetPopup.show,
    dispatch,
    sendOfferWorkSheetPopup
  ]);

  useEffect(() => {
    if (!modalDialog) {
      dispatch(OfferActions.hideSendWorkSheetPopup());
    }
  }, [modalDialog, dispatch]);

  useEffect(() => {
    if (sendFlag && offerWorkSheetDataLoaded && fileGenerated) {
      dispatch({
        type: Actions.POST_MAIL_COMPOSE_DATA,
        data: { ...formPayloadRef.current },
        attachment: [...fileDetails]
      });
      dispatch({ type: '[FILE UPLOAD] RESET_UPLOAD' });
      handleClose();
    }
  }, [
    offerWorkSheetDataLoaded,
    fileGenerated,
    sendFlag,
    fileDetails,
    dispatch,
    handleClose
  ]);

  eventHandlers = {
    onEventHandler: (eventName, config, state, api) => {
      switch (eventName) {
        case 'Payload.afterChange':
          dispatch(updateModal(api.formValid()));
          if (api.formValid()) {
            setFormPayload(api.payload.get());
          }
          break;
        default:
          break;
      }
    }
  };
  return <></>;
};

export default withReducer('mailApp', reducer)(OfferSendWorksheet);
