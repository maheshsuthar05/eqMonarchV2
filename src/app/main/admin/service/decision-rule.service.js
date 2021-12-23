import { DecisionRuleApiConfig } from 'app/config/api';
import axios from 'axios';
import { parseString } from "react-native-xml2js";
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

export const decisionRuleService = {

  async getDecisionTable(tenantId, key) {
    return axios
      .get(DecisionRuleApiConfig.api.fetchDecisionTabble(tenantId, key))
      .then((res) => res.data);
  },

  async getRuleGroup(id) {
    return axios
      .get(DecisionRuleApiConfig.api.fetchRuleGroups(id))
      .then((res) => res.data);
  },
  async getDecisionTableInXml(decisionTableId) {
    return axios
      .get(DecisionRuleApiConfig.api.fetchDecisionTabbleInXml(decisionTableId))
      .then((res) => {
        let parsedResult;
        parseString(res.data, function (err, result) {
          parsedResult = result;
        });

        return parsedResult;
      }
      );
  },

  async updateDecisionTable(tenantId, xmlAsString) {
    var formData = new FormData();
    formData.append('file', new File([new Blob([xmlAsString])], "updated.dmn"));
    const axiosInstance = Interceptor.customInstance({
      'Content-Type': 'multipart/form-data'
    });
    return axiosInstance.post(DecisionRuleApiConfig.api.deployDecisionTable(tenantId), formData);
  },

  async getRuleManagementSearchHeader(tenantId) {
    return axios
      .get(DecisionRuleApiConfig.api.rule_management_search_header_def)
      .then((res) => res.data);
  },

  async getInvestorGroup() {
    return axios
      .get(DecisionRuleApiConfig.api.getInvestorGroup)
      .then((res) => res.data);
  },

  async getAllRuleGroup(taskgroupIds) {
    let calls = [];

    for (let id of taskgroupIds) {
      calls.push(axios
      .get(DecisionRuleApiConfig.api.fetchRuleGroups(id, 0, 5)));
    }

   return  axios.all(calls);
  },
};
