const WidgetsData = {
  widgets: {
    openTask: {
      title: 'Open',
      data: {
        label: 'TASKS',
        count: 4,
        color: 'red',
        extra: {
          label: "Yesterday's Completed",
          count: 2
        }
      },
      detail:
        'You can show some detailed information about this widget in here.',
      url: {
        enable: true,
        url: ''
      }
    },
    closeTask: {
      title: 'Completed',
      data: {
        label: 'TASKS',
        count: 32,
        color: 'orange',
        extra: {
          label: 'Closed today',
          count: 0
        }
      },
      url: {
        enable: true,
        url: ''
      },
      detail:
        'You can show some detailed information about this widget in here.'
    }
  }
};

export default WidgetsData;
