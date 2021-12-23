import { TenantApiConfig } from 'app/config/api';
import axios from 'axios';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';
import { fileDownloader } from 'app/common/helpers/common-helper';

export const tenantApi = {
  async updateRoles(partyRoleType, payload) {
    return await axios
      .post(TenantApiConfig.api.updateRoles(partyRoleType), payload)
      .then((res) => res);
  },

  async getPartyRoleTypes(size) {
    return await axios
      .get(TenantApiConfig.api.partyRoleTypes(size))
      .then((res) => res.data);
  },

  async getRolePartyDtos(partyRoleType) {
    return await axios
      .get(TenantApiConfig.api.getRolePartyDtos(partyRoleType))
      .then((res) => res.data);
  },

  async deleteRoles(roleId) {
    return await axios
      .delete(TenantApiConfig.api.deleteRoles(roleId))
      .then((res) => res);
  },

  async resourceSink() {
    return await axios
      .get(TenantApiConfig.api.resource_sink)
      .then((res) => res);
  },

  async downloadFile() {
    await axios.get(TenantApiConfig.api.download_file).then((res) => {
      fileDownloader(res.data, 'ResourcePrivilegeList.csv', 'text/csv');
    });
  },

  async uploadFile(tenantCode, payload) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const instance = Interceptor.customInstance(config.headers);
    const formData = new FormData();
    formData.append('file', payload);

    return await instance
      .post(TenantApiConfig.api.upload_file, formData)
      .then((res) => res.data);
  },

  async userRoleGroupAdd(tenantCode, payload) {
    return await axios({
      method: 'post',
      url: TenantApiConfig.api.add_role_group,
      data: payload
    }).then((res) => res);
  },

  async resourceAdd(tenantCode, payload) {
    return axios
      .post(TenantApiConfig.api.add_resource, payload)
      .then((res) => res.data);
  },

  async resourceView(tenantCode, payload) {
    const url = TenantApiConfig.api.view_resource(payload.resourceId);
    return axios.get(url).then((res) => res.data);
  },

  async roleView(tenantCode, payload) {
    const url = TenantApiConfig.api.view_role(payload.name);
    return axios.get(url).then((res) => res.data);
  },

  async resourceEdit(tenantCode, payload) {
    const url = TenantApiConfig.api.edit_resource(payload.resourceId);
    return axios.put(url, payload).then((res) => res.data);
  },

  async userEdit(tenantCode, payload) {
    let url = TenantApiConfig.api.edit_user(payload.id);
    return axios.put(url, payload).then((res) => res.data);
  },

  async roleEdit(tenantCode, payload) {
    let url = TenantApiConfig.api.edit_role(payload.name);
    return axios.put(url, payload).then((res) => res);
  },

  async groupEdit(tenantCode, payload) {
    let url = TenantApiConfig.api.edit_group(payload.name);
    let list = [];
    payload.selectedList.forEach((element) => {
      list.push(element.id);
    });
    return axios.put(url, list).then((res) => res.data);
  },

  async getCaseDefinition(tenantCode) {
    const headers = {
      'Content-Type': 'application/json',
      tenantCode: tenantCode,
      key: TenantApiConfig.headers.caseDefinitionKey,
      latest: true
    };
    const instance = Interceptor.customInstance(headers);
    const url = TenantApiConfig.api.get_case_def(
      tenantCode,
      TenantApiConfig.headers.caseDefinitionKey
    );

    return instance.get(url).then((res) => res.data);
  },

  async userDelete(tenantCode, payload) {
    let url = TenantApiConfig.api.delete_user(payload.id);
    return axios.put(url, payload).then((res) => res.data);
  },

  async groupDelete(tenantCode, payload) {
    let url = TenantApiConfig.api.delete_group(payload.name);
    return axios.delete(url, payload).then((res) => res.data);
  },

  async resourceDelete(tenantCode, payload) {
    let url = TenantApiConfig.api.delete_resource(payload.resourceId);
    return axios.delete(url, payload).then((res) => res.data);
  },

  async roleDelete(tenantCode, payload) {
    let url = TenantApiConfig.api.delete_role(payload.name);
    return axios.delete(url, payload).then((res) => res.data);
  },

  async userAdd(tenantCode, payload) {
    return axios
      .post(TenantApiConfig.api.add_user, payload)
      .then((res) => res.data);
  },

  async userView(tenantCode, payload) {
    const url = TenantApiConfig.api.view_user(payload.id);
    return axios.get(url).then((res) => res.data);
  },

  async userGet(tenantCode, payload) {
    const url = TenantApiConfig.api.view_user(payload);
    return axios.get(url).then((res) => res.data);
  },

  async groupView(tenantCode, payload) {
    const url = TenantApiConfig.api.view_group(payload.name);
    return axios.get(url).then((res) => res.data);
  },

  async groupList(tenantCode, payload) {
    const url = TenantApiConfig.api.groupUrl;
    return axios.get(url).then((res) => res.data);
  },
  async userList(tenantCode, payload) {
    const url = TenantApiConfig.api.get_users;
    return axios.get(url).then((res) => res.data);
  },

  async roleAdd(tenantCode, payload) {
    return axios
      .post(TenantApiConfig.api.add_role, payload)
      .then((res) => res.data);
  },

  async groupAdd(tenantCode, payload) {
    return axios
      .post(TenantApiConfig.api.add_group(payload.name), payload)
      .then((res) => res.data);
  },

  async groupAssociateUsers(tenantCode, payload) {
    let list = [];
    payload.selectedList.forEach((element) => {
      list.push(element.id);
    });
    return axios
      .put(TenantApiConfig.api.add_group(payload.name), list)
      .then((res) => res.data);
  },

  async getAddTenantFormDefinition() {
    return axios
      .get(TenantApiConfig.api.tenant_add_form_def)
      .then((res) => res.data);
  },

  async getUserListFormDefinition() {
    return axios
      .get(TenantApiConfig.api.user_listing_form_def)
      .then((res) => res.data);
  },

  async getGroupListFormDefinition() {
    return axios
      .get(TenantApiConfig.api.group_listing_form_def)
      .then((res) => res.data);
  },

  async getResourceListFormDefinition() {
    return axios
      .get(TenantApiConfig.api.resource_listing_form_def)
      .then((res) => res.data);
  },

  async getRoleListFormDefinition() {
    return axios
      .get(TenantApiConfig.api.role_listing_form_def)
      .then((res) => res.data);
  },

  async getTenantHeaderFormDefinition() {
    return axios
      .get(TenantApiConfig.api.tenant_header_form_def)
      .then((res) => res.data);
  },

  async getRoleAddFormDefinition() {
    return axios
      .get(TenantApiConfig.api.role_add_form_def)
      .then((res) => res.data);
  },

  async getUserAddFormDefinition() {
    return axios
      .get(TenantApiConfig.api.user_add_form_def)
      .then((res) => res.data);
  },

  async getGroupAddFormDefinition() {
    return axios
      .get(TenantApiConfig.api.group_add_form_def)
      .then((res) => res.data);
  },

  async getResourceAddFormDefinition() {
    return axios
      .get(TenantApiConfig.api.resource_add_form_def)
      .then((res) => res.data);
  },

  async getTenantListFormDefination() {
    return axios
      .get(TenantApiConfig.api.tenant_list_form_def)
      .then((res) => res.data);
  },

  async tenantAdd(tenantCode, payload, user) {
    const headers = {
      'Content-Type': 'application/json',
      tenantCode: 'admin'
    };
    const instance = Interceptor.customInstance(headers);
    const dataPayload = {
      ...payload
    };
    payload = {};
    payload['operation'] = 'INSERT';
    payload['createdBy'] = user.data.userName;
    payload.tenant = {
      description: dataPayload.description,
      tenantCode: dataPayload.tenantCode,
      tenantName: dataPayload.tenantName,
      websiteUrl: dataPayload.websiteURL
    };
    payload.tenantAddresses = [
      {
        addressAdditionalLineText: dataPayload.address2,
        addressLineText: dataPayload.address1,
        cityName: dataPayload.city,
        countryName: dataPayload.country,
        plusFourZipCode: dataPayload.zipCode,
        stateName: dataPayload.stateName
      }
    ];
    payload.tenantEmails = [
      {
        tenantEmailValue: dataPayload.email
      }
    ];
    payload.tenantTelephones = [
      {
        tenantTelephoneValue: dataPayload.phoneNumber
      }
    ];
    return instance
      .post(TenantApiConfig.api.tenant_list, payload)
      .then((res) => res.data);
  },

  async getTenantById(tenantId) {
    const data = {
      operation: 'FETCH_ALL',
      pageNo: '0',
      pageSize: '100',
      sortField: '',
      tenantId: tenantId,
      tenant: []
    };

    return await axios
      .post(TenantApiConfig.api.get_tenant, data)
      .then((res) => res.data);
  },

  async getRoleList(tempTenantCode) {
    return await axios
      .get(TenantApiConfig.api.get_role_list(tempTenantCode))
      .then((response) => response.data);
  },

  async getResourceList(tempTenantCode) {
    return await axios
      .get(TenantApiConfig.api.get_resource_list(tempTenantCode))
      .then((response) => response.data);
  },

  async getTenantList() {
    const payload = {
      tenantCode: 'admin',
      operation: 'FETCH_ALL',
      pageNo: '0',
      pageSize: '100',
      sortField: 'serviceId',
      tenant: []
    };

    const headers = {
      'Content-Type': 'application/json',
      tenantCode: 'admin'
    };
    const instance = Interceptor.customInstance(headers);
    return instance
      .post(TenantApiConfig.api.tenant_list, payload)
      .then((response) => response.data);
  },

  async addDataMask(payload) {
    return axios
      .put(TenantApiConfig.api.add_data_mask(payload.serviceName), payload)
      .then((res) => res.data);
  },

  async resetPasswordApi(payload, realm) {
    const headers = {
      'Accept-API-Version': TenantApiConfig.headers.acceptAPIVersion
    };
    const instance = Interceptor.customInstance(headers);
    const customPayload = {
      input: {
        queryFilter: `uid eq "${payload}"`
      }
    };
    return instance
      .post(TenantApiConfig.api.resetPassword(realm), customPayload)
      .then((res) => res.data);
  }
};
