export const PAGE_TITLE = 'Products';
export const PAGE_SINGLE_TITLE = 'Your Product';
export const LINK_URL = 'products';
export const inputFields = {
  // Product Category Selection
  product_category: {
    type: 'select',
    required: true,
    title: 'Product Category',
    inputType: 'select',
    options: [
      { label: 'Tyre', value: 'TYRE' },
      { label: 'Alloy Wheel', value: 'ALLOY_WHEEL' },
      { label: 'Service', value: 'SERVICE' },
    ],
  },

  // Reference to specific product types
  tyre: {
    type: 'related',
    required: false,
    title: 'Select Tyre',
    inputType: 'select',
    conditionalShow: 'product_category',
    conditionalValue: 'TYRE',
  },
  alloy_wheel: {
    type: 'related',
    required: false,
    title: 'Select Alloy Wheel',
    inputType: 'select',
    conditionalShow: 'product_category',
    conditionalValue: 'ALLOY_WHEEL',
  },
  service: {
    type: 'related',
    required: false,
    title: 'Select Service',
    inputType: 'select',
    conditionalShow: 'product_category',
    conditionalValue: 'SERVICE',
  },

  pricing_divider: {
    type: 'divider',
    title: 'Pricing Information',
  },
  cost_price: {
    type: 'string',
    required: true,
    title: 'Cost Price',
    inputType: 'number',
  },
  mrp_price: {
    type: 'string',
    required: false,
    title: 'MRP Price',
    inputType: 'number',
  },
  rcp_price: {
    type: 'string',
    required: false,
    title: 'RCP Price',
    inputType: 'number',
  },
  auto_deal_price: {
    type: 'string',
    required: false,
    title: 'Auto Deal Price',
    inputType: 'number',
  },

  vendor: {
    type: 'related',
    required: true,
    title: 'Vendor',
    inputType: 'select',
  },

  inventory_divider: {
    type: 'divider',
    title: 'Inventory',
  },
  in_stock: {
    type: 'checkbox',
    required: false,
    title: 'In Stock',
  },
  stock: {
    type: 'string',
    required: false,
    title: 'Stock Quantity',
    inputType: 'number',
  },

  product_status: {
    type: 'select',
    required: false,
    title: 'Product Status',
    inputType: 'select',
    default: 'Pending',
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Rejected', value: 'Rejected' },
    ],
  },
  published_status: {
    type: 'select',
    required: false,
    title: 'Published Status',
    inputType: 'select',
    default: 'PUBLISHED',
    options: [
      { label: 'Published', value: 'PUBLISHED' },
      { label: 'Draft', value: 'DRAFT' },
    ],
  },
};
export const initialValues = {
  product_category: '',
  tyre: '',
  alloy_wheel: '',
  service: '',
  cost_price: '',
  mrp_price: '',
  rcp_price: '',
  auto_deal_price: '',
  vendor: '',
  in_stock: false,
  stock: '',
  product_status: 'Pending',
  published_status: 'PUBLISHED',
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
  {
    id: 'product_id',
    field: 'product_id',
    label: 'Product ID',
    type: 'string',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'product_category',
    field: 'product_category',
    label: 'Product Category',
    type: 'select',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
    options: ['TYRE', 'ALLOY_WHEEL', 'SERVICE'],
  },
  {
    id: 'product_status',
    field: 'product_status',
    label: 'Product Status',
    type: 'select',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
    options: ['Active', 'Pending', 'Rejected'],
  },
];
export const inputFieldsForExport = {
  product_id: {
    type: 'string',
    required: true,
    title: 'Program ID',
    inputType: 'text',
  },
  name: {
    type: 'string',
    required: true,
    title: 'Title',
    inputType: 'text',
  },
};
