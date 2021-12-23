import axios from 'axios';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';
import { PropertyDocumentApiConfig } from 'app/config/api';

export const documentServices = {
  async deleteDocument(fileURL,fileCategoryType) {
    const config = {
      headers: {
        fileCategoryType,
      },
    };
    const instance = Interceptor.customInstance(config.headers);
    return await instance
      .delete(`${fileURL}`, config)
      .then((res) => res.data);
  },
  async getDocumentsList(propertyId) {
    return axios
      .get(PropertyDocumentApiConfig.api.getDocumentsList(propertyId))
      .then((res) =>res.data);
  },
};
