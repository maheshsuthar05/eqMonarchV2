export const host = {
  isDevEnv: () =>
    process.env.REACT_APP_CUSTOM_NODE_ENV.toLowerCase().trim() ===
    'development',
  forgerock: process.env.REACT_APP_FAM_API,
  core: process.env.REACT_APP_FLOWABLE_API,
  json: process.env.REACT_APP_JSON_API,
  flowable: process.env.REACT_APP_FLOWABLE_API,
  flowableFAMCore: process.env.REACT_APP_FLOWABLE_FAM_API,
  properties: process.env.REACT_APP_PROPERTIES_API,
  monarch: process.env.REACT_APP_MONARCH_API,
  user: process.env.REACT_APP_USER_API,
  property: process.env.REACT_APP_PROPERTY_API,
  party: process.env.REACT_APP_PARTY_API,
  loan: process.env.REACT_APP_LOAN_API,
  file: process.env.REACT_APP_FILE_API,
  fileDetail: process.env.REACT_APP_FILE_LIST_API,
  userMetadata: process.env.REACT_APP_USER_METADATA,
  ldap: process.env.REACT_APP_LDAP_API,
  fileUpload: process.env.REACT_APP_FILE_UPLOAD_API,
  milestone: process.env.REACT_APP_MILESTONE_API,
  apiServices: process.env.REACT_APP_INTEGRATION_API,
  apiServicesPublish: process.env.REACT_APP_FLOWABLE_API,
  propertyFilter: process.env.REACT_APP_PROPERTY_FILTER,
  propertyXref: process.env.REACT_APP_PROPERTY_XREF_API,
  rest: process.env.REACT_APP_REST_API,
  adminServices: process.env.REACT_APP_ADMIN_API,
  offerMetadata: process.env.REACT_APP_OFFER_METADATA_API,
  dataMask: process.env.REACT_APP_DATA_MASK_API,
  cwcot: process.env.REACT_APP_CWCOT,
  vendorApproval: process.env.REACT_APP_VENDOR_APPROVAL, //process.env.REACT_APP_JSON_API
  investorGroupListing: process.env.REACT_APP_INVESTOR_GROUP_LIST,
  enumerationMasters: process.env.REACT_APP_ENUMERATOIN_API,
  operations: process.env.REACT_APP_OPERATIONS_API,
  oms: process.env.REACT_APP_OMS_API,
  mailMerge: process.env.REACT_APP_MAIL_MERGE,
  eqUi: process.env.REACT_APP_EQ_UI,
  reo: process.env.REACT_APP_REO_API,
  fileUploadV2: process.env.REACT_APP_FILE_UPLOAD_V2,
  flowableControl: process.env.REACT_APP_EQ_UI_CONTROL,
  changelog: process.env.REACT_APP_CHANGE_LOG,
  message: process.env.REACT_APP_MESSAGE
};

export const bulkOperations = {
  api: {
    templateListing: host.operations.concat(`/batch-listing/batchDataList`),
    batchList:
      '/eq-api/bulk-upload/batch-listing/batchDataList?from=0&size=1000&sortFieldName=BATCH_ID&sortOrder=DESC',
    batchErrorList: (batchId) =>
      `/eq-api/bulk-upload/batch-error-listing/batchExceptionList?batchId=${batchId}`
  }
};

export const legacyTask = {
  api: {
    taskCloseList: '/eq-api/ext-legacymessages'
  }
};

