import { flowableControlApiConfig as controlApi } from 'app/config/api';
import axios from 'axios';

export const flowableControl = {
  async login(userName, password) {
    const config = {
      headers: {
        'Content-Type': controlApi.headers.content_type
      }
    };
    const params = new URLSearchParams();
    return await axios
      .post(controlApi.api.login(userName, password), params, config)
      .then((resp) => resp.data);
  },
  async getLoginCredential() {
    return await axios
      .get(controlApi.api.login_credential)
      .then((resp) => resp.data);
  }
};
