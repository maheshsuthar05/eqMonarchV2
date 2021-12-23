import {
  TenantAdminConfig,
  AdminManagerApiConfig,
  flowable
} from 'app/config/api';
import axios from 'axios';
import { id } from 'date-fns/locale';

export const tenantAdminApi = {
  async getLegalEntityForm() {
    return axios
      .get(TenantAdminConfig.api.legal_entity_listing_def)
      .then((res) => res.data);
  },

  async saveLegalEntity(payload) {
    return axios
      .post(TenantAdminConfig.api.legalEntity, payload)
      .then((res) => res.data);
  },

  async getLegalEntity() {
    return axios.get(TenantAdminConfig.api.legalEntity).then((res) => res.data);
  },

  async deleteLegalEntity(payload) {
    return axios
      .delete(
        TenantAdminConfig.api.legalEntityById(payload.legalEntityId),
        payload
      )
      .then((res) => res.data);
  },

  async editLegalEntity(payload) {
    return axios
      .put(
        TenantAdminConfig.api.legalEntityById(payload.legalEntityId),
        payload
      )
      .then((res) => res.data);
  },

  async saveListingType(payload) {
    return axios
      .post(TenantAdminConfig.api.listingTypeApi, payload)
      .then((res) => res.data);
  },

  async editListingType(payload) {
    return axios
      .put(
        TenantAdminConfig.api.listingTypeApiById(payload.listingTypeId),
        payload
      )
      .then((res) => res.data);
  },

  async getListingType() {
    return axios
      .get(TenantAdminConfig.api.listingTypeApi)
      .then((res) => res.data);
  },

  async getManageClientConfigurationForm() {
    return axios
      .get(TenantAdminConfig.api.manage_client_configuration_listing_def)
      .then((res) => res.data);
  },

  async getUserLoadBalanceForm() {
    return axios
      .get(TenantAdminConfig.api.user_load_balance_listing_def)
      .then((res) => res.data);
  },

  async getStateRoleAssignmentForm() {
    return axios
      .get(TenantAdminConfig.api.state_role_assignment_listing_def)
      .then((res) => res.data);
  },

  async getCaseDef(key) {
    return axios
      .get(AdminManagerApiConfig.api.getCaseDefByCaseKey(key))
      .then((res) => res.data);
  },

  async getProcessDef(key) {
    return axios
      .get(AdminManagerApiConfig.api.getProcessDefBykey(key))
      .then((res) => res.data);
  },

  async save(payload) {
    return axios
      .post(AdminManagerApiConfig.api.save, payload)
      .then((res) => res.data);
  },

  async update(payload, id) {
    return axios
      .post(flowable.api.propertyCaseInstanceVariables(id), payload)
      .then((res) => res.data);
  },

  async searchCaseInstance(payload) {
    return axios
      .post(AdminManagerApiConfig.api.getCaseQueryUrl, payload)
      .then((res) => res.data);
  },

  async getAllDefaultGlobalRoles() {
    return axios
      .get(TenantAdminConfig.api.getAllDefaultGlobalRoles)
      .then((res) => res.data);
  },

  async getParties(partyId) {
    return axios
      .get(TenantAdminConfig.api.getParties(partyId))
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 400) {
          return null;
        }
      });
  },

  async findAllByPartyRoleType(partyRoleType) {
    return axios
      .get(TenantAdminConfig.api.findAllByPartyRoleType(partyRoleType))
      .then((res) => res.data._embedded.roles)
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 400) {
          return [];
        }
      });
  },
  
  async updateRoleIndicator(partyRolePayload) {
    return axios
      .post(TenantAdminConfig.api.updateRoleIndicator, partyRolePayload)
      .then((res) => res);
  },

  async addStateRoleAssignmentMatrixes(payload) {
    return axios
      .post(TenantAdminConfig.api.addStateRoleAssignmentMatrixes, payload)
      .then((res) => res);
  },

  async deleteStateEviction(payload) {
    return axios
      .delete(TenantAdminConfig.api.deleteStateEviction(payload.id), payload)
      .then((res) => res.data);
  },

  async updateStateEviction(payload) {
    return axios
      .put(TenantAdminConfig.api.updateStateEviction(payload.stateOrderMatrixId), payload)
      .then((res) => res.data);
  },

  async saveStateEviction(payload) {
    return axios
      .post(TenantAdminConfig.api.saveStateEviction, payload)
      .then((res) => res.data);
  },
};
