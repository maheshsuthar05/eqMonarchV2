import { PropertyDocumentApiConfig } from 'app/config/api';
import axios from 'axios';
import { fileDownloader } from 'app/common/helpers/common-helper';

export const bulkImportApi = {
  async downloadTemplate(s3Url) {
    return await axios.get(s3Url).then((res) => {
      if (res) {
        return fileDownloader(s3Url, '', 'link');
      }
    });
  },
  async uploadTemplate(
    tenantCode,
    payload,
    fileCategoryType,
    investorId = 'BULK_IMPORT',
    propertyId = 'PROPERTY_BULK_IMPORT'
  ) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        tenantCode,
        fileCategoryType,
        investorId,
        propertyId
      }
    };
    const formData = new FormData();
    formData.append('file', payload);

    return await axios
      .post(PropertyDocumentApiConfig.api.upload, formData, config)
      .then((res) => res.data);
  },
  async getErrorFileDetails(batchId) {
    let fileCategoryType = 'property_bulk_error';
    return await axios
      .get(PropertyDocumentApiConfig.api.previewFile(fileCategoryType, batchId))
      .then((res) => res.data);
  }
};
