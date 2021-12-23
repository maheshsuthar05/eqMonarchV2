import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
const Navigation = {
  children: [
    // {
    //   id: 'resourceKeys.Property_Tab_Task_Adhoc_Processes',
    //   title: `Ad-hoc Process`,
    //   type: `item`,
    //   icon: ``,
    //   url: `Close`,
    //   visible: true,
    //   disabled: false
    // },
    // {
    //   id: 'resourceKeys.Property_Tab_Task_TimeLine',
    //   title: `Process Heatmap`,
    //   type: `item`,
    //   icon: ``,
    //   url: `Close`,
    //   visible: true,
    //   disabled: false
    // },
    // {
    //   id: resourceKeys.Property_Tab_Claim_Task,
    //   title: `Claims`,
    //   type: `item`,
    //   icon: ``,
    //   url: `Claims`,
    //   visible: true,
    //   disabled: false
    // },
    {
      id: resourceKeys.Property_Tab_Open_tasks,
      title: `Open`,
      type: `item`,
      icon: ``,
      url: `Open`,
      visible: true,
      disabled: false
    },
    {
      id: resourceKeys.Property_Tab_Task_Complete,
      title: `Closed`,
      type: `item`,
      icon: ``,
      url: `Closed`,
      visible: true,
      disabled: false
    }
    // {
    //   id: resourceKeys.Property_Tab_Task_Legacy_Closed,
    //   title: `Legacy Closed`,
    //   type: `item`,
    //   icon: ``,
    //   url: `legacy`,
    //   visible: true,
    //   disabled: false
    // }
  ]
};

export default Navigation;
