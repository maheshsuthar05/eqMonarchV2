import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
const Navigation = (caseInstanceId) => {
  const TaskNavigation = {
    children: [
      {
        id: resourceKeys.Property_Tab_Claim_Task,
        title: 'Claims',
        type: 'item',
        icon: '',
        url: '/property/details/<%= caseInstanceId %>/TaskManagement/Claims',
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Open_tasks,
        title: 'Open',
        type: 'item',
        icon: '',
        url: '/property/details/<%= caseInstanceId %>/TaskManagement/Open',
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Task_Complete,
        title: 'Close',
        type: 'item',
        icon: '',
        url: '/property/details/<%= caseInstanceId %>/TaskManagement/Close',
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Task_Legacy_Closed,
        title: 'Legacy Closed',
        type: 'item',
        icon: '',
        url: '/property/details/<%= caseInstanceId %>/TaskManagement/legacy',
        visible: false,
        disabled: false
      }
    ]
  };
  return TaskNavigation;
};

export default Navigation;
