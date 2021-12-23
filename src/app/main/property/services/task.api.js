import { TaskApiConfig, flowable } from 'app/config/api';
import axios from 'axios';

export const taskApi = {
  async getPropertyTaskListOpenFormDefinition() {
    return axios
      .get(TaskApiConfig.api.listing_open_form_def)
      .then((res) => res.data);
  },

  async getPropertyTaskListCloseFormDefinition() {
    return axios
      .get(TaskApiConfig.api.listing_close_form_def)
      .then((res) => res.data);
  },

  async getPropertyTaskOpenFormDefinition(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.task_open_form_def(taskInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyTaskCloseFormDefinition(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.task_close_form_def(taskInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyTaskFormValue(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_form_value(taskInstanceId);

    return axios.get(url, config).then((res) => res.data);
  },

  async taskUpdate(tenantCode, taskInstanceId, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode
      }
    };
    const url = TaskApiConfig.api.update(taskInstanceId);

    return axios.post(url, payload, config).then((res) => res.data);
  },

  async getPropertyInstanceDiagram(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_instance_diagram;
    const payload = {
      caseInstanceParentId: taskInstanceId
    };

    return axios.post(url, payload, config).then((res) => res.data);
  },

  async getPropertyInstanceDiagramUrl(taskInstanceId) {
    return TaskApiConfig.api.get_instance_diagram_url(taskInstanceId);
  },

  async getPropertyTaskOpenInstanceDiagram(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_task_open_instance_diagram(
      taskInstanceId
    );

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyTaskCloseInstanceDiagram(tenantCode, taskInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_task_close_instance_diagram(
      taskInstanceId
    );

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyTaskInstanceDiagramUrl(tenantCode, processInstanceId) {
    return TaskApiConfig.api.get_instance_diagram_image_url(processInstanceId);
  },

  async getPropertyTaskParentInstanceDiagram(tenantCode, processInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_parent_instance_diagram(
      processInstanceId
    );

    return axios.get(url, config).then((res) => res.data);
  },

  async getPropertyTaskParentInstanceDiagramUrl(
    tenantCode,
    parentProcessInstanceId
  ) {
    return TaskApiConfig.api.get_parent_instance_diagram_image_url(
      parentProcessInstanceId
    );
  },

  async getPropertyTaskRootParentInstance(tenantCode, processInstanceId) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        Authorization: TaskApiConfig.headers.authorization
      }
    };
    const url = TaskApiConfig.api.get_propertyid_by_process_instanceid(
      processInstanceId
    );
    return axios.get(url, config).then((res) => res.data);
  },
  async getCaseInstaceIdByPropertyId(propertyId) {
    const url = TaskApiConfig.api.get_caseinstanceid_by_propertyid(propertyId);
    return await axios.get(url).then((res) => res.data);
  },
  async getProcessInstanceVariables(processInstanceId) {
    return await axios
      .get(flowable.api.processVariables(processInstanceId))
      .then((res) => res.data);
  }
};