export const flowable = {
  api: {
    openTask: host.flowable.concat(`/taskListing/opentasks`),
    closeTask: host.flowable.concat(`/taskListing/closedtasks`),
    allTask: (caseInstanceId) =>
      host.flowable.concat(`/taskListing/alltasks/${caseInstanceId}`),
    listing: host.json.concat('/configIntegrationListingForm.json'),
    mailCompose: (source) =>
      host.json.concat(`/mail/${source}mailCompose.json`),
    processDefinition: (key, latest, tenantId) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?key=${key}&latest=${latest}&tenantId=${tenantId}`
      ),
    processInstance: host.flowable.concat(
      `/process-api/runtime/process-instances`
    ),
    processTaskQuery: host.flowable.concat(`/process-api/query/tasks`),
    processFormDefinition: (taskId) =>
      host.flowable.concat(`/core-api/tasks/${taskId}/form`),
    processTaskComplete: (taskId) =>
      host.flowable.concat(`/process-api/runtime/tasks/${taskId}`),
    getFormByDefinitionId: (processesDefinitionId) =>
      host.flowable.concat(
        `/core-api/process-definitions/${processesDefinitionId}/start-form`
      ),
    getAllCmmnQueryTask: host.flowable.concat(`/cmmn-api/cmmn-query/tasks`),
    coreApiTaskComplete: (taskId) =>
      //host.flowable.concat(`/core-api/tasks/${taskId}/complete`),
      host.flowable.concat(`/taskListing/tasks/${taskId}/complete`),
    coreApiTaskSaveAndCompleteLater: (taskId) =>
      host.flowable.concat(`/core-api/tasks/${taskId}/save-form`),
    local: (args) =>
      args?.path
        ? host.json
            .concat('/')
            .concat(`${args.path}/`)
            .concat(`${args.fileName}.json`)
        : host.json.concat('/').concat(`${args.fileName}.json`),
    historicalTaskInstances: host.flowable.concat(
      `/cmmn-api/cmmn-query/historic-task-instances`
    ),
    historicalTaskInstancesById: (id) =>
      host.flowable.concat(
        `/process-api/history/historic-task-instances/${id}`
        // `/cmmn-api/cmmn-query/historic-task-instances/${id}`
      ),
    getExecutionsByBusinessKey: host.flowable.concat(
      `/process-api/query/executions`
    ),
    getExecutionsByProcessInstanceId: (
      tenantId,
      activityId,
      eventName,
      processInstanceId
    ) =>
      host.flowable.concat(
        `/process-api/runtime/event-subscriptions?tenantId=${tenantId}&activityId=${activityId}&eventName=${eventName}&processInstanceId=${processInstanceId}`
      ),
    triggerEventByExecutionId: (executionId) =>
      host.flowable.concat(`/process-api/runtime/executions/${executionId}`),
    processVariables: (processInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances/${processInstanceId}/variables`
      ),
    subProcessVariable: (processInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances?subProcessInstanceId=${processInstanceId}`
      ),
    propertyCaseInstanceVariables: (caseInstanceId) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-runtime/case-instances/${caseInstanceId}/variables`
      ),
    processInstanceDiagram: (id) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances/${id}/diagram`
      ),
    processDefinitionByTenantCode: (tenantCode) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?latest=true&size=100&sort=key&tenantId=${tenantCode}`
      ),
    getFormByCaseId: (caseId) =>
      host.flowable.concat(`/core-api/case-definitions/${caseId}/start-form`),
    getTaskVariables: (id) =>
      host.flowable.concat(`/core-api/tasks/${id}/variables`),
    saveTaskVariables: (id) =>
      host.flowable.concat(`/process-api/runtime/tasks/${id}/variables`),
    reAssignTask: (id) =>
      host.flowable.concat(`/process-api/runtime/tasks/${id}`),
    updateTaskVariable: (id, variable) =>
      host.flowable.concat(
        `/process-api/runtime/tasks/${id}/variables/${variable}`
      ),
    planItemInstances: {
      get: (caseInstanceId, state, planItemDefinitionType) =>
        host.flowable.concat(
          `/cmmn-api/cmmn-runtime/plan-item-instances?caseInstanceId=${caseInstanceId}&state=${state}&planItemDefinitionType=${planItemDefinitionType}&size=10000`
        ),
      put: (planItemInstancesId) =>
        host.flowable.concat(
          `/cmmn-api/cmmn-runtime/plan-item-instances/${planItemInstancesId}`
        )
    },
    pauseTask: (taskId, propertyId) =>
      host.property.concat(`/tm/pause/task/${taskId}/property/${propertyId}`),
    unPauseTask: (taskId, propertyId) =>
      host.property.concat(`/tm/unpause/task/${taskId}/property/${propertyId}`),
    pauseUnpause: (taskId) =>
      host.property.concat(`/tm/pause-unpause/task/${taskId}`),
    deleteById: (caseInstanceId) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-runtime/case-instances/${caseInstanceId}`
      ),
    updateFlowableRolesObjects: (caseInstanceId) =>
      host.flowable.concat(
        `/taskassignment/updateFlowableRolesObject/${caseInstanceId}`
      )
  }
};

export const apiTesting = {
  api: host.rest.concat('/api/integration')
};

export const exploreTour = {
  s3Url: '/eq-files/file/filepath/T1fOpXY8oIFQT5VYYOgf0t5G113IejGkhDW9OaFow2E='
};

export const changeLog = {
  api: {
    getFieldLevelData: host.changelog.concat('/property/field-level')
  }
};

export const apiServices = {
  api: {
    get: (page, pageSize) =>
      host.apiServices.concat(
        `/services?page=${page}&size=${pageSize}&sort=serviceId,DESC`
      ),
    insert: host.apiServices.concat('/services'),
    delByID: (id) => host.apiServices.concat(`/services/${id}`),
    getByID: (id) => host.apiServices.concat(`/services/${id}`),
    update: (id) => host.apiServices.concat(`/services/${id}`),
    operations: (serviceId) =>
      host.apiServices.concat(`/services/${serviceId}/operations`),
    operationById: (operationId) =>
      host.apiServices.concat(`/operations/${operationId}`),
    insertOperation: host.apiServices.concat(`/operations`),
    updateOperation: (operationId) =>
      host.apiServices.concat(`/operations/${operationId}`),
    getMappingByOperationId: (operationId) =>
      host.apiServices.concat(
        `/operations/${operationId}/operationRouteMappings`
      ),
    insertMapping: host.apiServices.concat('/operationRouteMappings'),
    getMapping: (size) =>
      host.apiServices.concat(`/operationRouteMappings?size=${size}`),
    updateMapping: (mappingId) =>
      host.apiServices.concat(`/operationRouteMappings/${mappingId}`),
    deleteMapping: (mappingId) =>
      host.apiServices.concat(`/operationRouteMappings/${mappingId}`),
    updateOperationDetails: (operationId) =>
      host.apiServices.concat(`/operations/${operationId}`),
    updateTemplate: (operationId) =>
      host.apiServices.concat(`/operations/${operationId}`),
    delByOperation: (operationId) =>
      host.apiServices.concat(`/operations/${operationId}`),
    getTemplateForm: host.json.concat(`/IntegrationTemplates.json`),
    getServiceUploadForm: host.json.concat(
      `/IntegrationServiceUploadForm.json`
    ),
    mappingPublish: (mappingType) =>
      host.apiServicesPublish.concat(`/route/operation/${mappingType}`),
    downloadService: (id) => host.apiServices.concat(`/exportService/${id}`),
    uploadService: host.apiServices.concat('/importService'),
  }
};

export const PropertyApiConfig = {
  api: {
    header_form_def: host.json.concat('/property_header_form_def.json'),
    add_form_def: host.json.concat('/property_add_form_def.json'),
    update_form_def: host.json.concat('/property_update_form_def.json'),
    get_process_by_case: (tenantId, key) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-repository/case-definitions?key=${key}&latest=true&tenantId=${tenantId}`
      ),
    get_process_def: (tenantId, key) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?key=${key}&latest=true&tenantId=${tenantId}`
      ),
    get_form_def_by_case: (processDefinitionId) =>
      host.flowable.concat(
        `/core-api/case-definitions/${processDefinitionId}/start-form`
      ),
    get_form_def_by_process: (processDefinitionId) =>
      host.flowable.concat(
        `/core-api/process-definitions/${processDefinitionId}/start-form`
      ),
    get_case_def: (tenantId, key) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-repository/case-definitions?key=${key}&latest=true&tenantId=${tenantId}`
      ),
    add: host.monarch.concat('/aggregator'),
    update: host.monarch.concat('/aggregator'),
    get: (tenantId) =>
      host.monarch.concat(`/aggregator?tempTenantCode=${tenantId}`),
    add_to_workflow: host.flowable.concat(
      `/cmmn-api/cmmn-runtime/case-instances`
    ),
    update_in_workflow: (propertyId) =>
      host.properties.concat(`/${propertyId}`),
    decision_listing_form_def: host.json.concat(
      '/decision_listing_form_def.json'
    ),
    get_decisions: (instanceId) =>
      host.flowable.concat(
        `/dmn-api/dmn-history/historic-decision-executions/?instanceId=${instanceId}`
      ),
    get_decisions_with_children: (caseInstanceIdWithChildren) =>
      host.flowable.concat(
        `/dmn-api/dmn-history/historic-decision-executions/?caseInstanceIdWithChildren=${caseInstanceIdWithChildren}`
      ),
    get_guidances: (caseInstanceId) =>
      host.flowable.concat(
        `/dmn-api/dmn-history/historic-decision-executions/${caseInstanceId}/auditdata`
      ),
    get_statuses: (caseInstanceId) =>
      host.flowable.concat(
        `/dmn-api/dmn-repository/decision-tables/${caseInstanceId}/model`
      ),
    property_list: host.userMetadata.concat('/property/propertyList'),

    get_stage_overview: (caseInstanceId) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-runtime/case-instances/${caseInstanceId}/stage-overview`
      ),
    getAll: host.userMetadata.concat('/property/propertyList'),
    property_listing_filter: host.propertyFilter.concat(
      '/propertyListingFilters'
    ),
    property_listing_filter_delete: (propertyListId) =>
      host.propertyFilter.concat(`/propertyListingFilters/${propertyListId}`),
    get_all_process_instances: (propertyId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances?businessKey=${propertyId}&sort=processDefinitionKey`
      )
  },
  headers: {
    authorization: 'Basic YWRtaW46dGVzdA==',
    caseDefinitionKey: `aSPSLoanManagement`,
    propertyApiUrl: `http://localhost:8180/properties`
  },
  keys: {
    add_form: 'aSPSLoanManagement',
    update_form: 'propertyEdit',
    header_form: 'propertyHeader'
  }
};

