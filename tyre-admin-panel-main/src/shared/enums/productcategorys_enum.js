export const PAGE_TITLE = 'Product Categories';
export const PAGE_SINGLE_TITLE = 'Product Category';
export const LINK_URL = 'productcategorys';
export const inputFields = {
  name: {
    type: 'string',
    required: false,
    title: 'Name',
    inputType: 'text',
    slug: true,
  },
  product_collection: {
    type: 'related',
    required: false,
    title: 'Collection',
    inputType: 'text',
    field: 'name',
  },
  image: {
    type: 'file',
    required: false,
    title: 'Image',
    inputType: 'text',
  },
  slug: {
    type: 'slug',
    required: true,
    title: 'Slug',
    inputType: 'text',
  },
  commission: {
    type: 'string',
    required: true,
    title: 'Commission',
    inputType: 'number',
  },
  meta_title: {
    type: 'string',
    required: false,
    title: 'Meta Title',
    inputType: 'text',
  },
  meta_description: {
    type: 'text',
    required: false,
    title: 'Meta Description',
    inputType: 'text',
  },
  meta_keywords: {
    type: 'string',
    required: false,
    title: 'Meta Keywords',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  {
    name: 'Product Collection',
    value: 'product_collection',
    related: true,
    field: 'name',
  },
  { name: 'Commission(%)', value: 'commission', postFilled: '%' },
  {
    name: 'Image',
    value: 'image',
    image: true,
  },
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
