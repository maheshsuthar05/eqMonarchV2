import { flowable } from 'app/config/api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const core = {
  async getProcessDefinition(args) {
    return await axios
      .get(flowable.api.processDefinition(args.key, args.latest, args.tenantId))
      .then((resp) => resp.data);
  },
  async getProcessInstance(args, variables, businessKey) {
    const payload = {
      processDefinitionId: args.data[0].id,
      businessKey: businessKey ? businessKey : uuidv4(), //npm I uuid need to be installed
      variables
    };
    return await axios
      .post(flowable.api.processInstance, payload)
      .then((resp) => resp.data);
  },
  async getProcessTaskQuery(args) {
    const payload = {
      processInstanceId: args.hasOwnProperty('processInstance')
        ? args.processInstance.id
        : args.id
    };
    return await axios
      .post(flowable.api.processTaskQuery, payload)
      .then((resp) => resp.data);
  },
  async getProcessFormDefinition(args) {
    return await axios
      .get(flowable.api.processFormDefinition(args.data[0].id))
      .then((resp) => resp);
  },
  async postProcessTaskComplete(payload, task) {
    return await axios
      .post(flowable.api.processTaskComplete(task.id), payload)
      .then(() => true);
  },
  async getFormByProcessDefinition(processesDefinitionId) {
    return await axios
      .get(flowable.api.getFormByDefinitionId(processesDefinitionId))
      .then((resp) => resp.data);
  },
  async getAllCmmnQueryTask(payload) {
    return await axios
      .post(flowable.api.getAllCmmnQueryTask, payload)
      .then((resp) => resp.data);
  },
  async postTaskSaveCompleteLater(payload, taskId) {
    delete payload.action;
    return await axios
      .post(flowable.api.coreApiTaskSaveAndCompleteLater(taskId), payload)
      .then((resp) => resp.data);
  },
  async postCoreTaskComplete(payload, taskId) {
    delete payload.action;
    return await axios
      .post(flowable.api.coreApiTaskComplete(taskId), payload)
      .then((resp) => resp.data);
  },
  async putCoreSkipTask(taskId) {
    const payload = {
      category: '_SKIPPED',
      description:'Closed (NC) \\ Skipped'
    };
    return await axios
      .put(flowable.api.processTaskComplete(taskId), payload)
      .then((resp) => resp.data);
  },
  async putCoreUnClaimTask(taskId) {
    const payload = {
      assignee: null
    };
    return await axios
      .put(flowable.api.processTaskComplete(taskId), payload)
      .then((resp) => resp.data)
      .catch((err) => {
        if (err.response.status === 500) return 500;
      });
  },
  async getLocalFormByFileName(fileName) {
    return await axios
      .get(flowable.api.local(fileName))
      .then((resp) => resp.data);
  },
  async getExecutionsByBusinessKey(args) {
    const payload = {
      processBusinessKey: args?.processBusinessKey,
      processDefinitionKey: args?.processDefinitionKey,
      tenantId: args?.tenantId
    };
    return await axios
      .post(flowable.api.getExecutionsByBusinessKey, payload)
      .then((resp) => resp.data);
  },
  async getExecutionsByProcessInstanceId(args) {
    return await axios
      .get(
        flowable.api.getExecutionsByProcessInstanceId(
          args.tenantId,
          args.activityId,
          args.eventName,
          args.processInstanceId
        )
      )
      .then((resp) => resp.data);
  },
  async triggerEventByExecutionId(args) {
    return await axios
      .put(flowable.api.triggerEventByExecutionId(args.executionId), {
        variables: args?.data,
        action: args?.signal,
        signalName: args?.signalName
      })
      .then((resp) => resp.data);
  },
  async getFormByCaseId(id) {
    return axios
      .get(flowable.api.getFormByCaseId(id))
      .then((resp) => resp.data);
  },
  async saveTaskVariables(id, payload) {
    return axios
      .post(flowable.api.saveTaskVariables(id), payload)
      .then((resp) => resp.data)
      .catch((err) => {
        if (err.response.status === 409) {
          return 'conflict';
        }
      });
  },
  async updateTaskVariable(id, payload, variable) {
    return axios
      .put(flowable.api.updateTaskVariable(id, variable), payload)
      .then((resp) => resp.data);
  },
  async pauseTask(taskId, propertyTd, payload) {
    return axios
      .post(flowable.api.pauseTask(taskId, propertyTd), payload)
      .then((resp) => resp.data);
  },
  async unPauseTask(taskId, propertyTd) {
    return axios
      .post(flowable.api.unPauseTask(taskId, propertyTd))
      .then((resp) => resp.data);
  },
  async pauseUnpause(taskId, payload) {
    return axios
      .post(flowable.api.pauseUnpause(taskId), payload)
      .then((resp) => resp.data);
  },
  async delete(id) {
    return axios.delete(flowable.api.deleteById(id)).then((resp) => resp.data);
  },
  async putCoreCommentsByActions(taskId, description) {
    const payload = {
      description
    };
    return await axios
      .put(flowable.api.processTaskComplete(taskId), payload)
      .then((resp) => resp.data)
      .catch((err) => {
        if (err.response.status === 500) return 500;
      });
  }
};
