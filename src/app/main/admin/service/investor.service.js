import { InvestorApiConfig, party } from 'app/config/api';
import axios from 'axios';

export const investorservice = {
  async searchInvestorGroup() {
    return axios
      .get(InvestorApiConfig.api.searchInvestorGroup)
      .then((res) => res.data);
  },

  async saveInvestorToGroup(investor) {
    return axios
      .post(InvestorApiConfig.api.saveInvestorToGroup, investor)
      .then((res) => res.data);
  },

  async createInvestorGroup(investorGroup) {
    return axios
      .post(InvestorApiConfig.api.createInvestorGroup, investorGroup)
      .then((res) => res.data);
  },

  async deleteInvestorGroupById(id) {
    return axios
      .delete(InvestorApiConfig.api.deleteInvestorGroupById(id))
      .then((res) => res.data);
  },

  async getUnassignedInvestor() {
    return axios
      .get(party.api.investor.unassignedInvestor)
      .then((res) => res.data);
  },

  async getFormForInvstorToGroup() {
    return axios
      .get(InvestorApiConfig.api.getInvestorToGroup)
      .then((res) => res.data);
  },

  async getFormForInvestorGroupCreation() {
    return axios
      .get(InvestorApiConfig.api.getInvestorGroupCreation)
      .then((res) => res.data);
  },

  async getFormForInvestorGroupList() {
    return axios
      .get(InvestorApiConfig.api.getFormForInvestorGroupList)
      .then((res) => res.data);
  },

  async findInvestorByInvestorGroup(investorGroup) {
    return axios
      .get(party.api.investor.findInvestorByInvestorGroup(investorGroup))
      .then((res) => res.data);
  },

  async bulkUpdateForInvestor(payload) {
    return axios
      .post(party.api.investor.bulkUpdate, payload)
      .then((res) => res.data);
  },

  async createRuleForId(id) {
    return axios
      .put(InvestorApiConfig.api.createRuleForId(id))
      .then((res) => res.data);
  },

  async getFormForInvestorList() {
    return axios
      .get(InvestorApiConfig.api.getFormForInvestorList)
      .then((res) => res.data);
  },

  async findInvestorGroupByCode(investorGroupCode) {
    return axios
      .get(InvestorApiConfig.api.searchInvestorGroupOnly(investorGroupCode))
      .then((res) => res.data);
  },

  async searchInvestor() {
    return axios
      .get(InvestorApiConfig.api.searchInvestor)
      .then((res) => res.data);
  }
};
