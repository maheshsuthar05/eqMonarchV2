import { Form } from '@flowable/forms';
import FuseLoading from '@fuse/core/FuseLoading';
import history from '@history';
import MonarchButton from "@monarch/core/MonarchButton/MonarchButton";
import ShowMessage from 'app/common/components/ShowMessage';
import { OfferApiConfig } from 'app/config/api';
import * as FlowableActions from 'app/config/flowable-core/store/actions';
import * as FlowableActionTypes from 'app/config/flowable-core/store/actionTypes';
import OfferContactPopup from 'app/main/offer/components/OfferContactPopup';
import * as OfferActions from 'app/main/offer/store/actions';
import reducer from 'app/main/offer/store/reducers';
import * as Actions from 'app/store/actions';
import { openModal } from 'app/store/actions';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OfferWorksheet from '../offer-worksheet/OfferWorksheet';
import * as CommonActions from 'app/common/store/actionTypes';
import { hasAccess } from 'app/common/helpers/common-helper';
import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
import OfferSendWorksheet from '../offer-send-worksheet/OfferSendWorksheet';
import MonarchPageCarded from '@monarch/core/MonarchPageCarded';
import useIsMounted from 'app/common/hooks/useIsMounted';
import { fetchFormByProcess } from 'app/config/flowable-core/store/actions';
import clsx from 'clsx';

import { useFormStyles } from '@monarch/Flowable/useStyles';

