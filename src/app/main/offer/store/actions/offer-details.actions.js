import * as actions from '../actionTypes';

export const getOfferDetails = (data) => ({
  type: actions.GET_OFFER_DETAILS_START,
  offerDetails: data
});

export const updateOfferDetails = (data) => ({
  type: actions.UPDATE_OFFER_DETAILS_START,
  data: data
});

export const updateOfferDetailsSuccess = () => ({
  type: actions.UPDATE_OFFER_DETAILS_SUCCESS
});

export const updateOfferDetailsFailure = () => ({
  type: actions.UPDATE_OFFER_DETAILS_FAILURE
});

export const saveOfferDetails = (data) => ({
  type: actions.SAVE_OFFER_DETAILS_START,
  payload: data
});

export const setOfferDetailsActiveTab = (tabIndex) => ({
  type: actions.PROPERTY_OFFER_DETAILS_CURRENT_TAB_START,
  tabIndex: tabIndex
});

export const fetchOfferEditFormStart = () => ({
  type: actions.EDIT_OFFER_FORM_FETCH_START
});

export const fetchOfferEditFormSuccess = (formDefinition) => ({
  type: actions.EDIT_OFFER_FORM_FETCH_SUCCESS,
  formDefinition: formDefinition
});

export const fetchOfferEditFormFailure = (error) => ({
  type: 'API_CALL_ERROR',
  atAction: actions.EDIT_OFFER_FORM_FETCH_SUCCESS,
  error: error
});

export const fetchOfferEditFormResetStart = () => ({
  type: actions.EDIT_OFFER_FORM_FETCH_RESET_START
});

export const fetchOfferEditFormResetSuccess = (stateAction) => ({
  type: actions.EDIT_OFFER_FORM_FETCH_RESET_SUCCESS,
  stateAction: stateAction
});

export const fetchOfferContactsStart = (offerId, offerDetails) => ({
  type: actions.OFFER_CONTACTS_FETCH_START,
  offerId: offerId,
  offerDetails: offerDetails
});

export const fetchOfferContactsSuccess = () => ({
  type: actions.OFFER_CONTACTS_FETCH_SUCCESS
});

export const fetchOfferContactsFailure = (error) => ({
  type: actions.OFFER_CONTACTS_FETCH_FAILURE
});

export const getContactDetails = (ContactType, ContactData) => {
  const data = {
    ContactType: ContactType,
    Name: '',
    CompanyName: '',
    Address1: '',
    City: '',
    Phone: '',
    Fax: '',
    Email: ''
  };
  if (ContactData && ContactData.length) {
    data.ContactType = ContactType;
    data.Name = ContactData[0]?.individualFullName;
    data.CompanyName = ContactData[0]?.companyName;
    data.Address1 =
      ContactData[0]?.partyAddresses.length > 0
        ? ContactData[0]?.partyAddresses[0]?.addressLineText
        : '';
    data.City =
      ContactData[0]?.partyAddresses.length > 0
        ? `${ContactData[0]?.partyAddresses[0]?.cityName}, ${ContactData[0]?.partyAddresses[0]?.countryCode}, ${ContactData[0]?.partyAddresses[0]?.postalCode}`
        : '';
    data.Phone =
      ContactData[0]?.contactPoints.length > 0 &&
      ContactData[0]?.contactPoints[0]?.contactPointEmails.length > 0
        ? ContactData[0]?.contactPoints[0]?.contactPointEmails[0]
            ?.contactPointEmailValue
        : '';
    data.Fax =
      ContactData[0]?.contactPoints.length > 0 &&
      ContactData[0]?.contactPoints[0]?.contactPointFaxs.length > 0
        ? ContactData[0]?.contactPoints[0]?.contactPointFaxs[0]
            ?.contactPointFaxValue
        : '';
    data.Email =
      ContactData[0]?.contactPoints.length > 0 &&
      ContactData[0]?.contactPoints[0]?.contactPointEmails.length > 0
        ? ContactData[0]?.contactPoints[0]?.contactPointEmails[0]
            ?.contactPointEmailValue
        : '';
  }
  return data;
};
