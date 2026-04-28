export const PAGE_TITLE = 'Brands';
export const PAGE_SINGLE_TITLE = 'Brand';
export const LINK_URL = 'brands';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  brand_image: {
    type: 'file',
    required: false,
    title: 'Brand Image',
    inputType: 'text',
  },
};
export const initialValues = {
  name: '',
  brand_image: '',
};

export const view_all_table = [
  { name: 'Image', value: 'brand_image', image: true },
  { name: 'Name', value: 'name' }
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
