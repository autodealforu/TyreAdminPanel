export const PAGE_TITLE = 'Parts';
export const PAGE_SINGLE_TITLE = 'Part';
export const LINK_URL = 'parts';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
  },
  description: {
    type: 'string',
    required: false,
    title: 'Description',
    inputType: 'text',
  },
  price: {
    type: 'string',
    required: true,
    title: 'Price',
    inputType: 'number',
  },
  gst_type: {
    type: 'select',
    required: true,
    title: 'GST Type',
    inputType: 'text',
    options: ['INTERSTATE', 'INTRASTATE', 'CGST', 'SGST', 'IGST'],
  },

  gst_tax_rate: {
    type: 'select',
    required: true,
    title: 'GST Tax Rate',
    inputType: 'text',
    options: [18, 28, 5, 12, 0],
  },
};
export const initialValues = {
  name: '',
  description: '',
  price: 0,
};

export const view_all_table = [
  { name: 'Name', value: 'name' },
  { name: 'Price', value: 'price' },
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
