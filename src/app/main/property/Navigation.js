import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
const PropertyNavigation = (caseInstanceId) => {
  const listNavigation = {
    id: 'property',
    title: 'Property',
    type: 'group',
    icon: 'star',
    children: [
      {
        id: resourceKeys.Property_Tab_Milestone,
        title: 'Snapshot',
        type: 'item',
        url: `/property/details/${caseInstanceId}/snapshot`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Details,
        title: 'Details',
        type: 'item',
        url: `/property/details/${caseInstanceId}/details`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Task_Task_Details,
        title: 'Tasks',
        type: 'item',
        url: `/property/details/${caseInstanceId}/taskManagement`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Rules,
        title: 'Rules',
        type: 'item',
        url: `/property/details/${caseInstanceId}/decision`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Documents,
        title: 'Documents',
        type: 'item',
        url: `/property/details/${caseInstanceId}/property-document`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Roles,
        title: 'Roles',
        type: 'item',
        url: `/property/details/${caseInstanceId}/assigned-role`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Messages,
        title: 'Messages',
        type: 'item',
        url: `/property/details/${caseInstanceId}/property-mail`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Offer,
        title: 'Offers',
        type: 'item',
        url: `/property/details/${caseInstanceId}/offers`,
        visible: false,
        disabled: false
      },
      {
        id: resourceKeys.Property_Tab_Strategy,
        title: 'Default Strategy',
        type: 'item',
        url: `/property/details/${caseInstanceId}/strategy`,
        visible: false,
        disabled: false
      }
    ]
  };
  return listNavigation;
};

export default PropertyNavigation;
