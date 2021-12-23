import { apiServices } from 'app/config/api';
import axios from 'axios';

export const operation = {
  async get(routeParams) {
    return await axios
      .get(apiServices.api.operations(routeParams.serviceId))
      .then((res) => res.data);
  },
  async save(payload, serviceId) {
    const service = `/integration/services/${serviceId}`;
    payload.service = service;
    payload.input = [];
    payload.output = [];
    payload.inputTemplateLocation = [];
    payload.outputTemplateLocation = [];

    return await axios
      .post(apiServices.api.insertOperation, payload)
      .then((res) => res);
  },
  async delById(id) {
    return await axios
      .delete(apiServices.api.delByOperation(id))
      .then((res) => res.data);
  },
  async update(payload, serviceId) {
    const service = `/integration/services/${serviceId}`;
    payload.service = service;

    return await axios
      .put(apiServices.api.updateOperation(payload.operationsId), payload)
      .then((res) => res.data);
  },
  async getById(id) {
    return await axios
      .get(apiServices.api.operationById(id))
      .then((res) => res.data);
  },
  async getMappingByOperationId(id) {
    return await axios
      .get(apiServices.api.getMappingByOperationId(id))
      .then((res) => res.data);
  },
  async getOperationMapping(size) {
    return await axios
      .get(apiServices.api.getMapping(size))
      .then((res) => res.data);
  },
  async saveMappingByOperationId(payload, operationsId) {
    const operation = `/integration/operations/${operationsId}`;
    payload.operation = operation;

    return await axios
      .post(apiServices.api.insertMapping, payload)
      .then((res) => res);
  },
  async updateMappingByOperationId(payload, operationsId) {
    const operation = `/integration/operations/${operationsId}`;
    payload.operation = operation;
    return await axios
      .put(
        apiServices.api.updateMapping(payload.operationRouteMappingId),
        payload
      )
      .then((res) => res.data);
  },
  async deleteMappingByOperationId(payload, operationsId) {
    return await axios
      .delete(apiServices.api.deleteMapping(payload.operationRouteMappingId))
      .then((res) => res.data);
  },
  async updateOperationDetailByPayload(data, key, operationId) {
    const body = {};
    body.operationsId = operationId;
    body[key] = data;
    return await axios
      .patch(apiServices.api.updateOperationDetails(operationId), body)
      .then((res) => res.data);
  },
  async updateTemplatePayload(data) {
    const body = {};
    let InputFilter = data.inputTemplateLocation.filter((el) => {
      return el != null;
    });
    let OutputFilter = data.outputTemplateLocation.filter((el) => {
      return el != null;
    });
    body.inputTemplateLocation = InputFilter;
    body.outputTemplateLocation = OutputFilter;
    body.operationsId = data.operationsId;
    return await axios
      .patch(apiServices.api.updateTemplate(data.operationsId), body)
      .then((res) => res.data);
  },
  async mappingPublish(payload) {
    const body = [];
    body.push(payload.data);
    return await axios
      .post(apiServices.api.mappingPublish(payload.action), body)
      .then((res) => res.data);
  }
};
