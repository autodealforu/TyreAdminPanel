export const PAGE_TITLE = 'Tyre Widths';
export const PAGE_SINGLE_TITLE = 'Tyre Width';
export const LINK_URL = 'tyre-widths';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  width_type: {
    type: 'select',
    required: true,
    title: 'Width Type',
    options: ['MM', 'INCH'],
  },
};
export const initialValues = {
  name: '',
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
  {
    id: 'width_type',
    field: 'width_type',
    label: 'Width Type',
    type: 'select',
    search_type: 'exact',
    inputType: 'text',
    options: ['MM', 'INCH'],
    condition: '',
  },
];
