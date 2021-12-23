import { TenantAdminConfig, TenantApiConfig } from 'app/config/api';
import axios from 'axios';

export const taskAdminApi = {
  async getPartyRoleTypes(size) {
    return await axios
      .get(TenantApiConfig.api.partyRoleTypes(size))
      .then((res) => res.data);
  },
  async updateTaskConfigurations(payload) {
    return axios
      .patch(
        TenantAdminConfig.api.updateTaskConfigurations(
          payload.taskConfigurationId
        ),
        payload
      )
      .then((res) => res.data);
  }
};
