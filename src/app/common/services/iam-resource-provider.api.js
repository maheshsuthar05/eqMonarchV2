import { hasAccess } from 'app/common/helpers/common-helper';
import { forgerock } from 'app/config/api';
import { Interceptor } from 'app/config/interceptors/axios.interceptors';

const resourceAccess = async (resources, tenantCode, realm) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-API-Version': forgerock.headers.acceptAPIVersion,
    tenantCode: tenantCode
  };
  const axiosInstance = Interceptor.customInstance(headers);
  const payload = {
    application: `${tenantCode}-PolicySet`,
    resources: resources
  };
  return await axiosInstance
    .post(forgerock.api.resource(realm), payload)
    .then((response) => response);
};

const navigationAccess = async (navigationItems, resources) => {
  const result = navigationItems.filter((item, index) => {
    item.hidden = !hasAccess(resources, item.id);
    if (item.hasOwnProperty('children')) {
      navigationAccess(item.children, resources);
    }

    return item;
  });
  return result;
};

// Filtering child item has hidden === false.
const getChildNavigationConfig = (children) => {
  const childrens = [...children];
  const childrenResults = [];
  childrens.map((child) => {
    if (child.hidden === false) {
      childrenResults.push(child);
    }
    return false;
  });
  return childrenResults;
};

// Filtering item has hidden === false.
const getNavigationConfig = async (navigations) => {
  const navigationItems = [...navigations];
  const results = [];
  navigationItems.map((item) => {
    let tempItem = { ...item };
    if (item.hidden === false) {
      delete tempItem.children;
      if (item.hasOwnProperty('children')) {
        tempItem.children = [];
        tempItem.children = getChildNavigationConfig(item.children);
      }
      results.push(tempItem);
    }
    return tempItem;
  });
  return results;
};

const getResourceIds = (resources) => {
  const resourceIds = [];
  Object.keys(resources).map((key) => {
    resourceIds.push(resources[key]);
    return key;
  });
  return resourceIds;
};

export default {
  resourceAccess,
  navigationAccess,
  getNavigationConfig,
  getResourceIds
};
