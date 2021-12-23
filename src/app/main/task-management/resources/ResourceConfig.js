const resourceConfig = {
  route: 'taskmanagement',
  conifugartion: [
    {
      pageName: 'boards',
      pathName: '/task-management/boards',
      public: false,
      resources: [
        {
          key: 'Property_Details_Tab_CompletedTask',
          display: 'Completed Task',
          description: 'Property_Details_Tab_CompletedTask'
        },
        {
          key: 'Property_Details_Tab_Details',
          display: 'Details',
          description: 'Property_Details_Tab_Details'
        },
        {
          key: 'Property_Details_Tab_Details_Save',
          display: 'Save',
          description: 'Property_Details_Tab_Details_Save'
        },

        {
          key: 'Property_Details_Tab_Opentasks',
          display: 'Open tasks',
          description: 'Property_Details_Tab_Opentasks'
        },
        {
          key: 'Property_Details_Tab_Task_Complete',
          display: 'Complete',
          description: 'Property_Details_Tab_Task_Complete'
        },
        {
          key: 'Property_Details_Tab_Task_InstanceDiagram',
          display: 'Instance Diagram',
          description: 'Property_Details_Tab_Task_InstanceDiagram'
        },
        {
          key: 'Property_Details_Tab_Task_ParentInstanceDiagram',
          display: 'Parent Instance Diagram',
          description: 'Property_Details_Tab_Task_ParentInstanceDiagram'
        },
        {
          key: 'Property_Details_Tab_Task_Rules',
          display: 'Rules',
          description: 'Property_Details_Tab_Task_Rules'
        },
        {
          key: 'Property_Details_Tab_Task_TaskDetails',
          display: 'Task Details',
          description: 'Property_Details_Tab_Task_TaskDetails'
        },
        {
          key: 'Property_Details_Tab_Claimtask',
          display: 'Claims',
          description: 'Property_Details_Tab_Claimtask'
        },
        {
          key: 'Property_Details_Widget_Task_Actions_Adhoc',
          display: 'Ad-hoc',
          description: 'Property_Details_Widget_Task_Actions_Adhoc'
        }
      ]
    }
  ]
};
export default resourceConfig;

export const resourceKeys = {
  Property_Header_Case_definition: 'Property_Details_Header_CaseDefinition',
  Property_Header_Edit: 'Property_Details_Header_Edit',
  Property_Header_Stage_Over_view: 'Property_Details_Header_StageOverview',
  Property_Tab_Completed_Tasks: 'Property_Details_Tab_CompletedTask',
  Property_Tab_Details: 'Property_Details_Tab_Details',
  Property_Tab_Details_Save: 'Property_Details_Tab_Details_Save',
  Property_Tab_Documents: 'Property_Details_Tab_Documents',
  Property_Tab_Documents_Delete: 'Property_Details_Tab_Documents_Action_Delete',
  Property_Tab_Documents_Download:
    'Property_Details_Tab_Documents_Action_Download',
  Property_Tab_Documents_Message_Files:
    'Property_Details_Tab_Documents_MessageFiles',
  Property_Tab_Documents_Order_Files:
    'Property_Details_Tab_Documents_OrderFiles',
  Property_Tab_Documents_Property_Files:
    'Property_Details_Tab_Documents_PropertyFiles',
  Property_Tab_Documents_Property_Images:
    'Property_Details_Tab_Documents_PropertyImages',
  Property_Tab_Documents_Task_Files: 'Property_Details_Tab_Documents_TaskFiles',
  Property_Tab_Documents_Upload: 'Property_Details_Tab_Documents_Upload',
  Property_Tab_Messages: 'Property_Details_Tab_Messages',
  Property_Tab_Messages_Compose: 'Property_Details_Tab_Messages_Compose',
  Property_Tab_Milestone: 'Property_Details_Tab_Milestone',
  Property_Tab_Open_tasks: 'Property_Details_Tab_Opentasks',
  Property_Tab_Claim_Task: 'Property_Details_Tab_Claimtask',
  Property_Tab_Roles: 'Property_Details_Tab_Roles',
  Property_Tab_Roles_Save: 'Property_Details_Tab_Roles_Save',
  Property_Tab_Rules: 'Property_Details_Tab_Rules',
  Property_Tab_Task_Complete: 'Property_Details_Tab_Task_Complete',
  Property_Tab_Task_Instance_Diagram:
    'Property_Details_Tab_Task_InstanceDiagram',
  Property_Tab_Task_Parent_Instance_Diagram:
    'Property_Details_Tab_Task_ParentInstanceDiagram',
  Property_Tab_Task_Rules: 'Property_Details_Tab_Task_Rules',
  Property_Tab_Task_Task_Details: 'Property_Details_Tab_Task_TaskDetails',
  Property_Details_Widget_Task_Actions_Adhoc:'Property_Details_Widget_Task_Actions_Adhoc'
};
