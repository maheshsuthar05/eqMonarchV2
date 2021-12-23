import axios from 'axios';
import { forgerock, party as Party } from 'app/config/api';
import { _cookies } from 'app/store/actions';
const tenantCode = 'internal';
const currentTenantCode = _cookies.getCookies(forgerock.cookie.tenantCode);

const fetchUserContact = async (realm, userId) => {
  return await axios
    .get(forgerock.api.getVenndorAgentAddress(realm, userId))
    .then((response) => response.data);
};

const productSubscription = {
  async get(eqvmVendor, eqvmProduct) {
    const payload = {
      activeIndicator: 0,
      tenantId: '',
      eqvmProduct,
      eqvmVendor
    };
    return await axios
      .get(Party.api.productSubscription.insert(tenantCode), payload)
      .then((resp) => resp.data);
  },
  async insert(eqvmVendor, eqvmProduct) {
    const payload = {
      activeIndicator: 0,
      tenantId: '',
      eqvmProduct,
      eqvmVendor
    };
    return await axios
      .post(Party.api.productSubscription.insert(tenantCode), payload)
      .then((resp) => resp.data);
  },
  async update(id) {
    const payload = {
      activeIndicator: 0
    };
    return await axios
      .post(Party.api.productSubscription.update(tenantCode, id), payload)
      .then((resp) => resp.data);
  }
};

export const vendor = {
  async insert(args) {
    const payload = {
      dunsNumber: args.payload[0].eqvmVendors.dunsNumber,
      primaryIndicator: 1,
      activeIndicator: 1
    };

    return await axios
      .post(Party.api.vendor.insert(tenantCode), payload, tenantCode)
      .then((resp) => resp.data);
  }
};

export const role = {
  async insert(roleType, partyId) {
    const payload = {
      partyRoleType: roleType,
      partyId: partyId
    };

    return await axios
      .post(Party.api.role.insert(currentTenantCode), payload)
      .then((resp) => resp.data);
  }
};

export const party = {
  async insert(arg, vendorResp) {
    const payload = {
      legalEntityFullName: arg?.payload[0]?.vendorCompanyName,
      individualFullName: _cookies.getCookies(forgerock.cookie.displayName),
      eqvmVendors: [vendorResp?._links?.eqvmVendor?.href]
    };

    return await axios
      .post(Party.api.insert(tenantCode), payload)
      .then((resp) => resp.data);
  }
};

export const product = {
  async getById(productId) {
    return await axios
      .get(Party.api.product.getById(productId, tenantCode))
      .then((resp) => resp.data);
  }
};

export const vendorProduct = {
  async insert(args) {
    return await axios
      .post(Party.api.vendorProduct.insert(tenantCode), args)
      .then((resp) => resp.data);
  }
};

export const vendorServiceArea = {
  async insert(vendorProductResp, serviceArea) {
    const payload = {
      activeIndicator: 1,
      serviceAreaCity: 'string',
      serviceAreaStateCode: serviceArea?.stateCode,
      serviceAreaZip: 'string',
      serviceAreaNationwideIndicator:
        serviceArea?.coverage === 'Nationwide' ? true : false,
      eqvmVendorProduct: vendorProductResp._links.eqvmVendorProduct.href
    };

    return await axios
      .post(Party.api.vendorServiceArea.insert(tenantCode), payload)
      .then((resp) => resp.data);
  }
};

const fetchLisenseInfo = async (tenantCode) => {
  return await axios
    .get(Party.api.license.insert(tenantCode))
    .then((response) => response.data);
};

const updateLisenseInfo = async (tenantCode, args) => {
  return await axios
    .put(Party.api.license.update(tenantCode, args.licenseId), args)
    .then((response) => response.data);
};

export const vendorProfileInformation = {
  async getPrtyIdByUserId() {
    return await axios
      .get(
        Party.api.vendorProfile.getPrtyIdByUserId(
          _cookies.getCookies(forgerock.cookie.userName),
          tenantCode
        )
      )
      .then((response) => response.data);
  },
  async getByPartyId(partyId) {
    return await axios
      .get(Party.api.vendorProfile.getByPartyId(partyId, tenantCode))
      .then((response) => response.data);
  },
  async updateProfile(payload) {
    return await axios
      .patch(
        Party.api.vendorProfile.getByPartyId(payload.partyId, tenantCode),
        payload
      )
      .then((response) => response.data);
  }
};

export const agentBrokerInformation = {
  async getBrokerInformation(partyId) {
    return await axios
      .get(Party.api.agentProfile.getBrokerInformation(partyId, tenantCode))
      .then((response) => response.data);
  },

  async updateBrokerInformation(payload) {
    return await axios
      .patch(
        Party.api.agentProfile.getBrokerInformation(
          payload.partyId,
          tenantCode
        ),
        payload
      )
      .then((response) => response.data);
  }
};

export default {
  fetchUserContact,
  productSubscription,
  vendor,
  party,
  product,
  vendorProduct,
  vendorServiceArea,
  role,
  fetchLisenseInfo,
  updateLisenseInfo,
  vendorProfileInformation,
  agentBrokerInformation
};