export const TaskApiConfig = {
  api: {
    listing_open_form_def: host.json.concat('/task_listing_open_form_def.json'),
    listing_close_form_def: host.json.concat(
      '/task_listing_completed_form_def.json'
    ),
    listing_open: host.flowable.concat(`/cmmn-api/cmmn-query/tasks`),
    listing_close: host.flowable.concat(
      `/cmmn-api/cmmn-query/historic-task-instances`
    ),
    // TODO: NEED TO FIX proxy pass to be same in both server and local dev
    task_open_form_def: (taskInstanceId) => {
      return host.isDevEnv()
        ? host.flowable.concat(`/core-api/tasks/${taskInstanceId}/form`)
        : host.flowable.concat(
            `/extensions-runtime/tasks/${taskInstanceId}/form`
          );
    },
    task_close_form_def: (taskInstanceId) => {
      return host.isDevEnv()
        ? host.flowable.concat(`/core-api/tasks/${taskInstanceId}/form`)
        : host.flowable.concat(
            `/extensions-runtime/tasks/${taskInstanceId}/form`
          );
    },
    get_form_value: (taskInstanceId) => {
      return host.isDevEnv()
        ? host.flowable.concat(`/core-api/tasks/${taskInstanceId}/variables`)
        : host.flowable.concat(
            `/extensions-runtime/tasks/${taskInstanceId}/variables`
          );
    },
    get_instance_diagram: host.flowable.concat(
      `/cmmn-api/cmmn-query/case-instances`
    ),
    get_instance_diagram_url: (caseInstanceId) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-runtime/case-instances/${caseInstanceId}/diagram`
      ),
    get_task_open_instance_diagram: (taskInstanceId) =>
      host.flowable.concat(`/process-api/runtime/tasks/${taskInstanceId}`),
    get_task_close_instance_diagram: (taskInstanceId) =>
      host.flowable.concat(
        `/process-api/history/historic-task-instances/${taskInstanceId}`
      ),
    get_instance_diagram_image_url: (taskProcessInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances/${taskProcessInstanceId}/diagram`
      ),
    get_parent_instance_diagram: (taskProcessInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances?subProcessInstanceId=${taskProcessInstanceId}`
      ),
    get_parent_instance_diagram_image_url: (taskProcessInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances/${taskProcessInstanceId}/diagram`
      ),
    update: (taskInstanceId) =>
      host.flowable.concat(`/process-api/runtime/tasks/${taskInstanceId}`),
    get_root_parent_instance: (processInstanceId) =>
      host.flowable.concat(
        `/platform-api/entity-links/${processInstanceId}/bpmn/root-parent`
      ),
    get_propertyid_by_process_instanceid: (processInstanceId) =>
      host.flowable.concat(
        `/process-api/runtime/process-instances/${processInstanceId}`
      ),
    get_caseinstanceid_by_propertyid: (propertyId) =>
      host.propertyXref.concat(
        `/propertyLoanCaseXrefs/search/findFirstByPropertyId?propertyId=${propertyId}`
      ),
    get_propertyid_by_caseinstanceid: (caseInstanceId) =>
      host.propertyXref.concat(
        `/propertyLoanCaseXrefs/search/findFirstByCaseInstanceId?caseInstanceId=${caseInstanceId}`
      ),
    get_partyId_by_propertyid: (propertyId) =>
      host.propertyXref.concat(
        `/propertyPartyRoleLoanXrefs/search/findFirstByCaseInstanceId?propertyId=${propertyId}`
      ),
    addMarketingId: (marketingId) =>
      host.reo.concat(`/marketingPlans/${marketingId}`),
    updateEqOrders: (eqOrdersId) => host.reo.concat(`/eqOrders/${eqOrdersId}`),
    updatePropertyReos: (propertyReosId) =>
      host.reo.concat(`/propertyReos/${propertyReosId}`),
    updatePropertyListingAuctionSale: (propertyListingAuctionSaleDetailId) =>
      host.reo.concat(
        `/propertyListingAuctionSaleDetails/${propertyListingAuctionSaleDetailId}`
      ),
    getPropertyReoId: (propertyId) =>
      host.reo.concat(
        `/propertyReos/search/findAllByPropertyId?propertyId=${propertyId}`
      ),
    getPropertyListingAuctionSale: (propertyId) =>
      host.reo.concat(
        `/propertyListingAuctionSaleDetails/search/findAllByPropertyId?propertyId=${propertyId}`
      ),
    getRolePartyDtos: (partyRoleType) =>
      host.party.concat(
        `/parties/search/findAllpartyRoleTypes?partyRoleType=${partyRoleType}`
      ),
    getEqOrderId: (propertyId) =>
      host.reo.concat(
        `/eqOrders/search/findAllByPropertyId?propertyId=${propertyId}`
      ),
    getMarketingPlanId: (propertyId) =>
      host.reo.concat(
        `/marketingPlans/search/findAllByPropertyId?propertyId=${propertyId}`
      ),
    create_metadata: host.property.concat(`/taskMetadatas`),
    delete_metadata: (taskId) =>
      host.property.concat(`/taskMetadatas/${taskId}`)
  },
  headers: {
    authorization: 'Basic YWRtaW46dGVzdA=='
  }
};

