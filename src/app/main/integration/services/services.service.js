import { apiServices } from 'app/config/api';
import axios from 'axios';
import { fileDownloader } from 'app/common/helpers/common-helper';

export const services = {
  async serviceListDownlod(id) {
    await axios.get(apiServices.api.downloadService(id)).then((res) => {
      fileDownloader(
        JSON.stringify(res.data),
        `ServiceList-${id}.json`,
        'attachment/json'
      );
    });
  },

  async serviceListUpload(payload) {
    const filePromise = new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsText(payload);
      fileReader.onload = function () {
        let getFileContent = JSON.parse(fileReader.result);
        const response = axios
          .post(apiServices.api.uploadService, getFileContent)
          .then((res) => res);
        resolve(response);
      };
    });
    return filePromise.then((res) => {
      return res;
    });
  },

  async get(page, pageSize) {
    const defaultPage = page === undefined ? 0 : page;
    const defaultPageSize = pageSize === undefined ? 20 : pageSize;

    return await axios
      .get(apiServices.api.get(defaultPage, defaultPageSize))
      .then((res) => res.data);
  },
  async save(payload) {
    return await axios.post(apiServices.api.insert, payload).then((res) => res);
  },
  async delById(id) {
    return await axios
      .delete(apiServices.api.delByID(id))
      .then((res) => res.data);
  },
  async update(payload) {
    return await axios
      .put(apiServices.api.update(payload.serviceId), payload)
      .then((res) => res.data);
  },
  async getByID(id) {
    return await axios.get(apiServices.api.getByID(id)).then((res) => res);
  }
};
