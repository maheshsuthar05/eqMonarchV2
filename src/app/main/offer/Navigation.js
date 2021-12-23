const OfferNavigation = {
  id: 'offers',
  title: 'Offers',
  type: 'group',
  icon: 'star',
  children: [
    {
      id: 'Offers',
      title: 'Offers',
      type: 'item',
      icon: 'dashboard',
      url: `/offer/property/<%= caseInstanceId %>/offerlist`
    },
    {
      id: 'OpenTaks',
      title: 'Tasks',
      type: 'item',
      icon: 'person',
      url: `/property/details/<%= caseInstanceId %>/tasks/open`
    }
  ]
};

export default OfferNavigation;
