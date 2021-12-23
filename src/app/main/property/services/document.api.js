import { PropertyDocumentApiConfig } from 'app/config/api';
import axios from 'axios';

export const documentApi = {
  async propertyDocumentUploadForm() {
    return axios
      .get(PropertyDocumentApiConfig.api.upload_document_form)
      .then((res) => res.data);
  },

  async propertyPreviewFileData({fileCatType,propertyId}) {
    return axios
      .get(PropertyDocumentApiConfig.api.previewFile(fileCatType,propertyId))
      .then((res) =>res.data);
  },

  async propertyDocumentPreviewForm() {
    return axios
      .get(PropertyDocumentApiConfig.api.preview_document_form)
      .then((res) =>res.data);
  },

  async getPropertyDocumentFormDefinition() {
    return axios
      .get(PropertyDocumentApiConfig.api.document_form_def)
      .then((res) => res.data);
  },

  async deletePropertyDocument(tenantCode, deleteFileURL, fileCategoryType) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        tenantCode: tenantCode,
        fileCategoryType: fileCategoryType,
      },
    };
    // TODO once proxy is available
    // ${PropertyDocumentApiConfig.api.delete}${deleteFileURL}
    return await axios
      .delete(`${deleteFileURL}`, config)
      .then((res) => res.data);
  },

  async uploadPropertyDocument(
    tenantCode,
    payload,
    fileCategoryType,
    investorId,
    propertyId
  ) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        tenantCode: tenantCode,
        fileCategoryType: fileCategoryType,
        investorId: investorId,
        propertyId: propertyId,
      },
    };

    const formData = new FormData();
    formData.append('file', payload);

    return await axios
      .post(PropertyDocumentApiConfig.api.upload, formData, config)
      .then((res) => res.data);
  },
};
