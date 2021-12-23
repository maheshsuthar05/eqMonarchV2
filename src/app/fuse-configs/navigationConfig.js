import navigationResourceKeys from 'app/fuse-configs/navigationResourceConfig';

const NavigationConfig = () => [
  {
    id: navigationResourceKeys.Navigation_Home,
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/home/dashboard',
    hidden: true
  }
];

export default NavigationConfig;
