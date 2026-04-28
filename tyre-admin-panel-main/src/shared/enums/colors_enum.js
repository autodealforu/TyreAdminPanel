export const PAGE_TITLE = 'Colors';
export const PAGE_SINGLE_TITLE = 'Color';
export const LINK_URL = 'colors';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  hex_code: {
    type: 'string',
    required: true,
    title: 'Hex Code',
    inputType: 'text',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Hex Code', value: 'hex_code' },
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
