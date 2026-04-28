export const PAGE_TITLE = 'Contacts';
export const PAGE_SINGLE_TITLE = 'Contact';
export const LINK_URL = 'contacts';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
  },
  phone: {
    type: 'string',
    required: true,
    title: 'Phone',
    inputType: 'tel',
    validation: 'phone',
  },
  email: {
    type: 'string',
    required: true,
    title: 'Email',
    validation: 'email',
  },
  message: {
    type: 'text',
    required: true,
    title: 'Message',
  },
};
export const initialValues = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export const view_all_table = [
  {
    name: 'Name',
    value: 'name',
  },
  {
    name: 'Phone',
    value: 'phone',
  },
  {
    name: 'Email',
    value: 'email',
  },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    type: 'string',
    search_type: 'search',
  },
  {
    id: 'phone',
    field: 'phone',
    label: 'Phone',
    type: 'string',
    search_type: 'search',
  },
  {
    id: 'email',
    field: 'email',
    label: 'Email',
    type: 'string',
    search_type: 'search',
  },
  {
    id: 'message',
    field: 'message',
    label: 'Message',
    type: 'string',
    search_type: 'search',
  },
];
