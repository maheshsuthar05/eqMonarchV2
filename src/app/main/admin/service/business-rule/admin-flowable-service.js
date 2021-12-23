import { flowable, AdminManagerApiConfig } from 'app/config/api';
import axios from 'axios';

export const adminFlowableService = {
    async getCaseDef(caseKey) {
        return axios
            .get(AdminManagerApiConfig.api.getCaseDefByCaseKey(caseKey))
            .then((res) => res.data);
    },

    async getProcessDef(key) {
        return axios
            .get(AdminManagerApiConfig.api.getProcessDefBykey(key))
            .then((res) => res.data);
    },

    async getFormByCaseId(id) {
        return axios
            .get(flowable.api.getFormByCaseId(id))
            .then((resp) => resp.data);
    },

    async save(payload) {
        return axios
            .post(AdminManagerApiConfig.api.save, payload)
            .then((res) => res.data);
    },

    async update(payload) {
        return axios
            .post(AdminManagerApiConfig.api.update, payload)
            .then((res) => res.data);
    },    
    
    async searchCaseInstance(payload) {
        return axios
            .post(AdminManagerApiConfig.api.getCaseQueryUrl, payload)
            .then((res) => res.data);
    },
}