export const PAGE_TITLE = 'sub-sub-categories';
export const PAGE_SINGLE_TITLE = 'Sub Sub Category';
export const LINK_URL = 'sub-sub-categories';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
    slug: true,
  },

  slug: {
    type: 'slug',
    required: true,
    title: 'Slug',
    inputType: 'text',
  },
  image: {
    type: 'file',
    required: false,
    title: 'Image',
    inputType: 'text',
  },
  commission: {
    type: 'string',
    required: false,
    title: 'Commission',
    inputType: 'number',
  },
  category: {
    type: 'related',
    required: true,
    title: 'Category',
    field: 'name',
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
  published_date: {
    type: 'string',
    required: true,
    title: 'Published Date',
    inputType: 'date',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Category', value: 'category', related: true, field: 'name' },
  { name: 'Sub Category', value: 'sub_category', related: true, field: 'name' },
  { name: 'Commission', value: 'commission' },
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
