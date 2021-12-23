import { TenantApiConfig, forgerock } from 'app/config/api';
import axios from 'axios';

const getExternalURLs = async (tenantCode) => {
  return await axios.get(TenantApiConfig.api.external_urls).then((response) => {
    return response.data;
  });
};

const authRedirectURLs = async (username,password) => {
  const payload = {
    username,password,remember: true,
  }
  return await axios.post(forgerock.api.dataStudioAuth,payload).then((response) => {
    return response.data;
  });
};

export default {
  getExternalURLs,authRedirectURLs
};
