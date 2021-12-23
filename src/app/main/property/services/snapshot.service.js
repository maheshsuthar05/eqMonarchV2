import { OfferApiConfig } from 'app/config/api';
import Cookies from 'js-cookie';
import { forgerock } from 'app/config/api';
import axios from 'axios';
import {
  buildAditionalDataForCloseTask,
  buildAditionalDataForOpenTask,
  buildAssignCloseTaskPayload,
  buildAssignOpenTaskPayload,
  buildCloseClaimTaskPayload,
  buildOpenClaimTaskPayload
} from 'app/main/task-management/store/actions/tasks.actions';

const tenantId = Cookies.get(forgerock.cookie.tenantCode);

export const snapshotApi = {
  async getOpenTaskCounts(caseInstanceId) {
    const payload = buildAssignOpenTaskPayload(caseInstanceId, tenantId);
    const api = buildAditionalDataForOpenTask();
    return axios.post(api.additionalData.url, payload).then((res) => res.data);
  },
  async getCompletedTaskCounts(caseInstanceId) {
    const payload = buildAssignCloseTaskPayload(caseInstanceId, tenantId);
    const api = buildAditionalDataForCloseTask();
    return axios.post(api.additionalData.url, payload).then((res) => res.data);
  },
  async getClaimsTaskCounts(caseInstanceId, groups, userTenantCode) {
    const payload = buildOpenClaimTaskPayload(
      caseInstanceId,
      groups,
      userTenantCode
    );
    const api = buildAditionalDataForOpenTask();
    return axios.post(api.additionalData.url, payload).then((res) => res.data);
  },
  async getClaimsCompletedTaskCounts(caseInstanceId, groups, userTenantCode) {
    const payload = buildCloseClaimTaskPayload(
      caseInstanceId,
      groups,
      userTenantCode
    );
    const api = buildAditionalDataForCloseTask();
    return axios.post(api.additionalData.url, payload).then((res) => res.data);
  },
  async getOfferCounts(propertyId) {
    return axios
      .get(
        `${OfferApiConfig.api.property_offer_listing}?propertyId=${propertyId}&from=0&size=10&sortOrder=&sortFieldName=`
      )
      .then((res) => res.data);
  }
};
