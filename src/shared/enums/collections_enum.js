export const PAGE_TITLE = 'Collections';
export const PAGE_SINGLE_TITLE = 'Collection';
export const LINK_URL = 'collections';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    slug: true,
  },
  description: {
    type: 'html',
    required: false,
    title: 'Description',
  },
  image: {
    type: 'file',
    required: false,
    title: 'Image',
  },
  parent_collection: {
    type: 'related',
    required: false,
    title: 'Parent Collection',
    field: 'name',
  },
  slug: {
    type: 'slug',
    required: false,
    title: 'Slug',
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
  slug: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Image', value: 'image', image: true },

  {
    name: 'Parent ',
    value: 'parent_collection',
    related: true,
    field: 'name',
  },
  { name: 'Dynamic Collection', value: 'is_dynamic_collection', boolean: true },
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
