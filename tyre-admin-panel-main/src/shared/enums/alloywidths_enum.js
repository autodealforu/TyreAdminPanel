export const PAGE_TITLE = 'Alloy Widths';
export const PAGE_SINGLE_TITLE = 'Alloy Width';
export const LINK_URL = 'alloywidths';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  width_type: {
    type: 'string',
    required: true,
    title: 'Width Type',
    inputType: 'text',
    placeholder: 'e.g., J',
  },
};
export const initialValues = {
  name: '',
  width_type: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Width Type', value: 'width_type' },
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
