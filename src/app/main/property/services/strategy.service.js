import { PropertyStrategyApiConfig } from 'app/config/api';
import axios from 'axios';

export const strategyApi = {
  async propertyProjectionGet(propertyId,projectionId,flag) {
    return axios
      .get(PropertyStrategyApiConfig.api.cwcotApiConfig.get(propertyId,projectionId,flag))
      .then((res) => res.data);
  },
  async propertyProjectionsList(propertyId) {
    return axios
      .get(PropertyStrategyApiConfig.api.cwcotApiConfig.getProjectionList(propertyId))
      .then((res) => res.data);
  },
  async propertyProjectionAdd(payload) {
    return axios
      .post(PropertyStrategyApiConfig.api.cwcotApiConfig.add,payload)
      .then((res) => res.data);
  },
  async propertyProjectionUpdate(id,payload) {
    return axios
      .patch(PropertyStrategyApiConfig.api.cwcotApiConfig.update(id),payload)
      .then((res) => res.data);
  },
  async propertyStartegySavingForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.savingForm)
      .then((res) => res.data);
  },
  async propertyStartegyClaimForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.claimForm)
      .then((res) => res.data);
  },
  async propertyStartegyActualForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.actualForm)
      .then((res) => res.data);
  },
  async propertyStartegyBaselineForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.baselineForm)
      .then((res) => res.data);
  },
  async propertyStartegyConveyanceForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.conveyanceForm)
      .then((res) => res.data);
  },
  async propertyStartegyCWCOTForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.cwcotForm)
      .then((res) => res.data);
  },
  async propertyStartegyREOAsIsForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.reoAsIsForm)
      .then((res) => res.data);
  },
  async propertyStartegyREORepairForm() {
    return axios
      .get(PropertyStrategyApiConfig.api.reoRepairForm)
      .then((res) => res.data);
  },
}