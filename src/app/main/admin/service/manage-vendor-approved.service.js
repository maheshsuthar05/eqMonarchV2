import { ManageProductVendor, forgerock, party } from 'app/config/api';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Interceptor } from 'app/config/interceptors/axios.interceptors';

const tenantCode = Cookies.get(forgerock.cookie.tenantCode);

export const VendorProductApproveApi = {
  async getVendorList() {
    const axiosInstance = Interceptor.customInstance({
      // tenantCode: Cookies.get(forgerock.cookie.tenantCode),
      // maskresponse: 'true'
    });
    return axiosInstance
      .get(ManageProductVendor.api.getVendorList)
      .then((res) => res.data);
  },
  async insertTenantVendorApproval(arg, vendorProduct) {
    const payload = {
      activeIndicator: parseInt(arg.data.STATUS),
      approvalType: arg.data.APPROVAL_TYPE,
      eqvmVendorProduct: vendorProduct._links.eqvmVendorProduct.href,
      tenantId: tenantCode
    };

    return axios
      .post(party.api.productSubscription.insert('internal'), payload)
      .then((res) => res.data);
  },
  async putTenantVendorApproval(arg, vendorProduct) {
    const payload = {
      activeIndicator: parseInt(arg.data.STATUS),
      approvalType: arg.data.APPROVAL_TYPE,
      vendorProductSubscriptionId : arg.data.PRODUCT_SUBSCRIPTION_ID,
      tenantId: tenantCode
    };

    return axios
      .patch(
        party.api.productSubscription.update(
          'internal',
          arg.data.VENDOR_PRODUCT_ID
        ),
        payload
      )
      .then((res) => res.data);
  },
  async getVendorProduct(arg) {
    return axios
      .get(
        party.api.vendorProduct.getById(arg.data.VENDOR_PRODUCT_ID, 'internal')
      )
      .then((res) => res.data);
  }
};
