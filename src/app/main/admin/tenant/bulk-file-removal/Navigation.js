const BulkFileRemovalSubNav = [
  {
    title: 'Remove Files',
    id: 'remove-files',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/bulk-file-removal/remove-files',
    visible: true
  },
  {
    title: 'Files Pending Review',
    id: 'files-pending-review',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/bulk-file-removal/files-pending-review',
    visible: true
  },
  {
    title: 'Files Pending Deletion',
    id: 'files-pending-deletion',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/bulk-file-removal/files-pending-deletion',
    visible: true
  },
  {
    title: 'Deleted Files',
    id: 'deleted-files',
    type: 'item',
    url: '/admin/tenant/<%= tenantId %>/bulk-file-removal/deleted-files',
    visible: true
  }
];

export default BulkFileRemovalSubNav;
