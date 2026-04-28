export const PAGE_TITLE = 'Reviews';
export const PAGE_SINGLE_TITLE = 'Review';
export const LINK_URL = 'reviews';
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
  product: {
    type: 'related',
    required: false,
    title: 'Product',
    inputType: 'text',
    field: 'name',
  },
  ratings: {
    type: 'select',
    required: true,
    title: 'Rating',
    inputType: 'text',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ],
  },
  message: {
    type: 'string',
    required: true,
    title: 'Message',
    inputType: 'text',
  },
  approved: {
    type: 'select',
    required: true,
    title: 'Approved',
    inputType: 'text',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
};
export const initialValues = {
  name: '',
  email: '',
  message: '',
  approved: 'false',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Ratings', value: 'ratings' },
  { name: 'Approved', value: 'approved', boolean: true },
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
];
