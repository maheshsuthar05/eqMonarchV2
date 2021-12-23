import { resourceKeys } from 'app/main/vendor/resources/resourceConfig';

  const AccountNavigation = {
    children: [
      {
        id: resourceKeys.User_Profile_tab,
        title: 'Profile',
        type: 'item',
        icon: '',
        url: `/<%= userType %>/account/profile`,
        visible: true,
        disabled: false
      },
      {
        id: resourceKeys.User_Services_Tab,
        title: 'Services',
        type: 'item',
        icon: '',
        url: '/vendor/account/services',
        visible: true,
        disabled: false
      },
      {
        id: resourceKeys.User_Payment_Tab,
        title: 'Payment',
        type: 'item',
        icon: '',
        url: '/vendor/account/payment',
        visible: true,
        disabled: false
      },
      {
        id: resourceKeys.User_Statement_Tab,
        title: 'Statements',
        type: 'item',
        icon: '',
        url: '/vendor/account/statements',
        visible: true,
        disabled: false
      },
      {
        id: resourceKeys.User_Agreement_Tab,
        title: 'Agreement',
        type: 'item',
        icon: '',
        url: '/vendor/account/agreement',
        visible: true,
        disabled: false
      },
    ]
  };

export default AccountNavigation;
