export const PAGE_TITLE = 'Alloy PCDs';
export const PAGE_SINGLE_TITLE = 'Alloy PCD';
export const LINK_URL = 'alloypcds';

export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
};

export const initialValues = {
  name: '',
};

export const view_all_table = [{ name: 'Name', value: 'name' }];

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
