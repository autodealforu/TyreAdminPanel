export const PAGE_TITLE = 'Customers';
export const PAGE_SINGLE_TITLE = 'Customer';
export const LINK_URL = 'customers';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  phone: {
    type: 'string',
    required: true,
    title: 'Phone',
    inputType: 'text',
  },
  email: {
    type: 'string',
    required: true,
    title: 'Email',
    inputType: 'text',
  },
  password: {
    type: 'string',
    required: false,
    title: 'Password',
    inputType: 'password',
    hideOnView: true,
    hideOnEdit: true,
  },
  divider: {
    type: 'divider',
    title: 'Address',
    hideOnView: true,
  },
  'address_data.address_1': {
    type: 'string',
    required: false,
    title: 'Address 1',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
  'address_data.address_2': {
    type: 'string',
    required: false,
    title: 'Address 2',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
  'address_data.city': {
    type: 'string',
    required: false,
    title: 'City',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
  'address_data.state': {
    type: 'string',
    required: false,
    title: 'State',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
  'address_data.pin': {
    type: 'string',
    required: false,
    title: 'Pincode',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
  'address_data.landmark': {
    type: 'string',
    required: false,
    title: 'Landmark',
    inputType: 'text',
    hideOnView: true,
    hideOnEdit: true,
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Phone', value: 'phone' },
  { name: 'Email', value: 'email' },
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
];
