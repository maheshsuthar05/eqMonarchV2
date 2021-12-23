const VendorNavigation = {
  id: 'manageProductsVendor',
  title: 'Manage',
  type: 'group',
  icon: 'star',
  children: [
    {
      id: 'manageProducts',
      title: 'Products',
      type: 'item',
      icon: 'dashboard',
      url: '/manage/products'
    },
    {
      id: 'manageVendors',
      title: 'Vendors',
      type: 'item',
      icon: 'person',
      url: '/manage/vendors'
    }
  ]
};

export default VendorNavigation;
