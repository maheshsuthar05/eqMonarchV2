// import { resourceKeys } from 'app/main/property/resources/ResourceConfig';
const Navigation = {
  children: [
    {
      id: 'resourceKeys.Task_Form_Input',
      title: `Inputs`,
      type: `item`,
      icon: ``,
      url: `Claims`,
      visible: true,
      disabled: false,
      key: ''
    },
    {
      id: `resourceKeys.Task_Instance_Diagram`,
      title: `Instance Diagram`,
      type: `item`,
      icon: ``,
      url: `Close`,
      visible: true,
      disabled: false,
      key: 'instanceDiagramImageUrl'
    },
    {
      id: `resourceKeys.Task_Process_Diagram`,
      title: `Process Diagram`,
      type: `item`,
      icon: ``,
      url: `Open`,
      visible: true,
      disabled: false,
      key: 'processDiagramImageUrl'
    },
    {
      id: `resourceKeys.Task_Process_Diagram`,
      title: ``,
      type: `item`,
      icon: ``,
      url: ``,
      visible: true,
      disabled: false,
      key: 'pauseUnpause'
    }
  ]
};

export default Navigation;