export const forgerock = {
  api: {
    profile: host.forgerock.concat(`/json/sessions?_action=getSessionInfo`),
    login: host.forgerock.concat(
      `/json/realms/root/realms/eqmonarch-dev/authenticate`
    ),
    PostLogoutUrl: (realm, domain, protocol) => {
      const result = protocol + '//' + domain;
      return host.isDevEnv()
        ? '/login'
        : host.forgerock.concat(`/?realm=${realm}&goto=${result}`);
    },
    resource: (realm) =>
      host.forgerock.concat(
        `/json/realms/root/realms${realm}/policies?_action=evaluate`
      ),
    updateUser: host.core.concat(`/fam/vendorAgent/user`),
    logout: host.forgerock.concat('/json/realms/root/sessions/?_action=logout'),
    dataStudioAuth: host.eqUi.concat('/api/session'),
    resetPasswordAPI: (realm) =>
      host.forgerock.concat(`/XUI/?realm=${realm}#profile/password`),
    resetSecurityQaApi: (realm) =>
      host.forgerock.concat(`/XUI/?realm=${realm}#profile/password`),
    getVenndorAgentAddress: (realm, userId) =>
      host.forgerock.concat(`/json/realms/root/realms${realm}/users/${userId}`)
  },
  cookie: {
    jwtToken: 'am-auth-jwt',
    iPlanetDirectoryPro: 'iPlanetDirectoryPro',
    displayName: 'name',
    userName: 'username',
    userEmail: 'email',
    tenantId: 'tenantId',
    tenantCode: 'tenantCode',
    userType: 'userType',
    firstname: 'firstname',
    lastname: 'lastname',
    vendorid: 'vendorid',
    selectedTenant: 'selectedTenant'
  },
  headers: {
    acceptAPIVersion: `resource=2.0, protocol=1.0`
  }
};

export const TenantApiConfig = {
  api: {
    upload_file: host.core.concat('/fam/resource/bulk'),
    download_file: host.core.concat('/fam/resources/download'),
    add_role_group: host.core.concat('/fam/user/associate/groups/roles'),
    resource_sink: host.core.concat('/fam/sink/resources'),
    tenant_add_form_def: host.json.concat('/tenant_add_form_def.json'),
    user_listing_form_def: host.json.concat('/user_listing_form_def.json'),
    group_listing_form_def: host.json.concat('/group_listing_form_def.json'),
    resource_listing_form_def: host.json.concat(
      '/resource_listing_form_def.json'
    ),
    tenant_header_form_def: host.json.concat('/tenant_header_form_def.json'),
    role_listing_form_def: host.json.concat('/role_listing_form_def.json'),
    role_add_form_def: host.json.concat('/role_add_form_def.json'),
    user_add_form_def: host.json.concat('/user_add_form_def.json'),
    group_add_form_def: host.json.concat('/group_add_form_def.json'),
    resource_add_form_def: host.json.concat('/resource_add_form_def.json'),
    header_form_def: host.json.concat('/property_header_form_def.json'),
    tenant_list_form_def: host.json.concat('/tenant_listing_form_def.json'),
    // get_process_def: (tenantId, key) =>
    //   host.flowable.concat(
    //     `/cmmn-api/cmmn-repository/case-definitions?key=${key}&latest=true&tenantId=ASPS`
    //   ),
    get_form_def: (processDefinitionId) =>
      host.flowable.concat(
        `/core-api/case-definitions/${processDefinitionId}/start-form`
      ),
    getCaseQueryUrl: host.flowable.concat(
      `/cmmn-api/cmmn-query/case-instances`
    ),
    // get_form_def: (processDefinitionId) => host.flowable.concat(`/core-api/extensions-runtime/case-definitions/${processDefinitionId}/start-form`),
    get_case_def: (tenantId, key) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-repository/case-definitions?key=${key}&latest=true&tenantId=ASPS`
      ),
    get_process_def: (tenantId, key) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?key=${key}&latest=true&tenantId=ASPS`
      ),
    add_resource: host.flowableFAMCore.concat(`/fam/v2/resource`),
    view_resource: (resourceId) =>
      host.flowableFAMCore.concat(`/fam/resource/${resourceId}`),
    add_user: host.flowableFAMCore.concat(`/fam/user`),
    add_role: host.flowableFAMCore.concat(`/fam/v2/role`),
    view_role: (name) => host.flowableFAMCore.concat(`/fam/role/${name}`),
    view_user: (id) => host.flowableFAMCore.concat(`/fam/user/${id}`),
    add_group: (name) => host.flowableFAMCore.concat(`/fam/groups/${name}`),
    view_group: (name) => host.flowableFAMCore.concat(`/fam/groups/${name}`),
    edit_user: (firstName) =>
      host.flowableFAMCore.concat(`/fam/user/${firstName}`),
    edit_resource: (resourceId) =>
      host.flowableFAMCore.concat(`/fam/resource/${resourceId}`),
    edit_group: (name) => host.flowableFAMCore.concat(`/fam/groups/${name}`),
    edit_role: (name) => host.flowableFAMCore.concat(`/fam/v2/role/${name}`),
    delete_user: (firstName) =>
      host.flowableFAMCore.concat(`/fam/user/${firstName}`),
    delete_group: (name) => host.flowableFAMCore.concat(`/fam/groups/${name}`),
    delete_resource: (resourceId) =>
      host.flowableFAMCore.concat(`/fam/resource/${resourceId}`),
    update: host.monarch.concat('/aggregator'),
    delete_role: (name) => host.flowableFAMCore.concat(`/fam/v2/role/${name}`),
    get: (propertyId) =>
      host.properties.concat(`/search/findByEqWfCaseRuntimeId?${propertyId}`),
    add_to_workflow: host.flowable.concat(
      `/cmmn-api/cmmn-runtime/case-instances`
    ),
    update_to_workflow: host.flowable.concat(
      `/process-api/runtime/process-instances`
    ),
    update_in_workflow: (propertyId) =>
      host.properties.concat(`/${propertyId}`),
    privilege_url: '/eq-api/core/fam/resource',
    groupUrl: '/eq-api/core/fam/groups',
    get_users: '/eq-api/core/ldap/users/v2',
    getUsers: '/eq-api/core/ldap/users',
    add: '/eq-api/tenants',
    get_tenant: host.monarch.concat('/aggregator'),
    tenant_list: host.monarch.concat('/aggregator'),
    external_urls: host.json.concat('/dashboard/external_urls.json'),
    get_role_list: (
      tempTenantCode,
      page = 0,
      size = 10000,
      sortColumn = '',
      sortOrder = ''
    ) =>
      host.flowableFAMCore.concat(
        `/fam/v2/roles?tempTenantCode=${tempTenantCode}&page=${page}&size=${size}&sort=${sortColumn},${sortOrder}`
      ),
    get_resource_list: (
      tempTenantCode,
      page = 0,
      size = 10000,
      sortColumn = '',
      sortOrder = ''
    ) =>
      host.flowableFAMCore.concat(
        `/fam/v2/resource?page=${page}&size=${size}&sort=${sortColumn},${sortOrder}`
      ),
    add_data_mask: (id) =>
      host.dataMask.concat(`/eqDataMaskingMetadatas/${id}`),
    resetPassword: (realm) =>
      host.forgerock.concat(
        `/json/realms/root/realms/${realm}/selfservice/forgottenPassword?_action=submitRequirements`
      ),
    updateRoles: (partyRoleType) =>
      host.party.concat(`/parties/roles/updateRoles/${partyRoleType}`),
    deleteRoles: (roleId) => host.party.concat(`/partyRoleTypes/${roleId}`),
    getRolePartyDtos: (partyRoleType) =>
      host.party.concat(
        `/parties/getRolePartyDtos?partyRoleType=${partyRoleType}`
      ),
    partyRoleTypes: (size) => host.party.concat(`/partyRoleTypes?sort=partyRoleType&size=${size}`)
  },
  headers: {
    authorization: 'Basic YWRtaW46dGVzdA==',
    caseDefinitionKey: `tenantManagement`,
    propertyApiUrl: `http://localhost:8180/properties`,
    acceptAPIVersion: `resource=1.0, protocol=1.0`
  }
};

