const resourceConfig = {
  route: 'integration',
  conifugartion: [
    {
      pageName: 'services',
      pathName: '/integration/services',
      public: false,
      resources: [
        {
          key: 'Integration_Services_Actions_Add',
          display: 'Service Add',
          description: 'Integration_Services_Actions_Add'
        },
        {
          key: 'Integration_Services_Actions_Edit',
          display: 'Service Edit',
          description: 'Integration_Services_Actions_Edit'
        },
        {
          key: 'Integration_Services_Actions_Delete',
          display: 'Service Delete',
          description: 'Integration_Services_Actions_Delete'
        },
        {
          key: 'Integration_Services_Actions_Upload',
          display: 'Service Upload',
          description: 'Integration_Services_Actions_Upload'
        }
      ]
    },
    {
      pageName: 'service',
      pathName: '/integration/service',
      public: false,
      resources: [
        {
          key: 'Integration_Service_Operations_Actions_Add',
          display: 'Operations Add',
          description: 'Integration_Service_Operations_Actions_Add'
        },
        {
          key: 'Integration_Service_Operations_Actions_Edit',
          display: 'Operations Edit',
          description: 'Integration_Service_Operations_Actions_Edit'
        },
        {
          key: 'Integration_Service_Operations_Actions_Delete',
          display: 'Operations Delete',
          description: 'Integration_Service_Operations_Actions_Delete'
        },
        {
          key: 'Integration_Service_Operations_Input_Actions_Add',
          display: 'Operations input add',
          description: 'Integration_Service_Operations_Input_Actions_Add'
        },
        {
          key: 'Integration_Service_Operations_Input_Actions_Edit',
          display: 'Operations input edit',
          description: 'Integration_Service_Operations_Input_Actions_Edit'
        },
        {
          key: 'Integration_Service_Operations_Input_Actions_Delete',
          display: 'Operations input delete',
          description: 'Integration_Service_Operations_Input_Actions_Delete'
        },
        {
          key: 'Integration_Service_Operations_Output_Actions_Add',
          display: 'Operations output add',
          description: 'Integration_Service_Operations_Output_Actions_Add'
        },
        {
          key: 'Integration_Service_Operations_Output_Actions_Edit',
          display: 'Operations output edit',
          description: 'Integration_Service_Operations_Output_Actions_Edit'
        },
        {
          key: 'Integration_Service_Operations_Output_Actions_Delete',
          display: 'Operations output delete',
          description: 'Integration_Service_Operations_Output_Actions_Delete'
        },
        {
          key: 'Integration_Service_Operations_Mapping_Actions_Add',
          display: 'Operations mapping add',
          description: 'Integration_Service_Operations_Mapping_Actions_Add'
        },
        {
          key: 'Integration_Service_Operations_Mapping_Actions_Edit',
          display: 'Operations mapping edit',
          description: 'Integration_Service_Operations_Mapping_Actions_Edit'
        },
        {
          key: 'Integration_Service_Operations_Mapping_Actions_Delete',
          display: 'Operations mapping delete',
          description: 'Integration_Service_Operations_Mapping_Actions_Delete'
        },
        {
          key: 'Integration_Service_Operations_Mapping_Actions_Publish',
          display: 'Operations mapping publish',
          description: 'Integration_Service_Operations_Mapping_Actions_Publish'
        },
        {
          key: 'Integration_Service_Operations_Template_Actions_Upload',
          display: 'Operations template upload',
          description: 'Integration_Service_Operations_Template_Actions_Upload'
        },
        {
          key: 'Integration_Service_Operations_Template_Actions_Remove',
          display: 'Operations template remove',
          description: 'Integration_Service_Operations_Template_Actions_Remove'
        }
      ]
    }
  ]
};
export default resourceConfig;
