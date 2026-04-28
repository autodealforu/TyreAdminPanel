export const PAGE_TITLE = 'Tyres';
export const PAGE_SINGLE_TITLE = 'Tyre';
export const LINK_URL = 'tyres';
export const inputFields = {
  rimDiameter: {
    type: 'related',
    required: true,
    title: 'Rim Diameter',
    field: 'name',
  },
  tyreWidthType: {
    type: 'select',
    required: true,
    title: 'Tyre Width Type',
    options: ['IN MM', 'IN INCH'],
  },
  tyreWidth: {
    type: 'related',
    required: true,
    title: 'Tyre Width',
    field: 'name',
  },

  aspectRatio: {
    type: 'related',
    required: true,
    title: 'Aspect Ratio',
    field: 'name',
  },
  loadIndex: {
    type: 'related',
    required: true,
    title: 'Load Index',
    field: 'name',
  },
  speedSymbol: {
    type: 'related',
    required: true,
    title: 'Speed Symbol',
    field: 'name',
  },
  construction: {
    type: 'select',
    required: true,
    title: 'TYRE CONSTRUCTION',
    inputType: 'select',
    options: ['R', 'N', 'D'],
  },
  plyRating: {
    type: 'related',
    required: true,
    title: 'Ply Rating',
    field: 'name',
  },
  productBrand: {
    type: 'related',
    required: true,
    title: 'Brand',
    field: 'name',
  },
  productThreadPattern: {
    type: 'related',
    required: true,
    title: 'Thread Pattern',
    field: 'name',
  },
  productType: {
    type: 'related',
    required: true,
    title: 'Product Type',
    field: 'name',
  },
  gstTaxRate: {
    type: 'select',
    required: true,
    title: 'GST Tax Rate',
    inputType: 'text',
    options: [18, 28, 5, 12, 0],
  },
  gstTax: {
    type: 'string',
    required: true,
    title: 'GST Tax',
    inputType: 'text',
  },
  unit: {
    type: 'string',
    required: true,
    title: 'Unit',
    inputType: 'text',
  },
  broadCategory: {
    type: 'string',
    required: true,
    title: 'Broad Category',
    inputType: 'text',
  },
  category: {
    type: 'string',
    required: true,
    title: 'Category',
    inputType: 'text',
  },
  subCategory: {
    type: 'string',
    required: true,
    title: 'Sub Category',
    inputType: 'text',
  },
  hsnCode: {
    type: 'string',
    required: true,
    title: 'HSN Code',
    inputType: 'text',
  },
  hsnSubCode: {
    type: 'string',
    required: true,
    title: 'HSN Sub Code',
    inputType: 'text',
  },
  warranty: {
    type: 'string',
    required: true,
    title: 'Warranty',
    inputType: 'text',
  },
  productImages: {
    type: 'gallery',
    required: false,
    title: 'Product Images',
  },
  productDescription: {
    type: 'html',
    required: false,
    title: 'Product Description',
    inputType: 'textarea',
  },
  productWarrantyPolicy: {
    type: 'string',
    required: false,
    title: 'Product Warranty Policy',
    inputType: 'textarea',
  },
  grossWeight: {
    type: 'string',
    required: false,
    title: 'Gross Weight',
    inputType: 'number',
  },
  volumetricWeight: {
    type: 'string',
    required: false,
    title: 'Volumetric Weight',
    inputType: 'number',
  },
};
export const initialValues = {
  name: '',
};

export const view_all_table = [
  { name: 'Brand', value: 'productBrand', related: true, field: 'name' },
  { name: 'Rim Dia', value: 'rimDiameter', related: true, field: 'name' },
  { name: 'Tyre Width', value: 'tyreWidth', related: true, field: 'name' },
  { name: 'Aspect Ratio', value: 'aspectRatio', related: true, field: 'name' },
  { name: 'Load Index', value: 'loadIndex', related: true, field: 'name' },
  { name: 'Speed Symbol', value: 'speedSymbol', related: true, field: 'name' },

  { name: 'Construction', value: 'construction' },
  { name: 'Ply Rating', value: 'plyRating', related: true, field: 'name' },
  {
    name: 'Thread Pattern',
    value: 'productThreadPattern',
    related: true,
    field: 'name',
  },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'rimDiameter',
    field: 'rimDiameter',
    label: 'Rim Diameter',
    type: 'related',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
  },
  {
    id: 'tyreWidth',
    field: 'tyreWidth',
    label: 'Tyre Width',
    type: 'related',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
  },
  {
    id: 'aspectRatio',
    field: 'aspectRatio',
    label: 'Aspect Ratio',
    type: 'related',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
  },
  {
    id: 'productBrand',
    field: 'productBrand',
    label: 'Product Brand',
    type: 'related',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
  },
];
