import _ from '@lodash';
import { OfferApiConfig, party } from 'app/config/api';
import axios from 'axios';

export const offerApi = {
  async getOfferListFormDefinition() {
    return axios
      .get(OfferApiConfig.api.offer_listing_form_def)
      .then((res) => res.data);
  },
  async getOfferEditFormDefinition() {
    return axios
      .get(OfferApiConfig.api.offer_edit_form_def)
      .then((res) => res.data);
  },
  async getOfferStatus() {
    return axios.get(OfferApiConfig.api.offer_status).then((res) => res.data);
  },
  async getPropertyOfferList() {
    return axios
      .get(OfferApiConfig.api.get_property_offer_list)
      .then((res) => res.data);
  },
  async getOfferDetails() {
    return axios
      .get(OfferApiConfig.api.get_offer_details)
      .then((res) => res.data);
  },
  async getPropertyOfferListWithVersions() {
    return axios
      .get(OfferApiConfig.api.get_property_offer_list_with_versions)
      .then((res) => res.data);
  },
  async getOfferContacts(offerId) {
    return axios
      .get(OfferApiConfig.api.get_offer_contacts)
      .then((res) => res.data);
  },
  async getOffersByPropertyId(propertyId) {
    const data = [propertyId];
    return await axios
      .post(OfferApiConfig.api.get_offers_by_propertyId, data)
      .then((res) => res.data?.listReoOfferPrpertyIds);
  },
  async getOfferXREFByPropertyId(propertyId) {
    return await axios
      .get(OfferApiConfig.api.get_offer_xref_by_propertyId(propertyId))
      .then((res) => res.data);
  },
  async filterOfferById(propertyOffers, reoOfferId) {
    return _.filter(propertyOffers, { reoOfferId: reoOfferId });
  },
  async filterPartiesByRoleType(offer, roleType) {
    return _.filter(offer[0].reoOfferParties, { partyRoleType: roleType });
  },
  async filterOfferXREFByRoleType(XREFData, roleType) {
    return _.filter(XREFData?._embedded?.propertyPartyRoleLoanXrefs, {
      partyRoleType: roleType
    });
  },
  async filterOfferXREFByRoleId(XREFData, roleId) {
    return _.filter(XREFData?._embedded?.propertyPartyRoleLoanXrefs, {
      roleId: roleId
    });
  },
  async filterPartiesByPartyId(paritesData, partyId) {
    return _.filter(paritesData?.partyList, {
      partyId: partyId
    });
  },
  async getBulkPartyById(partyId) {
    const data = partyId;
    return await axios
      .post(party.api.bulk.fetchById, data)
      .then((res) => res.data);
  },
  async getOffersByLoanNumber(loanNumber) {
    const url = OfferApiConfig.api.get_offer_count(loanNumber);
    return await axios.get(url).then((res) => res.data);
  },
  async filterPropertyRoleByRoleKey(propertyRoles, roleKey) {
    return _.filter(propertyRoles?.listPropertyPartyRoleLoanXref[0], {
      partyRoleType: roleKey
    });
  },
  async getPropertyRolePersionInfo(personInfo, ContactType) {
    const data = {
      ContactType: ContactType,
      RoleKey: '',
      Name: '',
      CompanyName: '',
      Address1: '',
      City: '',
      Phone: '',
      Fax: '',
      Email: ''
    };
    if (personInfo) {
      data.Name = personInfo?.fullName;
      data.CompanyName = personInfo?.companyName;
      data.Address1 = personInfo?.postalAddress;
      data.City = personInfo?.city;
      data.Phone = personInfo?.telephoneNumber;
      data.Fax = personInfo?.fax;
      data.Email = personInfo?.email;
    }
    return data;
  }
};
