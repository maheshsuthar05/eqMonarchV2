import { ManageProductVendor, forgerock, party } from 'app/config/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export const ManageProductVendorApi = {
  async getForm() {
    return axios
      .get(ManageProductVendor.api.addProductFormData)
      .then((res) => res.data);
  },
  async insert(productId) {
    const payload = {
      createdBy: Cookies.get(forgerock.cookie.userName),
      productId: productId
    };
    return axios
      .post(ManageProductVendor.api.insert, payload)
      .then((res) => res.data);
  },
  async get() {
    return axios.get(ManageProductVendor.api.get).then((res) => res.data);
  },
  async getProductByProductId(productId) {
    return axios
      .get(party.api.product.getById(productId))
      .then((res) => res.data);
  },
  async getCategoryByProductId(productId) {
    return axios
      .get(party.api.product.getCategoryByProductId(productId))
      .then((res) => res.data);
  },
  async deleteProductByProductId(productId) {
    return axios
      .delete(ManageProductVendor.api.delete(productId))
      .then((res) => res.data);
  },
  async getVendorProductByProductID(productId) {
    return axios
      .get(party.api.product.getByIdAndVendorProduct(productId))
      .then((res) => res.data);
  },
  async getVendorById(vendorId) {
    return axios
      .get(party.api.vendor.getById(vendorId))
      .then((res) => res.data);
  },
  async getPartyById(partyId) {
    return axios.get(party.api.getById(partyId)).then((res) => res.data);
  },
  async vendorProductSubscriptionInsert(vendorProduct) {
    const payload = {
      createdBy: Cookies.get(forgerock.cookie.userName),
      activeIndicator: 1,
      tenantId: Cookies.get(forgerock.cookie.tenantCode),
      eqvmVendorProduct: vendorProduct._links.eqvmVendorProduct.href
    };
    return axios.post(party.api.TenantVendorSubscription.insert, payload);
  }
};
