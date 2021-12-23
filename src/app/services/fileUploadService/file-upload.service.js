import { fileUpload } from 'app/config/api';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

export const fileUploadApi = {
  async upload(attachment, data, operationType) {
    const fileFormData = new FormData();

    fileFormData.append('file', attachment.fileData);

    const headers = {
      'Content-Type': 'multipart/form-data',
      FileCategoryType: data.fileCategoryType,
      investorId: data.investorId,
      propertyId: data.parentId,
      tenantCode: data.tenantId.tenantID
    };

    const instance = Interceptor.customInstance(headers);

    const response = await instance
      .post(fileUpload.api.upload, fileFormData)
      .then((res) => {
        let fileDetails = {
          operationType: operationType,
          fileName: res.data.fileName,
          fileS3Url: res.data.fileS3Url,
          createdBy: res.data.createdBy
        };
        return fileDetails;
      });

    return response;
  }
};