export const FileApiConfig = {
  api: {
    get: (fileId) => host.file.concat(`/filepath/${fileId}`)
  }
};

export const PropertyDocumentApiConfig = {
  api: {
    document_form_def: host.json.concat(
      '/property_document_list_form_def.json'
    ),
    upload_document_form: host.json.concat('/PropertyDocumentUploadForm.json'),
    preview_document_form: host.json.concat(
      '/PropertyDocumentPreviewForm.json'
    ),
    previewFile: (fileCatType, propertyId) =>
      fileCatType
        ? host.fileDetail.concat(
            `/search/findAllByFileCategoryTypeAndPropLoanId?fileCategoryType=${fileCatType}&propLoanId=${propertyId}`
          )
        : host.fileDetail.concat(
            `/search/findAllByPropLoanId?propLoanId=${propertyId}`
          ),
    getDocumentsList: (propertyId) =>
      host.fileDetail.concat(
        `/search/findAllByPropLoanId?propLoanId=${propertyId}`
      ),
    upload: host.file,
    delete: host.file
  },
  headers: {
    authorization: 'Basic YWRtaW46dGVzdA=='
  }
};

export const PropertyStrategyApiConfig = {
  api: {
    cwcotApiConfig: {
      add: host.cwcot.concat(`/propertyProjections/cwcot`),
      update: (id) => host.cwcot.concat(`/propertyProjections/cwcot/${id}`),
      getProjectionList: (propertyId) =>
        host.cwcot.concat(
          `/propertyProjections/search/findByOrderByPropertyIdDesc?propertyId=${propertyId}`
        ),
      get: (propertyId, projectionId, flag) =>
        flag === 'history'
          ? host.cwcot.concat(`/propertyProjections/cwcot/${projectionId}`)
          : host.cwcot.concat(
              `/propertyProjections/cwcot/property/${propertyId}`
            )
    },
    savingForm: host.json.concat(
      '/property-strategy/PropertyStrategySavings.json'
    ),
    claimForm: host.json.concat(
      '/property-strategy/PropertyStrategyClaims.json'
    ),
    actualForm: host.json.concat(
      '/property-strategy/PropertyStrategyActuals.json'
    ),
    conveyanceForm: host.json.concat(
      '/property-strategy/PropertyStrategyConveyance.json'
    ),
    reoAsIsForm: host.json.concat(
      '/property-strategy/PropertyStrategyREOAsIs.json'
    ),
    reoRepairForm: host.json.concat(
      '/property-strategy/PropertyStrategyREORepair.json'
    ),
    cwcotForm: host.json.concat(
      '/property-strategy/PropertyStrategyCWCOT.json'
    ),
    baselineForm: host.json.concat(
      '/property-strategy/PropertyStrategyBaselineForm.json'
    )
  }
};

export const ldap = {
  api: {
    users: host.ldap.concat(`/users`)
  },
  headers: {
    tenantCode: 'ASPS'
  }
};

export const fileUpload = {
  api: {
    upload: host.fileUpload,
    uploadV2: host.fileUploadV2
  }
};

export const mail = {
  api: {
    //insert: host.monarch.concat('/aggregator'),
    insert: host.message.concat('/messages/sendmail'),
    get: host.userMetadata.concat('/message/messagelist'),
    getById: host.monarch.concat('/aggregator'),
    update: host.monarch.concat('/aggregator'),
    getByIsRead: host.userMetadata.concat('/message/messagelist'),
    search: host.userMetadata.concat('/message/search')
  }
};

