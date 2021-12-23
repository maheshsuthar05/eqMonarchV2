import { flowable, RoleAssignApiConfig } from 'app/config/api';
import axios from 'axios';

export const flowableTaskApi = {
  async getOpenTaskFormDefinition(taskId) {
    return await axios
      .get(flowable.api.processFormDefinition(taskId))
      .then((resp) => resp.data);
  },
  async getProcessInstanceVariables(processInstanceId) {
    return await axios
      .get(flowable.api.processVariables(processInstanceId))
      .then((res) => res.data);
  },
  async getProcessInstanceWithSubProcess(processInstanceId) {
    return await axios
      .get(flowable.api.subProcessVariable(processInstanceId))
      .then((res) => res.data);
  },
  async getPropertyCaseInstanceVariables(caseInstanceID) {
    return await axios
      .get(flowable.api.propertyCaseInstanceVariables(caseInstanceID))
      .then((res) => res.data);
  },
  async customTaskOpenLogic(arg) {
    let data = { payload: null, additionalData: null };
    let response = '';
    const taskKey = arg.formDefinition.key.toUpperCase();
    switch (taskKey) {
      case 'MILESTONETASKFORM':
        let flowableMilestone = null;
        if (response && response.data && response.data.length) {
          const milestoneData = response.data.map((milestone) => {
            return {
              milestoneName: milestone.name,
              milestoneKey: milestone.key,
              daysToComplete: null
            };
          });
          flowableMilestone = { customData: milestoneData };
        }

        return flowableMilestone;

      case 'ASSIGNEDROLEFORM':
        let responseData = await axios
          .get(RoleAssignApiConfig.api.get_roles)
          .then((res) => res.data);

        response = responseData.map((role) => {
          return { id: role.id, name: role.name, selectedUser: null };
        });

        response.sort();
        data.payload = { customData: response };
        data.additionalData = {
          additionalData: {
            url: RoleAssignApiConfig.api.get_users_group
          }
        };
        return data;
      default:
        return data;
    }
  },
  async getProcessTaskDetails(taskId) {
    return await axios
      .get(flowable.api.processTaskComplete(taskId))
      .then((resp) => resp.data);
  },
  async getTaskVariables(taskId) {
    return await axios
      .get(flowable.api.getTaskVariables(taskId))
      .then((resp) => resp.data);
  },
  async getProcessTaskHistoryDetails(taskId) {
    return await axios
      .get(flowable.api.historicalTaskInstancesById(taskId))
      .then((resp) => resp.data);
  }
};
