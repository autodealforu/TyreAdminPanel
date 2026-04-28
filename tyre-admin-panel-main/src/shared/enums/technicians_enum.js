export const PAGE_TITLE = 'Technicians';
export const PAGE_SINGLE_TITLE = 'Technician';
export const LINK_URL = 'technicians';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  email: {
    type: 'string',
    required: false,
    title: 'Email',
    inputType: 'text',
  },
  phone: {
    type: 'string',
    required: false,
    title: 'Phone',
    inputType: 'text',
  },
  specialization: {
    type: 'string',
    required: false,
    title: 'Specialization',
    inputType: 'text',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Email', value: 'email' },
  { name: 'Phone', value: 'phone' },
  { name: 'Specialization', value: 'specialization' },
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
    id: 'email',
    field: 'email',
    label: 'Email',
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
    id: 'specialization',
    field: 'specialization',
    label: 'Specialization',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
];