export const PropertyMilestoneApiConfig = {
  api: {
    get_property_milestone: (propertyId, loanNumber) =>
      host.milestone.concat(
        `/search/findAllByPropertyIdAndLoanNumberOrderByCreatedDateDesc?propertyId=${propertyId}&loanNumber=${loanNumber}`
      ),
    get_property_milestone_flowable_data: (tenantCode) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?latest=true&size=100&sort=key&tenantId=${tenantCode}`
      )
  }
};

export const RoleAssignApiConfig = {
  api: {
    assigned_roles_form: host.json.concat('/assigned_role_list_form_def.json'),
    get_roles: host.flowableFAMCore.concat(`/fam/groups`),
    get_users_group: host.flowableFAMCore.concat('/fam/users/group'),
    getUserGroupById: (id) =>
      host.flowableFAMCore.concat(`/fam/groups/user/${id}`),
    getUserGroupByPartyId: (id) => host.party.concat(`/parties/${id}/roles`),
    getPartyIdByUserId: (id) =>
      host.party.concat(`/parties/search/findPartyBasedOnUserId?userId=${id}`),
    add: host.monarch.concat('/aggregator'),
    update: (propertyId) =>
      host.propertyXref.concat(
        `/xr/updatePropertyPartyRoleLoanXref/${propertyId}`
      ),
    get: host.propertyXref.concat(`/xr/bulkFetchUsingPropertyId`),
    get_user_role_group: host.party.concat(
      `/parties/getRolePartyDtos?partyRoleType`
    )
  }
};

export const TaskManagementApiConfig = {
  api: {
    get_boards: host.json.concat('/tasks/boards.json')
  }
};

export const DecisionRuleApiConfig = {
  api: {
    fetchRuleGroups: (decisionTableId) =>
      host.flowable.concat(
        `/dmn-api/dmn-repository/decision-tables/${decisionTableId}/model`
      ),
    fetchDecisionTabble: (tenantId, key) =>
      host.flowable.concat(
        `/dmn-api/dmn-repository/decision-tables?latest=true&tenantId=${tenantId}&keyLike=${key}`
      ),
    fetchDecisionTabbleInXml: (decisionTableId) =>
      host.flowable.concat(
        `/dmn-api/dmn-repository/decision-tables/${decisionTableId}/resourcedata`
      ),
    deployDecisionTable: (tenantId) =>
      host.flowable.concat(`/dmn-api/dmn-repository/deployments?tenantId=ASPS`),
    getInvestorGroup: host.adminServices.concat(`/investorGroups`),
    rule_management_search_header_def: host.json.concat(
      '/rule_management_search_header_def.json'
    )
  }
};

export const party = {
  api: {
    party: {
      getPartyIdByUserId: (userId, tenantCode) =>
        host.party.concat(
          `/parties/search/findPartyBasedOnUserId?userId=${userId}&tempTenantCode=${tenantCode}`
        ),
      getAllPartiesWithUserIds: host.party.concat(
        `/parties/search/getAllPartiesWithUserIds`
      )
    },
    agentProfile: {
      getBrokerInformation: (partyId, tenantCode) =>
        host.party.concat(`/agents/${partyId}/broker`)
    },
    vendorProfile: {
      getPrtyIdByUserId: (userId, tenantCode) =>
        host.party.concat(
          `/parties/search/findPartyBasedOnUserId?userId=${userId}&tempTenantCode=${tenantCode}`
        ),
      getByPartyId: (partyId, tenantCode) =>
        host.party.concat(`/parties/pc/${partyId}?tempTenantCode=${tenantCode}`)
    },
    insert: (tenantCode) =>
      host.party.concat(`/parties?tempTenantCode=${tenantCode}`),
    getById: (partyId, tenantCode) =>
      host.party.concat(`/parties/${partyId}?tempTenantCode=${tenantCode}`),
    license: {
      insert: (tenantCode) =>
        host.party.concat(`/licenses?tempTenantCode=${tenantCode}`),
      update: (tenantCode, id) =>
        host.party.concat(`/licenses/${id}?tempTenantCode=${tenantCode}`)
    },
    vendor: {
      insert: (tenantCode) =>
        host.party.concat(`/eqvmVendors?tempTenantCode=${tenantCode}`),
      getById: (vendorId, tenantCode) =>
        host.party.concat(
          `/eqvmVendors/${vendorId}?tempTenantCode=${tenantCode}`
        )
    },
    role: {
      getById: (roleId, tenantCode) =>
        host.party.concat(`/roles/${roleId}?tempTenantCode=${tenantCode}`),
      insert: (tenantCode) =>
        host.party.concat(`/roles?tempTenantCode=${tenantCode}`),
      get: (tenantCode) =>
        host.party.concat(`/roles?tempTenantCode=${tenantCode}`),
      getUserGroupByPartyId: (partyId) =>
        host.party.concat(`/parties/${partyId}/roles`)
    },
    productCategory: {
      getById: (productCategoryId) =>
        host.party.concat(`/eqvmProductCategories/${productCategoryId}`)
    },
    product: {
      getById: (productId, tenantCode) =>
        host.party.concat(
          `/eqvmProducts/${productId}?tempTenantCode=${tenantCode}`
        ),
      getCategoryByProductId: (productId, tenantCode) =>
        host.party.concat(
          `/eqvmProducts/${productId}/eqvmProductCategory?tempTenantCode=${tenantCode}`
        ),
      getByIdAndVendorProduct: (productId, tenantCode) =>
        host.party.concat(
          `/eqvmProducts/${productId}/eqvmVendorProducts?tempTenantCode=${tenantCode}`
        )
    },
    productSubscription: {
      insert: (tenantCode) =>
        host.party.concat(
          `/eqvmVendorProductSubscriptions?tempTenantCode=${tenantCode}`
        ),
      update: (tenantCode, id) =>
        host.party.concat(
          `/eqvmVendorProducts/vp/approveVendorProduct/${id}?tempTenantCode=${tenantCode}`
        )
    },
    vendorServiceArea: {
      insert: (tenantCode) =>
        host.party.concat(
          `/eqvmVendorServiceAreas?tempTenantCode=${tenantCode}`
        )
    },
    vendorProduct: {
      getById: (vendorProductId, tenantCode) =>
        host.party.concat(
          `/eqvmVendorProducts/${vendorProductId}?tempTenantCode=${tenantCode}`
        ),
      insert: (tenantCode) =>
        host.party.concat(`/eqvmVendorProducts?tempTenantCode=${tenantCode}`)
    },
    Agent: {
      insert: (tenantCode) =>
        host.party.concat(`/eqvmVendors?tempTenantCode=${tenantCode}`)
    },
    TenantVendorProducts: {
      insert: host.party.concat(`/eqvmVendorProducts`)
    },
    TenantVendorSubscription: {
      insert: host.party.concat(`/eqvmVendorProductSubscriptions`)
    },
    investor: {
      unassignedInvestor: host.party.concat(
        `/investors/search/findInvestorsWithoutInvestorGroup`
      ),
      findInvestorByInvestorGroup: (investorGroup) =>
        host.party.concat(
          `/investors/search/findByInvestorGroup?investorGroup=${investorGroup}`
        ),
      bulkUpdate: host.party.concat(`/parties/investors/updategroup`)
    },
    bulk: {
      fetchById: host.party.concat(`/parties/bulkfetch`)
    }
  }
};

export const OfferApiConfig = {
  api: {
    offer_listing: host.offerMetadata.concat('/offer/offerList'),
    offer_listing_form_def: host.json.concat(
      '/offer/offer_listing_form_def.json'
    ),
    property_offer_listing_form_def: host.json.concat(
      '/offer/property_offer_listing_form_def.json'
    ),
    offer_edit_form_def: host.json.concat('/offer/edit_offer_form_def_.json'),
    offer_status: host.json.concat('/offer/offer_status.json'),
    get_property_offer_list: host.json.concat(
      '/offer/property_offer_list.json'
    ),
    get_offer_details: host.json.concat('/offer/offer_details.json'),
    get_property_offer_list_with_versions: host.json.concat(
      '/offer/property_offer_list_with_versions.json'
    ),
    get_offer_contacts: host.json.concat('/offer/offer_contcats.json'),
    property_offer_listing: host.offerMetadata.concat(
      '/offer-by-property/offerList'
    ),
    get_offers_by_propertyId: host.oms.concat('/reoOffers/bulkFetch/pid'),
    get_offer_xref_by_propertyId: (propertyId) =>
      host.propertyXref.concat(
        `/propertyPartyRoleLoanXrefs/search/findAllByPropertyId?propertyId=${propertyId}`
      ),
    get_offer_count: (loanNumer) =>
      host.offerMetadata.concat(
        `/offer/offerList?searchText=${loanNumer}&state=&portfolio=&division=&offerStatus=&from=0&size=20&sortOrder=DESC&sortFieldName=CREATED_DATE`
      )
  },
  headers: {},
  keys: {
    edit_offer: 'oMSOfferEditASPSREOProcess',
    offer_lising_with_versions: 'offerActionASPSREOProcess',
    signal: 'signal',
    signalName: 'offerActionType',
    omsProcessDefinitionKey: 'complete3rdPartySaleASPSREOProcess',
    activityId: 'omsStartSignalEvent',
    eventName: 'offerActionType'
  }
};

export const TenantAdminConfig = {
  api: {
    updateTaskConfigurations: (taskId) =>
      host.adminServices.concat(`/taskConfigurations/${taskId}`),
    legal_entity_listing_def: host.json.concat(
      '/tenant-admin/legal_entity_list.json'
    ),
    user_load_balance_listing_def: host.json.concat(
      '/tenant-admin/user_load_balance_listing.json'
    ),
    state_role_assignment_listing_def: host.json.concat(
      '/tenant-admin/state_role_assignment_listing.json'
    ),
    legalEntity: host.adminServices.concat('/legalEntities'),
    legalEntityById: (id) => host.adminServices.concat(`/legalEntities/${id}`),
    listingTypeApi: host.adminServices.concat('/listingTypes'),
    listingTypeApiById: (id) =>
      host.adminServices.concat(`/listingTypes/${id}`),
    getAllDefaultGlobalRoles: host.party.concat(
      `/roles/search/getAllDefaultGlobalRoles`
    ),
    findAllGlobalRoles: host.party.concat(
      `/partyRoleTypes/search/findAllGlobalRoles`
    ),
    getParties: (partyId) => host.party.concat(`/parties/${partyId}`),
    findPartyBasedOnPartyIds: (partyIds) =>
      host.party.concat(
        `/parties/search/findPartyBasedOnPartyIds?partyIds=${partyIds}`
      ),
    findAllByPartyRoleType: (partyRoleType) =>
      host.party.concat(
        `/roles/search/findAllByPartyRoleType?partyRoleType=${partyRoleType}`
      ),
    updateRoleIndicator: host.party.concat('/parties/updateRoleIndicator'),
    stateRoleAssignmentMatrixes: host.adminServices.concat(
      '/matrix/stateRoleAssignmentMatrix'
    ),
    updateStateRoleAssignmentMatrixes: (matrixId) =>
      host.adminServices.concat(
        `/matrix/stateRoleAssignmentMatrix/${matrixId}`
      ),
    stateRoleAssignmentInvestorXrefs: host.adminServices.concat(
      '/stateRoleAssignmentInvestorXrefs'
    ),
    stateRoleAssignmentPartyXrefs: host.adminServices.concat(
      '/stateRoleAssignmentPartyXrefs'
    ),
    stateRoleAssignmentStateXrefs: host.adminServices.concat(
      '/stateRoleAssignmentStateXrefs'
    ),
    findAllPartyRoleChildByPartyRoleType: (partyRoleType) =>
      host.party.concat(
        `/partyRoleTypeChildren/search/findAllPartyRoleChildByPartyRoleType?partyRoleType=${partyRoleType}`
      ),
    findAllpartyRoleTypes: (partyRoleType) =>
      host.party.concat(
        `/parties/search/findAllpartyRoleTypes?partyRoleType=${partyRoleType}`
      ),
    findAllpartyRoleTypesWithUserId: (partyId, partyRoleType) =>
      host.party.concat(
        `/roles/search/findAllpartyRoleTypesWithUserId?partyId=${partyId}&partyRoleType=${partyRoleType}`
      ),
    addPartyRoleTeamParties: host.party.concat(
      '/parties/pc/team-role-assignment'
    ),
    findByParentRoleIdAndChildPartyRoleType: (
      childPartyRoleType,
      parentRoleId
    ) =>
      host.party.concat(
        `/partyRoleTeamParties/search/findByParentRoleIdAndChildPartyRoleType?childPartyRoleType=${childPartyRoleType}&parentRoleId=${parentRoleId}`
      ),
      updateStateEviction: (id) => 
        host.adminServices.concat(`/v1/stateOrderMatrixes/${id}`
     ),

     saveStateEviction: host.adminServices.concat(`/v1/stateOrderMatrixes`),

    deleteStateEviction: (id) =>
      host.adminServices.concat(`/stateOrderMatrixes/${id}`
    ),
  }
};

export const ManageProductVendor = {
  api: {
    addProductFormData: host.json.concat(
      '/manage-products-vendors/TenantManageProductForm.json'
    ),
    insert: host.adminServices.concat(`/availableProducts`),
    get: host.adminServices.concat(`/availableProducts?size=500`),
    delete: (productId) =>
      host.adminServices.concat(`/availableProducts/${productId}`),
    getVendorList: host.vendorApproval.concat(`/vendor/vendorList`)
  }
};

export const InvestorApiConfig = {
  api: {
    getInvestorToGroup: host.json.concat(`/Add_Investor_to_Group.json`),
    getInvestorGroupCreation: host.json.concat(`/Investor_Group_Creation.json`),
    getFormForInvestorGroupList: host.json.concat(
      `/Manage_Investor_Group_List.json`
    ),
    getFormForInvestorList: host.json.concat(`/Manage_Investor.json`),
    searchInvestorGroupOnly: (investorGroupCode) =>
      host.adminServices.concat(
        `/investorGroups/search/findAllByInvestorGroup?investorGroup=${investorGroupCode}`
      ),
    searchInvestor: host.investorGroupListing.concat(
      '/investor/investorList?size=10000'
    ),
    searchInvestorGroup: host.adminServices.concat('/investorGroups'),
    saveInvestorToGroup: host.monarch.concat(`/aggregator`),
    createInvestorGroup: host.flowable.concat(`/investor-group`),
    deleteInvestorGroupById: (id) =>
      host.adminServices.concat(`/processAdminService/investorGroup/${id}`),
    createRuleForId: (id) =>
      host.flowable.concat(`/investor-group/id/${id}/clone/rule`)
  }
};

export const AdminManagerApiConfig = {
  api: {
    getCaseQueryUrl: host.flowable.concat(
      `/cmmn-api/cmmn-query/case-instances`
    ),
    getCaseDefByCaseKey: (caseKey) =>
      host.flowable.concat(
        `/cmmn-api/cmmn-repository/case-definitions?key=${caseKey}&latest=true&tenantId=internal`
      ),
    save: host.flowable.concat(`/cmmn-api/cmmn-runtime/case-instances`),
    update: host.flowable.concat(`/process-api/runtime/process-instances`),
    getProcessDefBykey: (processKey) =>
      host.flowable.concat(
        `/process-api/repository/process-definitions?key=${processKey}&latest=true&tenantId=internal`
      )
  }
};

export const AdminServiceApiConfig = {
  api: {
    stateUS: host.adminServices.concat('/states?size=1000')
  }
};

export const EnumerationMasterApiConfig = {
  api: {
    propertyType: host.enumerationMasters.concat(
      '/enumerationMasters/search/findAllByTableNameAndFieldNameAndServiceName?serviceName=rules&tableName=add_valuations&fieldName=Property_Type_Valuation'
    ),
    tasksType: host.enumerationMasters.concat(
      '/enumerationMasters/search/findAllByTableNameAndFieldNameAndServiceName?serviceName=rules&tableName=add_valuations&fieldName=Valuation_Task'
    ),
    agentType: host.enumerationMasters.concat(
      '/enumerationMasters/search/findAllByTableNameAndFieldNameAndServiceName?serviceName=rules&tableName=add_valuations&fieldName=agent_type'
    ),
    deliverableMatrix: host.enumerationMasters.concat(
      '/enumerationMasters/search/findAllByTableNameAndFieldNameAndServiceName?serviceName=rules&tableName=state_eviction_matrix&fieldName=deliverables'
    ),
    evictionType: host.enumerationMasters.concat(
      '/enumerationMasters/search/findAllByTableNameAndFieldNameAndServiceName?serviceName=rules&tableName=state_eviction_matrix&fieldName=unit_eviction_decision_type'
    )
  }
};

export const mailMergeApiConfig = {
  api: {
    generateFile: (templateId) =>
      host.mailMerge.concat(
        `/api/v1/correspondence/deliveryprofilecode/v2/${templateId}`
      ),
    getTemplateDetails: host.json.concat('/file-utility/template_details.json')
  }
};

export const flowableControlApiConfig = {
  api: {
    login: (userName, password) =>
      host.flowableControl.concat(
        `/app/authentication?j_username=dileep.ravindran&j_password=${password}&_spring_security_remember_me=true&submit=Login`
      ),
    view_process_instance: (processInstanceId) =>
      host.flowableControl.concat(
        `/#/process-instance/${processInstanceId}?source=eqmonarch`
      ),
    login_credential: host.json.concat(`/flowable-control/user_info.json`)
  },
  headers: { content_type: 'application/x-www-form-urlencoded' },
  keys: {
    user_name: 'j_username',
    password: 'j_password',
    remember_me: '_spring_security_remember_me',
    action: 'submit'
  }
};

export const core = {
  api: {
    fam: {
      post: host.core.concat(`/fam/user`),
      actions: (id) => host.core.concat(`/fam/user/${id}`),
      registration: host.core.concat(`/fam/vendorAgent/user`)
    },
    resetPassword: host.forgerock.concat(
      '/json/realms/root/realms/lendersone/selfservice/forgottenPassword?_action=submitRequirements'
    )
  }
};

export const aggregator = {
  api: {
    action: host.monarch.concat(`/aggregator`)
  }
};

export const loan = {
  api: {
    get: (loan) =>
      host.loan.concat(`/loans/search/findAllByLoanNumber?loanNumber=${loan}`)
  }
};
