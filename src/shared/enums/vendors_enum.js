export const PAGE_TITLE = 'Vendors';
export const PAGE_SINGLE_TITLE = 'Vendor';
export const LINK_URL = 'vendors';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  email: {
    type: 'string',
    required: true,
    title: 'Email',
    inputType: 'text',
  },
  phone: {
    type: 'string',
    required: true,
    title: 'Phone',
    inputType: 'text',
  },
  vendor_divider: {
    type: 'divider',
    required: false,
    title: 'Vendor Details',
    inputType: 'text',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Phone', value: 'phone' },
  { name: 'Email', value: 'email' },

  { name: 'Store Name', value: 'vendor', related: true, field: 'store_name' },
  { name: 'GST', value: 'vendor', related: true, field: 'gst_no' },
  {
    name: 'Account Number',
    value: 'vendor',
    related: true,
    field: 'account_number',
  },
  {
    name: 'Status',
    value: 'vendor',
    related: true,
    field: 'profile_status',
  },
  {
    name: 'Address',
    value: 'vendor',
    related: true,
    field: 'pickup_address.address_1',
  },

  { name: 'Products', value: 'totalProducts' },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'phone',
    field: 'phone',
    label: 'Phone',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },

  {
    id: 'email',
    field: 'email',
    label: 'Email',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'store_name',
    field: 'vendor.store_name',
    label: 'Store Name',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
];
