const Navigation = {
    children: [
      {
        id: 'resourceKeys.Task_Form_Input',
        title: `Property Details`,
        type: `item`,
        icon: ``,
        url: `property`,
        visible: true,
        disabled: false,
        key: ''
      },
      {
        id: `resourceKeys.Task_Instance_Diagram`,
        title: `Process & Tasks`,
        type: `item`,
        icon: ``,
        url: `tasks`,
        visible: true,
        disabled: true,
        key: 'instanceDiagramImageUrl'
      },
      {
        id: `resourceKeys.Task_Process_Diagram`,
        title: `Offers`,
        type: `item`,
        icon: ``,
        url: `offer`,
        visible: true,
        disabled: true,
        key: 'processDiagramImageUrl'
      }
    ]
  };
  
  export default Navigation;
  