import {
  PropertyApiConfig,
  TaskApiConfig,
  forgerock,
  PropertyDocumentApiConfig
} from 'app/config/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { contextInfo } from 'app/common/helpers';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

export const propertyApi = {
  async propertyAdd(payload) {
    payload['operation'] = 'INSERT';
    payload['party'] = {}; //party service => party table
    payload['propertyValuations'] = [{}];
    payload['listingInformations'] = [{}];
    payload['marketingPlan'] = {}; //reo service => margetingPlan tale
    payload['propertyTitles'] = [{"foreclosureDilRecordedIndicator": 2}];
    payload['termsOfLoans'] = [];
    payload['partyRoleIdentifiers'] = {};
    payload['eqOrder'] = {};
    payload['propertyListingAuctionSaleDetail'] = {}; //reo service
    payload['propertyClosingSale'] = {};
    payload['propertyReoListingAgreements'] = {};
    //delete payload.miData;

    return axios
      .post(PropertyApiConfig.api.add, payload)
      .then((res) => res.data);
  },

  async propertyUpdate(payload) {
    payload['operation'] = 'UPDATE';
    return axios
      .post(PropertyApiConfig.api.update, payload)
      .then((res) => res.data);
  },

  async addMarketingId(marketingId, propertyId) {
    return axios
      .patch(TaskApiConfig.api.addMarketingId(marketingId), {
        propertyId: propertyId
      })
      .then((res) => res.data);
  },

  async updateEqOrders(eqOrderId, propertyId) {
    return axios
      .patch(TaskApiConfig.api.updateEqOrders(eqOrderId), {
        propertyId: propertyId,
        orderType: '',
        vendorId: ''
      })
      .then((res) => res.data);
  },

  async updatePropertyReos(propertyReosId, propertyId) {
    return axios
      .patch(TaskApiConfig.api.updatePropertyReos(propertyReosId), {
        propertyId: propertyId
      })
      .then((res) => res.data);
  },

  async updatePropertyListingAuctionSale(
    propertyListingAuctionSaleDetailId,
    propertyId
  ) {
    return axios
      .patch(
        TaskApiConfig.api.updatePropertyListingAuctionSale(
          propertyListingAuctionSaleDetailId
        ),
        {
          propertyId: propertyId
        }
      )
      .then((res) => res.data);
  },

  async getPropertyListingAuctionSale(propertyId) {
    return axios
      .get(TaskApiConfig.api.getPropertyListingAuctionSale(propertyId))
      .then((res) => res.data)
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 502 ||
          err.response.status === 400
        ) {
          return [];
        }
      });
  },

  async getPropertyReoId(propertyId) {
    return axios
      .get(TaskApiConfig.api.getPropertyReoId(propertyId))
      .then((res) => res.data)
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 502 ||
          err.response.status === 400
        ) {
          return [];
        }
      });
  },

  async getRolePartyDtos(partyRoleType) {
    return axios
      .get(TaskApiConfig.api.getRolePartyDtos(partyRoleType))
      .then((res) => res.data)
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 502 ||
          err.response.status === 400
        ) {
          return [];
        }
      });
  },

  async getEqOrderId(propertyId) {
    return axios
      .get(TaskApiConfig.api.getEqOrderId(propertyId))
      .then((res) => res.data)
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 502 ||
          err.response.status === 400
        ) {
          return [];
        }
      });
  },

  async getMarketingPlanId(propertyId) {
    return axios
      .get(TaskApiConfig.api.getMarketingPlanId(propertyId))
      .then((res) => res.data)
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 502 ||
          err.response.status === 400
        ) {
          return [];
        }
      });
  },

  async getProperty(
    caseInstanceId,
    marketingPlanId,
    orderId,
    propertyReoId,
    propertyListingAuctionSaleDetailId
  ) {
    const payload = {
      operation: 'FETCH',
      caseInstanceId: caseInstanceId,
      property: {},
      loan: {},
      foreclosure: {},
      propertyAddresses: [],
      insuranceClaims: [],
      miData: [],
      investorLoanInformations: [],
      termsOfLoans: [],
      propertyValuations: [],
      listingInformations: [],
      propertyTitles: [],
      marketingPlan: {
        marketingPlanId
      },
      partyRoleIdentifiers: {},
      eqOrder: {
        orderId
      },
      propertyReo: {
        propertyReoId
      },
      propertyListingAuctionSaleDetail: {
        propertyListingAuctionSaleDetailId
      }
    };

    return axios
      .post(PropertyApiConfig.api.get(contextInfo().selectedTenant), payload)
      .then((res) => res.data);
  },

  async getFormDefinitionByCase(tenantCode, processDefinitionId) {
    return axios
      .get(PropertyApiConfig.api.get_form_def_by_case(processDefinitionId))
      .then((res) => res.data);
  },

  async getFormDefinitionByProcess(tenantCode, processDefinitionId) {
    return axios
      .get(PropertyApiConfig.api.get_form_def_by_process(processDefinitionId))
      .then((res) => res.data);
  },

  async getCaseDefinition(tenantCode) {
    const config = {
      headers: {
        key: PropertyApiConfig.headers.caseDefinitionKey,
        latest: true
      }
    };
    const instance = Interceptor.customInstance(config.headers);
    const url = PropertyApiConfig.api.get_case_def(
      tenantCode,
      PropertyApiConfig.headers.caseDefinitionKey
    );

    return instance.get(url).then((res) => res.data);
  },

  async getProcessDefinitionByCase(tenantCode, key) {
    return axios
      .get(PropertyApiConfig.api.get_process_by_case(tenantCode, key))
      .then((res) => res.data);
  },

  async getProcessDefinition(tenantCode, key) {
    return axios
      .get(PropertyApiConfig.api.get_process_def(tenantCode, key))
      .then((res) => res.data);
  },

  async propertyAddToWorkflow(payload) {
    const url = PropertyApiConfig.api.add_to_workflow;
    payload.variables.push({
      name: 'PROPERTY_API_URL',
      type: 'string',
      value: PropertyApiConfig.headers.propertyApiUrl
    });

    return axios.post(url, payload).then((res) => res.data);
  },

  async propertyUpdateInWorkflow(tenantCode, propertyId, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode
      }
    };
    const url = PropertyApiConfig.api.update_in_workflow(propertyId);

    return axios.put(url, payload, config).then((res) => res.data);
  },

  async getPropertyAddFormDefinition() {
    return axios
      .get(PropertyApiConfig.api.add_form_def)
      .then((res) => res.data);
  },

  async getPropertyUpdateFormDefinition() {
    return axios
      .get(PropertyApiConfig.api.update_form_def)
      .then((res) => res.data);
  },

  async getPropertyHeaderFormDefinition() {
    return axios
      .get(PropertyApiConfig.api.header_form_def)
      .then((res) => res.data);
  },

  async getPropertyDecisionFormDefinition() {
    return axios
      .get(PropertyApiConfig.api.decision_listing_form_def)
      .then((res) => res.data);
  },

  async getPropertyDecisions(tenantCode, instanceId, includeChildren) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: PropertyApiConfig.headers.authorization
      }
    };
    const url = includeChildren
      ? PropertyApiConfig.api.get_decisions_with_children(instanceId)
      : PropertyApiConfig.api.get_decisions(instanceId);
    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyDecisionGuidances(tenantCode, caseInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: PropertyApiConfig.headers.authorization
      }
    };
    const url = PropertyApiConfig.api.get_guidances(caseInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyDecisionStatuses(tenantCode, caseInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: PropertyApiConfig.headers.authorization
      }
    };
    const url = PropertyApiConfig.api.get_statuses(caseInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyStageOverview(tenantCode, caseInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: PropertyApiConfig.headers.authorization
      }
    };
    const url = PropertyApiConfig.api.get_stage_overview(caseInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async getAllByTenantID() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: Cookies.get(forgerock.cookie.tenantCode)
      }
    };

    const data = {
      sortFieldName: '',
      sortOrder: 'ASC',
      from: 0,
      size: 25,
      tenantCode: null,
      userId: '',
      userType: null,
      role: null
    };

    return await axios
      .post(PropertyApiConfig.api.getAll, data, config)
      .then((res) => res.data.hits);
  },

  async getS3FileData(fileCatType, propertyId) {
    return axios
      .get(PropertyDocumentApiConfig.api.previewFile(fileCatType, propertyId))
      .then((res) => res.data);
  },

  async getAllProcessInstances(data) {
    return axios
      .get(PropertyApiConfig.api.get_all_process_instances(data?.propertyId))
      .then((resp) => resp.data);
  },
  async get_propertyid_by_caseinstanceid(caseInstanceId) {
    return axios
      .get(TaskApiConfig.api.get_propertyid_by_caseinstanceid(caseInstanceId))
      .then((res) => res.data)
  }
};