function PropertyOfferListPage(props) {
  const { caseInstanceId, offerType } = useParams();
  const isMounted = useIsMounted();
  const [offerDetails, setOfferDetails] = useState([]);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const pageLayout = useRef(null);
  const dispatch = useDispatch();
  const flwClasses = useFormStyles();
  const flowable = useSelector(({ offer }) => offer.flowable);

  const contextResources = useSelector(
    ({ common }) => common.IAMResource.contextResources
  );

  const propertyId = useSelector(
    ({ property }) => property.get.property?.property?.propertyId
  );

  const propertyDetails = useSelector(({ property }) => property.get.property);

  const user = useSelector(({ auth }) => auth.user);

  const additionalData = {
    additionalData: {
      url: OfferApiConfig.api.property_offer_listing,
      canViewKeyParites: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Key_Parties
      ),
      canEdit: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Edit_Offer
      ),
      canViewOfferActionNegotiate: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Negotiate
      ),
      canViewOfferActionRejectAvailable: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Reject_Available
      ),
      canViewOfferActionHoldAccept: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Accept
      ),
      canViewOfferActionSendWorksheet: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Send_Worksheet
      ),
      canViewOfferActionViewClosingTasks: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_View_Closing_Tasks
      ),
      canViewOfferActionViewWorksheet: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_View_Worksheet
      ),
      canViewOfferActionReject: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Reject
      ),
      canViewOfferActionHandB: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Highest_Best
      ),
      canViewOfferActionRejectAll: hasAccess(
        contextResources,
        resourceKeys.Property_Details_Tab_Offers_Action_Reject_All
      ),
      propertyId: propertyId,
      searchText: offerType === undefined ? '' : offerType
    }
  };

  let editedOfferDetails = {};

  useEffect(() => {
    if (isMounted.current) {
      dispatch({
        type: 'FLOWABLE_PROCESS_DEFINITION_BY_JSON',
        path: 'offer',
        fileNames: ['edit_offer_form_def', 'offer_worksheet_form_def'],
        formAction: OfferActions.OFFERS_FORMDEFIINITION
      });
    }
  }, [dispatch, isMounted]);

  const showEditOfferPopup = (formPayload) => {
    const data = {
      ...formPayload,
      appPropertyId: propertyId,
      offerVersionId: formPayload?.REO_OFFER_VERSION_ID,
      reoOfferId: formPayload?.REO_OFFER_ID
    };

    dispatch(
      openModal({
        children: !flowable['edit_offer_form_def'].processed ? (
          <FuseLoading />
        ) : (
          <div className="propertyPageContent">
            <Form
              config={flowable['edit_offer_form_def'].formDef}
              onEvent={onEditEventHandler}
              payload={data}
              className={clsx(flwClasses.form)}
            />
          </div>
        ),
        title: 'Edit Offer',
        maxwidth: 'xl',
        buttons: (
          <>
          <MonarchButton
              onClick={handleClose}
              color="primary"
              variant="contained"
              size="small"
            >
              {"Save"}
            </MonarchButton>
            {/* <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              size="small"
            >
              {'Save'}
            </Button> */}
          </>
        )
      })
    );
  };

  const onEditEventHandler = (eventName, config, state, api) => {
    editedOfferDetails = api.payload.get();
  };

  const handleClose = () => {
    offerActionSaveHandler(editedOfferDetails, 'Edit');
    dispatch(Actions.closeModal());
  };

  const formDefinition = useSelector(({ flowable }) => flowable.formDefinition);

  useEffect(() => {
    if (formDefinition.triggerEventSuccess) {
      setUpdateInProgress(false);
      dispatch(FlowableActions.flowableProcessResetState());
      history.push(`/property/details/${caseInstanceId}`);
    }
  }, [formDefinition.triggerEventSuccess, dispatch, caseInstanceId]);

  useEffect(() => {
    dispatch(FlowableActions.flowableProcessResetState());
  }, [dispatch]);

  useEffect(() => {
    if (propertyId) {
      dispatch(
        fetchFormByProcess(
          user.tenantCode,
          OfferApiConfig.keys.offer_lising_with_versions,
          OfferApiConfig.keys.offer_lising_with_versions
        )
      );
    }
  }, [dispatch, propertyId, user.tenantCode]);

  const offerActionSaveHandler = (formPayload, offerAction) => {
    setUpdateInProgress(true);
    const offerFormDefinition =
      offerAction.toLowerCase() === 'edit'
      ? flowable['edit_offer_form_def'].formDef
      : formDefinition[OfferApiConfig.keys.offer_lising_with_versions]
          .formDef;

    const argumentsData = OfferActions.getOfferActionsPayload(
      propertyId,
      offerAction,
      offerFormDefinition,
      formPayload,
      user.tenantCode,
      propertyDetails
    );
    dispatch({
      type: FlowableActionTypes.FLOWABLE_TRIGGER_EVENT_BY_EXECUTION_ID_START,
      data: argumentsData
    });
  };

  const onEventHandler = (eventName, config, state, api) => {
    switch (eventName) {
      case 'Modal.close': {
        const payload = api.payload.get();
        if (payload?.showConfirmationModel === true) {
          api.payload.set('showConfirmationModel', false);
        }
        break;
      }
      case 'Component.focus': {
        setContactPopupOpen(false);
        break;
      }
      case 'Button.click': {
        setContactPopupOpen(false);
        const payload = api.payload.get();
        if (
          config?.extraSettings?.script?.key === 'Edit' &&
          payload?.showConfirmationModel !== true
        ) {
          showEditOfferPopup(config?.extraSettings?.script?.offerDetails);
        } else if (config?.extraSettings?.script?.key === 'KeyParties') {
          setContactPopupOpen(!contactPopupOpen);
          setOfferDetails(config?.extraSettings?.script?.offerDetails);
        } else if (config?.extraSettings?.script === 'save') {
          setOfferDetails(
            payload?.selectedOffer?.offerActionButton?.offerDetails
          );
          offerActionSaveHandler(payload, 'Edit');
        } else if (
          config?.extraSettings?.script?.key === 'Negotiate' ||
          config?.extraSettings?.script?.key === 'RejectAvailable' ||
          config?.extraSettings?.script?.key === 'HoldAccept' ||
          config?.extraSettings?.script?.key === 'HIGHESTANDBEST' ||
          config?.extraSettings?.script?.key === 'Reject' ||
          config?.extraSettings?.script?.key === 'RejectAll'
        ) {
          setOfferDetails(config?.extraSettings?.script?.offerDetails);
          offerActionSaveHandler(
            config?.extraSettings?.script?.offerDetails,
            config?.extraSettings?.script?.key
          );
        } else if (config?.extraSettings?.script?.key === 'SendWorksheet') {
          setOfferDetails(config?.extraSettings?.script?.offerDetails);
          sendOfferWorkSheet(config?.extraSettings?.script?.offerDetails);
        } else if (config?.extraSettings?.script?.key === 'ViewClosingTasks') {
        } else if (config?.extraSettings?.script?.key === 'ViewWorksheet') {
          setOfferDetails(config?.extraSettings?.script?.offerDetails);
          viewWorkSheet(config?.extraSettings?.script?.offerDetails);
        }
        break;
      }
      default:
        break;
    }
    return true;
  };

  const viewWorkSheet = (offerData) => {
    dispatch({ type: 'RESET_FILE_UTILITY' });
    dispatch({
      type: CommonActions.CHECK_TEMPLATE_START,
      templateDetails: {
        templateKey: 'OFFERWORKSHEET'
      }
    });
    viewWorkSheetPopup();
    dispatch(OfferActions.getOfferWorkSheetData(offerData));
  };

  const viewWorkSheetPopup = () => {
    dispatch(
      openModal({
        children: (
          <>
            <OfferWorksheet />
          </>
        ),
        title: 'Offer Worksheet',
        maxwidth: 'md',
        buttons: <></>
      })
    );
  };

  const sendOfferWorkSheet = (offerData) => {
    dispatch(OfferActions.showSendWorkSheetPopup(offerData));
  };

  return (
    <MonarchPageCarded
      {...props}
      contentTitle={'Offers'}
      contentToolbar={<></>}
      leftSidebarContent={<></>}
      ref={pageLayout}
      content={
        !formDefinition[OfferApiConfig.keys.offer_lising_with_versions]?.processed ? (
          <FuseLoading />
        ) : (
          <>
            {contactPopupOpen && (
              <OfferContactPopup
                offerId={offerDetails?.REO_OFFER_ID}
                offerDetails={offerDetails}
                openPopup={contactPopupOpen}
                key={`offerContacts`}
              />
            )}
            <ShowMessage show={updateInProgress} message="Please wait..." />
            <Form
             className={clsx(flwClasses.form)}
              config={
                formDefinition[OfferApiConfig.keys.offer_lising_with_versions]
                  ?.formDef
              }
              onEvent={onEventHandler}
              additionalData={{ ...additionalData }}
              ref={pageLayout}
            />
            <OfferSendWorksheet />
          </>
        )
      }
    />
  );
}

export default withReducer('offer', reducer)(PropertyOfferListPage);
