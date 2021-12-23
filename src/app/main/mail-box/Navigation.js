const MailNavigation = {
  id: 'documentation',
  title: 'Documentation',
  type: 'group',
  icon: 'star',
  children: [
    {
      id: 'inbox',
      title: 'Inbox',
      type: 'item',
      icon: '',
      url: '/mail/inbox',
      visible: true,
      disabled: false
    },
    {
      id: 'sent',
      title: 'Sent',
      type: 'item',
      icon: '',
      url: '/mail/sent',
      visible: true,
      disabled: false
    }
  ]
};

export default MailNavigation;
