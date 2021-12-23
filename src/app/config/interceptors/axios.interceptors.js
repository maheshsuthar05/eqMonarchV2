import axios from 'axios';
import { forgerock } from 'app/config/api';
import Cookies from 'js-cookie';
import { uniqueIdentifier } from 'app/common/helpers/common-helper';
import { host } from 'app/config/api';
import history from '@history';

export const Interceptor = {
  defaultInstance: () => {
    axios.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['asps-request-id'] = uniqueIdentifier();
      config.headers.tenantCode = Cookies.get(forgerock.cookie.tenantCode);
      return config;
    });
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        handleErrorResponse(error);
        return Promise.reject(error);
      }
    );
  },

  customInstance: (headers) => {
    const instance = axios.create();
    instance.interceptors.request.use((config) => {
      config.headers['asps-request-id'] = uniqueIdentifier();
      Object.keys(headers).map((key) => {
        config.headers[key] = headers[key];
        return key;
      });
      return config;
    });
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        handleErrorResponse(error);
        return Promise.reject(error);
      }
    );
    return instance;
  }
};

const handleErrorResponse = (errorResponse) => {
  if (errorResponse?.response?.status === 401) {
    if (!host.isDevEnv()) {
      history.push('/pages/auth-lock');
    }
  }
};
