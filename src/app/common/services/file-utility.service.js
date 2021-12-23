import {
  fileDownloader,
  getFileFromBlob
} from 'app/common/helpers/common-helper';
import { mailMergeApiConfig } from 'app/config/api';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';
import axios from 'axios';

export const fileUtils = {
  async downloadFile(fileUrl) {
    return fileDownloader(fileUrl, '', 'link');
  },
  async generateFile(payload, tenantCode, templateDetails) {
    const headers = {
      'Content-Type': 'application/json',
      tenantCode: tenantCode,
      correspondenceType:
        payload.fileType === undefined ? 'PDF' : payload.fileType
    };
    const instance = Interceptor.customInstance(headers);
    const url = mailMergeApiConfig.api.generateFile(
      templateDetails?.templateId
    );
    const data = payload?.data;
    let fileDetails = [
      {
        operationType: '',
        fileName: '',
        fileS3Url: '',
        createdBy: '',
        fileUrl: '',
        blob: ''
      }
    ];
    return await instance
      .post(url, data, { responseType: 'blob' })
      .then((response) => {
        fileDetails[0].blob = response;
        fileDetails[0].fileUrl = getFileFromBlob(response);
        return fileDetails;
      });
  },
  async checkTemplate(payload) {
    return await axios
      .get(mailMergeApiConfig.api.getTemplateDetails)
      .then((response) => {
        return response.data?.templates;
      });
  }
};
