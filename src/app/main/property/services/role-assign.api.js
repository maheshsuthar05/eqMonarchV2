import { flowable, RoleAssignApiConfig } from 'app/config/api';
import axios from 'axios';

export const assignedRolesApi = {
  async getRolesListFormDefinition() {
    return axios
      .get(RoleAssignApiConfig.api.assigned_roles_form)
      .then((res) => res.data);
  },

  async updateAssignedRolesUsers(payload, propertyId) {
    return axios
      .post(RoleAssignApiConfig.api.update(propertyId), payload)
      .then((res) => res.data);
  },

  async getRolesByPropertyId(propertyId) {
    const data = [propertyId];
    return await axios
      .post(RoleAssignApiConfig.api.get, data)
      .then((res) => res.data);
  },

  async updateFlowableRoles(payload, caseInstanceId) {
    return axios
      .post(flowable.api.updateFlowableRolesObjects(caseInstanceId), payload)
      .then((res) => res.data);
  }
};
