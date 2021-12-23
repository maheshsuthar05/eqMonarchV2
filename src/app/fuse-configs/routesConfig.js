import TaskManagementAppConfig from 'app/main/task-management/TaskManagementAppConfig';
import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/auth/login/LoginConfig';
import ServicePageConfig from 'app/main/integration/service/ServiceConfig';
import OperationPageConfig from 'app/main/integration/operation/OperationPageConfig';
import PropertyPageConfig from 'app/main/property/PropertyPageConfig';
import HomeConfig from 'app/main/home/HomeConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import TenantConfig from 'app/main/tenant/TenantPageConfig';
import MailAppConfig from 'app/main/mail-box/MailAppConfig';
import ThemesPaletteConfig from 'app/main/pages/themePalette/ThemesPaletteConfig';
import LogoutConfig from 'app/auth/logout/LogoutPageConfig';
import AdminConfig from 'app/main/admin/AdminConfig';
import VerificationPageConfig from 'app/main/verification/VerificationPageConfig';
import VendorAppConfig from 'app/main/vendor/VendorPageConfig';
import AgentAppConfig from 'app/main/agent/AgentPageConfig';
import OfferAppConfig from 'app/main/offer/OfferPageConfig';
import PropertyBulkImportPageConfig from 'app/main/property/property-bulkimport/PropertyBulkImportPageConfig';

const routeConfigs = [
  PropertyBulkImportPageConfig,
  ServicePageConfig,
  OperationPageConfig,
  PropertyPageConfig,
  ...HomeConfig,
  ...pagesConfigs,
  ...TenantConfig,
  ThemesPaletteConfig,
  MailAppConfig,
  LoginConfig,
  LogoutConfig,
  TaskManagementAppConfig,
  ...AdminConfig,
  VerificationPageConfig,
  ...VendorAppConfig,
  AgentAppConfig,
  OfferAppConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/verification/user" />
  },
  {
    component: () => <Redirect to="/pages/error-404" />
  }
];

export default routes;
