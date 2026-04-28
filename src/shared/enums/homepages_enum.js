export const PAGE_TITLE = 'Homepage Components';
export const PAGE_SINGLE_TITLE = 'Homepage Component';
export const LINK_URL = 'homepages';
export const inputFields = {
  title: {
    type: 'string',
    required: true,
    title: 'Title',
    inputType: 'text',
  },
  description: {
    type: 'html',
    required: true,
    title: 'Description',
    inputType: 'text',
  },

  position: {
    type: 'select',
    required: true,
    title: 'Position',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  display_type: {
    type: 'select',
    required: true,
    title: 'Display Type',
    options: [
      'COLLECTION',
      'COLLECTION PRODUCTS',
      'IMAGE',
      'GALLERY',
      'SLIDER',
      'TEXT',
    ],
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Title', value: 'title' },

  { name: 'Position', value: 'position' },
  { name: 'Display Type', value: 'display_type' },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'title',
    field: 'title',
    label: 'Title',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
];
