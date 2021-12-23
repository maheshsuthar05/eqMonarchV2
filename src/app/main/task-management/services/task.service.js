import Cookies from 'js-cookie';
import { flowable, RoleAssignApiConfig, TaskApiConfig } from 'app/config/api';
import { forgerock } from 'app/config/api';
import axios from 'axios';
import _ from 'lodash';

export const TaskApi = {
  async postAClaim(id, key) {
    const payload = {
      action: key,
      assignee: Cookies.get(forgerock.cookie.userName)
    };
    return axios
      .post(flowable.api.processTaskComplete(id), payload)
      .then((resp) => resp.data).catch(err=>{
        if(err.response.status===500)return 500
      })
  },
  async reAssignTask(id, assignee) {
    const payload = {
      action: 'claim',
      assignee
    };
    return axios
      .post(flowable.api.reAssignTask(id), payload)
      .then((resp) => resp.data);
  },
  async fetchForm(id) {
    return axios
      .get(flowable.api.processFormDefinition(id))
      .then((resp) => resp.data);
  },
  async getUserGroup(partyId) {
    return axios
      .get(RoleAssignApiConfig.api.getUserGroupByPartyId(partyId))
      .then((resp) => resp.data)
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
  async getPartyIdByUserId() {
    return axios
      .get(
        RoleAssignApiConfig.api.getPartyIdByUserId(
          Cookies.get(forgerock.cookie.userName)
        )
      )
      .then((resp) => resp.data)
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
  async fetchClosedForm(id) {
    return axios
      .get(flowable.api.processFormDefinition(id))
      .then((resp) => resp.data);
  },
  async postMetadata(data) {
    const unPauseDateField = `reopenDate_${data.taskVariables.TASKNAME}`;
    const unPauseDateItem = _.find(data.payload, {
      name: unPauseDateField
    });
    const payload = {
      taskId: data.taskId,
      taskMetadata: {
        unpauseDate: unPauseDateItem ? unPauseDateItem.value : null,
        taskDefKey: data.taskVariables.TASKNAME
      }
    };
    return axios
      .post(TaskApiConfig.api.create_metadata, payload)
      .then((resp) => resp.data);
  },
  async deleteMetadata(taskId) {
    return axios
      .delete(TaskApiConfig.api.delete_metadata(taskId))
      .then((resp) => resp.data);
  }
};
