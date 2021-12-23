import React from 'react';
import MailApp from '../mail-box/MailApp';
import OfferListPropertyPage from '../offer/offer-list-property/OfferListPropertyPage';
import AssignedRolePage from '../property/assigned-role/AssignedRolePage';
import PropertyDecisionPage from '../property/property-decision/PropertyDecisionPage';
import PropertyDocumentPage from '../property/property-document/PropertyDocumentPage';
import TaskManagmentApp from '../task-management/TaskManagmentApp';
import PropertyDetailsMain from '../property/property-details/PropertyDetailsMain';

//Tenant Admin
//property
import DefaultRolesPage from '../admin/tenant/property/default-roles/DefaultRolesPage';
import TeamRolesPage from '../admin/tenant/property/team-roles/TeamRolesPage';
import StateRoleAssignmentPage from '../admin/tenant/property/state-role-assignment/StateRoleAssignmentPage';
import LegalEntitiesPage from '../admin/tenant/property/legal-entity/LegalEntitiesPage';

//Rules
import RulePage from '../admin/tenant/business-rule/rule-management/RulePage';
import ManageCommissionPage from '../admin/tenant/business-rule/manage-commission/ManageCommissionPage';
import ManageValuationPage from '../admin/tenant/business-rule/manage-valuation/ManageValuationPage';
import ManageTimelinePage from '../admin/tenant/business-rule/manage-timeline/ManageTimeLineListing';
import StateEvictionPage from '../admin/tenant/business-rule/state-eviction/StateEvictionPage';

//Settings
import WorkstationConfigurationPage from '../admin/tenant/business-rule/workstation-configuration/WorkstationConfigurationPage';
import ManageWorkflowSettingPage from '../admin/tenant/business-rule/manage-workflow-setting/ManageWorkflowSettingPage';
import ManageSetReservePricePage from '../admin/tenant/business-rule/manage-set-reserve-price/ManageSetReservePricePage';
import StateAppriasalPage from '../admin/tenant/business-rule/state-appriasal/StateAppriasalPage';

//Access Management
import MICompaniesPage from '../admin/tenant/access-management/access-management-tabs/MI-Companies/MICompaniesPage';
import InvestorPage from '../admin/tenant/access-management/access-management-tabs/investor/InvestorPage';
import InvestorGroupPage from '../admin/tenant/access-management/access-management-tabs/investor-group/InvestorGroupPage';

//Admin Task
import TaskPropertiesPage from '../admin/tenant/task/task-properties/TaskPropertiesPage';

//Admin Task
import LenderLibraryPage from '../admin/tenant/documentation/documentation-tabs/LenderLibraryPage';

//IAM
import TenantDetails from 'app/main/tenant/tenant-details/TenantDetailsPage';
import TenantUserListPage from 'app/main/tenant/tenant-user-list/TenantUserListPage';
import TenantIAMRoles from 'app/main/tenant/tenant-property-roles/TenantPropertyRolesListPage';
import TenantIAMPrivilege from 'app/main/tenant/tenant-privilege-list/TenantPrivilegeListPage';
import TenantIAMGroups from 'app/main/tenant/tenant-role-list/TenantRoleListPage';
import TenantIAMRolePrivilege from 'app/main/tenant/tenant-role-privilege-list/TenantRolePrivilegeListPage';
import TenantIAMDataMasking from 'app/main/tenant/data-masking/DataMaskingPage';

//Vendor
import ManageProductPage from '../admin/manage-products-vendors/vendors/ManageProductPage';
import ListProducts from '../admin/manage-products-vendors/products/ListProducts';
import VendorsPage from '../admin/manage-products-vendors/vendors/VendorsPage';
import ManageTaskPage from '../admin/manage-products-vendors/vendors/ManageTaskPage';
import OrderStatusPage from '../admin/manage-products-vendors/vendors/OrderStatusPage';
import PropertyByReagion from '../home/home/DataStudio/PropertyByReagion';
import TaskActiveDetails from '../home/home/DataStudio/TaskActiveDetails';
import TaskByPhase from '../home/home/DataStudio/TaskByPhase';
import TaskByPhaseAndProcess from '../home/home/DataStudio/TaskByPhaseAndProcess';
import ServicePage from 'app/main/integration/service/ServicePage';
import OperationPage from 'app/main/integration/operation/OperationPage';

//vendor page
import VendorDashboard from 'app/main/vendor/dashboard/DashboardPage';
import VendorAccount from 'app/main/vendor/account/AccountPage';
import VendorAccountProfile from 'app/main/vendor/account/profile/ProfilePage';
import VendorOrders from 'app/main/vendor/OrderPage';
import VendorStatement from 'app/main/vendor/StatementPage';
import VendorExpense from 'app/main/vendor/ExpensePage';
import ProfilePage from 'app/main/vendor/account/profile/ProfilePage';
import VendorServicesPage from 'app/main/vendor/vendor-services/VendorServicesPage';

const TenantIAM = {
  TenantDetails,
  TenantUserListPage,
  TenantIAMRoles,
  TenantIAMPrivilege,
  TenantIAMGroups,
  TenantIAMRolePrivilege,
  TenantIAMDataMasking
};

const AdminProperty = {
  DefaultRolesPage,
  TeamRolesPage,
  StateRoleAssignmentPage,
  LegalEntitiesPage
};

const AdminRules = {
  RulePage,
  ManageCommissionPage,
  ManageValuationPage,
  ManageTimelinePage,
  StateEvictionPage
};
const AdminSettings = {
  WorkstationConfigurationPage,
  ManageWorkflowSettingPage,
  ManageSetReservePricePage,
  StateAppriasalPage
};

const AdminAccessManagement = {
  MICompaniesPage,
  InvestorPage,
  InvestorGroupPage
};

const AdminTask = {
  TaskPropertiesPage
};

const AdminDocumentation = {
  LenderLibraryPage
};

const Vendor = {
  VendorsPage,
  ManageProductPage,
  ListProducts,
  ManageTaskPage,
  OrderStatusPage
};

const vendorPage = {
  VendorDashboard,
  VendorAccount,
  VendorAccountProfile,
  ProfilePage,
  VendorOrders,
  VendorStatement,
  VendorExpense,
  VendorServicesPage
};
const Integration = {
  ServicePage,
  OperationPage
};

const KeysToComponentMap = {
  TaskManagmentApp,
  MailApp,
  OfferListPropertyPage,
  AssignedRolePage,
  PropertyDecisionPage,
  PropertyDocumentPage,
  PropertyDetailsMain,
  TaskActiveDetails,
  PropertyByReagion,
  TaskByPhase,
  TaskByPhaseAndProcess,
  ...AdminProperty,
  ...AdminRules,
  ...AdminSettings,
  ...AdminAccessManagement,
  ...AdminTask,
  ...AdminDocumentation,
  ...TenantIAM,
  ...Vendor,
  ...vendorPage,
  ...Integration
};

const components = {};

export const registerComponent = (Component) => {
  components[Component] = KeysToComponentMap[Component];
};

const DynamicComponentRender = (props) => {
  registerComponent(props.component);
  const C = components[props.component];
  return C ? <C {...props} /> : null;
};

export default DynamicComponentRender;
