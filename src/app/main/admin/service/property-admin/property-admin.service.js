import { TenantAdminConfig } from 'app/config/api';
import axios from 'axios';

export const propertyAdminApi = {
  async findPartyBasedOnPartyIds(partyIds) {
    return axios
      .get(TenantAdminConfig.api.findPartyBasedOnPartyIds(partyIds))
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 400) {
          return null;
        }
      });
  },
  async addPartyRoleTeamParties(payload) {
    return axios
      .post(TenantAdminConfig.api.addPartyRoleTeamParties, payload)
      .then((res) => res.data);
  },
  async findByParentRoleIdAndChildPartyRoleType(
    childPartyRoleType,
    parentRoleId
  ) {
    return axios
      .get(
        TenantAdminConfig.api.findByParentRoleIdAndChildPartyRoleType(
          childPartyRoleType,
          parentRoleId
        )
      )
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 400) {
          return null;
        }
      });
  },
  async findAllpartyRoleTypesWithUserId(partyId, partyRoleType) {
    return axios
      .get(
        TenantAdminConfig.api.findAllpartyRoleTypesWithUserId(
          partyId,
          partyRoleType
        )
      )
      .then((res) => res.data);
  },
  async findAllPartyRoleChildByPartyRoleType(partyRoleType) {
    return axios
      .get(
        TenantAdminConfig.api.findAllPartyRoleChildByPartyRoleType(
          partyRoleType
        )
      )
      .then((res) => res.data);
  },

  async findAllpartyRoleTypes(partyRoleType) {
    return axios
      .get(TenantAdminConfig.api.findAllpartyRoleTypes(partyRoleType))
      .then((res) => res.data._embedded.parties);
  },

  async getAllDefaultGlobalRoles() {
    return axios
      .get(TenantAdminConfig.api.getAllDefaultGlobalRoles)
      .then((res) => res.data);
  },

  async findAllGlobalRoles() {
    return axios
      .get(TenantAdminConfig.api.findAllGlobalRoles)
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

  async getStateRoleAssignmentMatrixes() {
    return axios
      .get(TenantAdminConfig.api.stateRoleAssignmentMatrixes)
      .then((res) => res.data);
  },

  async addStateRoleAssignmentMatrixes(payload) {
    return axios
      .post(TenantAdminConfig.api.stateRoleAssignmentMatrixes, payload)
      .then((res) => res.data);
  },

  async updateStateRoleAssignmentMatrixes(payload) {
    return axios
      .patch(
        TenantAdminConfig.api.updateStateRoleAssignmentMatrixes(
          payload.stateRoleAssignmentMatrixId
        ),
        payload
      )
      .then((res) => res.data);
  },

  async deleteStateRoleAssignmentMatrixes(payload) {
    return axios
      .delete(
        TenantAdminConfig.api.updateStateRoleAssignmentMatrixes(
          payload.stateRoleAssignmentMatrixId
        )
      )
      .then((res) => res.data);
  },

  async addStateRoleAssignmentInvestorXrefs(payload) {
    return axios
      .post(TenantAdminConfig.api.stateRoleAssignmentInvestorXrefs, payload)
      .then((res) => res.data);
  },

  async addStateRoleAssignmentPartyXrefs(payload) {
    return axios
      .post(TenantAdminConfig.api.stateRoleAssignmentPartyXrefs, payload)
      .then((res) => res.data);
  },

  async addStateRoleAssignmentStateXrefs(payload) {
    return axios
      .post(TenantAdminConfig.api.stateRoleAssignmentStateXrefs, payload)
      .then((res) => res.data);
  },

  // async updateStateEviction(payload) {
  //   return axios
  //     .post(TenantAdminConfig.api.updateStateEviction, payload)
  //     .then((res) => res.data);
  // },

  // async deleteStateEviction(payload) {
  //   console.log('TenantAdminConfig.api.deleteStateEviction', TenantAdminConfig.api.deleteStateEviction)
  //   return axios
  //     .delete(TenantAdminConfig.api.deleteStateEviction, payload)
  //     .then((res) => res.data);
  // },
};
