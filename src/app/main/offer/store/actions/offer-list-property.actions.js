import * as actions from '../actionTypes';
import { OfferApiConfig } from 'app/config/api';
import FlowableHelper from 'app/common/helpers/flowable-helper';
import { contextInfo } from 'app/common/helpers/common-helper';
import { fileCategoryType } from 'app/common/constants';

export const getOfferStatus = (data) => ({
  type: actions.GET_OFFER_STATUS_START,
  payload: data
});

export const getOfferList = (data) => ({
  type: actions.GET_PROPERTY_OFFER_LIST_START,
  payload: data
});

export const filterOfferList = (filterBy) => ({
  type: actions.FILTER_PROPERTY_OFFER_LIST_START,
  filterBy: filterBy
});

export const offerListViewType = (viewType) => ({
  type: actions.PROPERTY_OFFER_LIST_VIEW_TYPE_START,
  viewType: viewType
});

export const getOfferListWithVersions = () => ({
  type: actions.GET_PROPERTY_OFFER_LIST_WITH_VERSION_START
});

export const getOfferActionsPayload = (
  propertyId,
  offerAction,
  offerFormDefinition,
  formPayload,
  tenantCode,
  propertyDetails
) => {
  let data = FlowableHelper.buildPayload(offerFormDefinition, formPayload);
  const offerData = formPayload;
  data = [
    ...data,
    {
      name: 'offerAction',
      type: 'string',
      value: offerAction
    },
    {
      name: 'reoOfferVersionId',
      type: 'string',
      value: offerData?.REO_OFFER_VERSION_ID
    },
    {
      name: 'reoOfferId',
      type: 'string',
      value: offerData?.REO_OFFER_ID
    },
    {
      name: 'appPropertyId',
      type: 'string',
      value: propertyId
    },
    {
      name: 'sequenceNumber',
      type: 'string',
      value: offerData?.SEQUENCE_NUMBER.toString()
    },
    {
      name: 'offerStatusDescription',
      type: 'string',
      value: offerData?.OFFER_STATUS_TYPE
    },
    {
      name: 'offerStatusType',
      type: 'string',
      value: offerData?.OFFER_STATUS_TYPE
    },
    {
      name: 'investorCode',
      type: 'string',
      value: propertyDetails?.investorLoanInformations[0].investorCode
    },
    {
      name: 'miCode',
      type: 'string',
      value: propertyDetails?.miData[0].miCode
    }
  ];

  const argumentsData = {
    data: data,
    tenantId: tenantCode,
    signal: OfferApiConfig.keys.signal,
    signalName: OfferApiConfig.keys.signalName,
    activityId: OfferApiConfig.keys.activityId,
    eventName: OfferApiConfig.keys.eventName,
    processBusinessKey: propertyId,
    processDefinitionKey: OfferApiConfig.keys.omsProcessDefinitionKey
  };

  return argumentsData;
};

export const getOfferWorkSheetData = (
  offerData,
  options = { uploadFile: false, fileCategoryType: '' }
) => ({
  type: actions.GET_OFFER_WORKSHEET_DATA_START,
  offerData: offerData,
  options: options
});

export const getOfferCount = () => ({
  type: actions.GET_OFFER_COUNT_START
});

export const getOfferCountData = (offerCount) => {
  const offerCounts = [
    {
      key: 'New',
      color: 'green',
      count: offerCount.new,
      type: 'New',
      urlEnable: true
    },
    {
      key: 'Accepted',
      color: '',
      count: offerCount.accepted,
      type: 'Accepted',
      urlEnable: true
    },
    {
      key: 'Negotiating',
      color: 'blue',
      count: offerCount.negotiating,
      type: 'Negotiating',
      urlEnable: true
    },
    {
      key: 'Held',
      color: 'orange',
      count: offerCount.held,
      type: 'Held',
      urlEnable: true
    },
    {
      key: 'Rejected',
      color: 'red',
      count: offerCount.rejected,
      type: 'Rejected',
      urlEnable: true
    }
  ];
  return offerCounts;
};

export const restOfferMailPayload = () => ({
  type: actions.GET_OFFER_MAIL_PAYLOAD_RESET
});

export const getOfferMailPayload = (data) => ({
  type: actions.GET_OFFER_MAIL_PAYLOAD_START,
  data: data
});

export const showSendWorkSheetPopup = (offerData) => ({
  type: actions.SHOW_SEND_WORK_SHEET_POPUP,
  offerData: offerData
});

export const hideSendWorkSheetPopup = () => ({
  type: actions.HIDE_SEND_WORK_SHEET_POPUP
});

export const getOfferMailInitialPayload = (data) => {
  const payload = {};
  const additionalData = {};
  if (data.source === 'OFFERWORKSHEET') {
    const contextData = contextInfo();
    const CC_ITEMS = [
      {
        text: 'None',
        value: 'none',
        checked: true
      },
      {
        text: 'Other',
        value: 'other'
      }
    ];
    if (data.sellingAgent.Email !== '') {
      CC_ITEMS.splice(1, 0, {
        text:
          data.sellingAgent.Name === ''
            ? data.sellingAgent.Email
            : data.sellingAgent.Name,
        value: data.sellingAgent.Email
      });
    }
    const address = `${data.property?.propertyAddresses[0]?.addressLineText},${data.property?.propertyAddresses[0]?.cityName}, ${data.property?.propertyAddresses[0]?.stateCode},${data.property?.propertyAddresses[0]?.postalCode}`;
    const defaultSubject = `${data?.OFFER_IDENTITY_TYPE}- Offer Worksheet Attached: ${address}`;
    const defaultMessage = `A PDF version of the Offer Worksheet for ${address} is attached to the email.`;
    payload.uiVariable = {
      ccItems: CC_ITEMS
    };
    payload.offerData = data;
    payload.id = contextData.username;
    payload.recipientId =
      data.auctionCompany.Email !== '' ? [data.auctionCompany.Email] : [];
    payload.ccRecipientId = CC_ITEMS[0].value;
    payload.tenantId = { tenantID: data.user.tenantCode };
    payload.mainContentType = defaultSubject;
    payload.mainContent = defaultMessage;
    payload.fileCategoryType = fileCategoryType.MESSAGE;
    payload.senderId = data.user.data.userName;
    payload.tenantList = data.user.data.encodedValue;
    payload.defaultPropertyId = data.property?.property?.propertyId;
    payload.parentId = data.property?.property?.propertyId;
    payload.enableParentId = data.property?.property?.propertyId
      ? 'true'
      : 'false';
    payload.offerWorkSheet = true;
    additionalData.additionalData = {
      userType: data.user.data.userType.toLowerCase()
    };
  }
  return {
    payload: payload,
    additionalData: additionalData
  };
};
