export const PAGE_TITLE = 'Alloy Bores';
export const PAGE_SINGLE_TITLE = 'Alloy Bore';
export const LINK_URL = 'alloybores';

export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Alloy Bore Size (MM)',
    inputType: 'text',
  },
  description: {
    type: 'string',
    required: false,
    title: 'Description',
    inputType: 'text',
  },
};

export const initialValues = {
  name: '',
  description: '',
};

export const view_all_table = [
  { name: 'Bore Size (MM)', value: 'name' },
  { name: 'Description', value: 'description' },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'name',
    field: 'name',
    label: 'Bore Size',
    type: 'string',
    search_type: 'like',
    inputType: 'text',
    condition: '',
  },
];








