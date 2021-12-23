const CommunicationSubNav = [
  {
    title: 'Settings',
    id: 'settings',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/communication/settings',
    visible: true
  },
  {
    title: 'Predefined Messages',
    id: 'predefined-messages',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/communication/predefined-messages',
    visible: true
  },
  {
    title: 'Message Categories',
    id: 'message-categories',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/communication/message-categories',
    visible: true
  },
  {
    title: 'Message Recipients',
    id: 'message-recipients',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/communication/message-recipients',
    visible: true
  }
];

export default CommunicationSubNav;
