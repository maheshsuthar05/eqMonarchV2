import {
  EnumerationMasterApiConfig,
  AdminServiceApiConfig
} from 'app/config/api';
import axios from 'axios';

export const predefinedListService = {
  async getStateUS() {
    return axios.get(AdminServiceApiConfig.api.stateUS).then((res) => res.data);
  },
  async getDeliverableMatrix() {
    return axios
      .get(EnumerationMasterApiConfig.api.deliverableMatrix)
      .then((res) => res.data);
  },
  async getEvictionType() {
    return axios
      .get(EnumerationMasterApiConfig.api.evictionType)
      .then((res) => res.data);
  },
  async getPropertyTypeAPI() {
    return axios
      .get(EnumerationMasterApiConfig.api.propertyType)
      .then((res) => res.data);
  },
  async getTaskDataAPI() {
    return axios
      .get(EnumerationMasterApiConfig.api.tasksType)
      .then((res) => res.data);
  },
  async getAgentTypeAPI() {
    return axios
      .get(EnumerationMasterApiConfig.api.agentType)
      .then((res) => res.data);
  }
};
