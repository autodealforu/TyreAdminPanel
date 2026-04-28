export const PAGE_TITLE = 'Products';
export const PAGE_SINGLE_TITLE = 'Product';
export const LINK_URL = 'products';

// Common fields for all product types
export const commonFields = {
  product_category: {
    type: 'select',
    required: true,
    title: 'Product Type',
    inputType: 'select',
    options: ['TYRE', 'ALLOY_WHEEL', 'SERVICE'],
  },
  // Pricing fields (common to all)
  cost_price: {
    type: 'string',
    required: true,
    title: 'Cost Price',
    inputType: 'number',
    placeholder: 'Enter cost price',
  },
  mrp_price: {
    type: 'string',
    required: false,
    title: 'MRP Price',
    inputType: 'number',
    placeholder: 'Enter MRP price',
  },
  rcp_price: {
    type: 'string',
    required: false,
    title: 'RCP Price',
    inputType: 'number',
    placeholder: 'Enter RCP price',
  },
  auto_deal_price: {
    type: 'string',
    required: false,
    title: 'Auto Deal Price',
    inputType: 'number',
    placeholder: 'Enter auto deal price',
  },
  stock: {
    type: 'string',
    required: false,
    title: 'Stock Quantity',
    inputType: 'number',
    placeholder: 'Enter stock quantity',
  },
  in_stock: {
    type: 'checkbox',
    required: false,
    title: 'In Stock',
    inputType: 'checkbox',
  },
  vendor: {
    type: 'related',
    required: false,
    title: 'Vendor',
    inputType: 'select',
    searchItem: 'vendor',
  },
  published_status: {
    type: 'select',
    required: true,
    title: 'Status',
    inputType: 'select',
    options: ['PUBLISHED', 'DRAFT'],
  },
};

// Tyre-specific fields
export const tyreFields = {
  rimDiameter: {
    type: 'related',
    required: true,
    title: 'Rim Diameter',
    inputType: 'select',
    searchItem: 'rimdiameter',
  },
  tyreWidth: {
    type: 'related',
    required: true,
    title: 'Tyre Width',
    inputType: 'select',
    searchItem: 'tyrewidth',
  },
  aspectRatio: {
    type: 'related',
    required: true,
    title: 'Aspect Ratio',
    inputType: 'select',
    searchItem: 'aspectratio',
  },
  loadIndex: {
    type: 'related',
    required: true,
    title: 'Load Index',
    inputType: 'select',
    searchItem: 'loadindex',
  },
  speedSymbol: {
    type: 'related',
    required: true,
    title: 'Speed Symbol',
    inputType: 'select',
    searchItem: 'speedsymbol',
  },
  plyRating: {
    type: 'related',
    required: true,
    title: 'Ply Rating',
    inputType: 'select',
    searchItem: 'plyrating',
  },
  productBrand: {
    type: 'related',
    required: true,
    title: 'Brand',
    inputType: 'select',
    searchItem: 'brand',
  },
  productThreadPattern: {
    type: 'related',
    required: true,
    title: 'Thread Pattern',
    inputType: 'select',
    searchItem: 'threadpattern',
  },
  productType: {
    type: 'related',
    required: true,
    title: 'Product Type',
    inputType: 'select',
    searchItem: 'producttype',
  },
  construction: {
    type: 'string',
    required: true,
    title: 'Construction',
    inputType: 'text',
    placeholder: 'Enter construction type',
  },
  gstTaxRate: {
    type: 'select',
    required: true,
    title: 'GST Tax Rate (%)',
    inputType: 'select',
    options: ['18', '28', '12', '5', '0'],
  },
  hsnCode: {
    type: 'string',
    required: true,
    title: 'HSN Code',
    inputType: 'text',
    placeholder: 'Enter HSN code',
  },
  unit: {
    type: 'select',
    required: true,
    title: 'Unit',
    inputType: 'select',
    options: ['PIECE', 'SET', 'PAIR'],
  },
  broadCategory: {
    type: 'string',
    required: true,
    title: 'Broad Category',
    inputType: 'text',
    placeholder: 'Enter broad category',
  },
  category: {
    type: 'string',
    required: true,
    title: 'Category',
    inputType: 'text',
    placeholder: 'Enter category',
  },
  subCategory: {
    type: 'string',
    required: true,
    title: 'Sub Category',
    inputType: 'text',
    placeholder: 'Enter sub category',
  },
  productDescription: {
    type: 'string',
    required: false,
    title: 'Product Description',
    inputType: 'textarea',
    placeholder: 'Enter product description',
    rows: 4,
  },
  published_status: {
    type: 'select',
    required: true,
    title: 'Status',
    inputType: 'select',
    options: ['DRAFT', 'PUBLISHED', 'INACTIVE'],
  },
};

// Alloy Wheel-specific fields
export const alloyWheelFields = {
  alloyDiameterInches: {
    type: 'related',
    required: true,
    title: 'Alloy Diameter (Inches)',
    inputType: 'select',
    searchItem: 'alloydiameter',
  },
  alloyWidth: {
    type: 'related',
    required: true,
    title: 'Alloy Width',
    inputType: 'select',
    searchItem: 'alloywidth',
  },
  alloyPCD: {
    type: 'related',
    required: true,
    title: 'Alloy PCD',
    inputType: 'select',
    searchItem: 'alloypcd',
  },
  alloyOffset: {
    type: 'related',
    required: true,
    title: 'Alloy Offset',
    inputType: 'select',
    searchItem: 'alloyoffset',
  },
  alloyBoreSizeMM: {
    type: 'related',
    required: false,
    title: 'Alloy Bore Size (MM)',
    inputType: 'select',
    searchItem: 'alloybore',
  },
  alloyBrand: {
    type: 'related',
    required: true,
    title: 'Alloy Brand',
    inputType: 'select',
    searchItem: 'brand',
  },
  alloyDesignName: {
    type: 'string',
    required: true,
    title: 'Design Name',
    inputType: 'text',
    placeholder: 'Enter design name',
  },
  alloyFinish: {
    type: 'related',
    required: true,
    title: 'Alloy Finish',
    inputType: 'select',
    searchItem: 'alloyfinish',
  },
  productType: {
    type: 'related',
    required: true,
    title: 'Product Type',
    inputType: 'select',
    searchItem: 'producttype',
  },
  gstTaxRate: {
    type: 'select',
    required: true,
    title: 'GST Tax Rate (%)',
    inputType: 'select',
    options: ['18', '28', '12', '5', '0'],
  },
  hsnCode: {
    type: 'string',
    required: true,
    title: 'HSN Code',
    inputType: 'text',
    placeholder: 'Enter HSN code',
  },
  unit: {
    type: 'select',
    required: true,
    title: 'Unit',
    inputType: 'select',
    options: ['PIECE', 'SET', 'PAIR'],
  },
  broadCategory: {
    type: 'string',
    required: true,
    title: 'Broad Category',
    inputType: 'text',
    placeholder: 'Enter broad category',
  },
  category: {
    type: 'string',
    required: true,
    title: 'Category',
    inputType: 'text',
    placeholder: 'Enter category',
  },
  subCategory: {
    type: 'string',
    required: true,
    title: 'Sub Category',
    inputType: 'text',
    placeholder: 'Enter sub category',
  },
  productDescription: {
    type: 'string',
    required: false,
    title: 'Product Description',
    inputType: 'textarea',
    placeholder: 'Enter product description',
    rows: 4,
  },
  published_status: {
    type: 'select',
    required: true,
    title: 'Status',
    inputType: 'select',
    options: ['DRAFT', 'PUBLISHED', 'INACTIVE'],
  },
};

// Service-specific fields
export const serviceFields = {
  serviceName: {
    type: 'string',
    required: true,
    title: 'Service Name',
    inputType: 'text',
    placeholder: 'Enter service name',
  },
  serviceDescription: {
    type: 'string',
    required: true,
    title: 'Service Description',
    inputType: 'textarea',
    placeholder: 'Enter service description',
    rows: 4,
  },
  serviceShortName: {
    type: 'string',
    required: true,
    title: 'Service Short Name',
    inputType: 'text',
    placeholder: 'Enter short name',
  },
  serviceCategory: {
    type: 'select',
    required: true,
    title: 'Service Category',
    inputType: 'select',
    options: [
      'MAINTENANCE',
      'REPAIR',
      'INSTALLATION',
      'INSPECTION',
      'CONSULTATION',
      'OTHER',
    ],
  },
  estimatedDuration: {
    type: 'string',
    required: false,
    title: 'Estimated Duration (minutes)',
    inputType: 'number',
    placeholder: 'Enter duration in minutes',
  },
  complexityLevel: {
    type: 'select',
    required: false,
    title: 'Complexity Level',
    inputType: 'select',
    options: ['BASIC', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
  },
  productType: {
    type: 'related',
    required: true,
    title: 'Product Type',
    inputType: 'select',
    searchItem: 'producttype',
  },
  gstTaxRate: {
    type: 'select',
    required: true,
    title: 'GST Tax Rate (%)',
    inputType: 'select',
    options: ['18', '28', '12', '5', '0'],
  },
  gstType: {
    type: 'select',
    required: true,
    title: 'GST Type',
    inputType: 'select',
    options: ['CGST_SGST', 'IGST', 'EXEMPT', 'NIL_RATED'],
  },
  hsnCode: {
    type: 'string',
    required: true,
    title: 'HSN Code',
    inputType: 'text',
    placeholder: 'Enter HSN code',
  },
  unit: {
    type: 'select',
    required: true,
    title: 'Unit',
    inputType: 'select',
    options: ['SERVICE', 'HOUR', 'JOB', 'PIECE'],
  },
  warranty: {
    type: 'string',
    required: false,
    title: 'Warranty Information',
    inputType: 'textarea',
    placeholder: 'Enter warranty terms',
    rows: 3,
  },
  published_status: {
    type: 'select',
    required: true,
    title: 'Status',
    inputType: 'select',
    options: ['DRAFT', 'PUBLISHED', 'INACTIVE'],
  },
};

// Function to get fields based on product type
export const getFieldsForProductType = (productType) => {
  const baseFields = { ...commonFields };

  switch (productType) {
    case 'TYRE':
      return { ...baseFields, ...tyreFields };
    case 'ALLOY_WHEEL':
      return { ...baseFields, ...alloyWheelFields };
    case 'SERVICE':
      return { ...baseFields, ...serviceFields };
    default:
      return baseFields;
  }
};

// Initial values for all product types
export const getInitialValuesForProductType = (productType) => {
  const baseInitialValues = {
    product_category: productType || '',
    cost_price: '',
    mrp_price: '',
    rcp_price: '',
    auto_deal_price: '',
    stock: '100',
    in_stock: false,
    vendor: '',
    published_status: 'PUBLISHED',
  };

  switch (productType) {
    case 'TYRE':
      return {
        ...baseInitialValues,
        rimDiameter: '',
        tyreWidth: '',
        aspectRatio: '',
        loadIndex: '',
        speedSymbol: '',
        plyRating: '',
        productBrand: '',
        productThreadPattern: '',
        productType: '',
        construction: '',
        gstTaxRate: '18',
        hsnCode: '',
        unit: 'PIECE',
        broadCategory: 'TYRES',
        category: '',
        subCategory: '',
        productDescription: '',
        published_status: 'DRAFT',
      };

    case 'ALLOY_WHEEL':
      return {
        ...baseInitialValues,
        alloyDiameterInches: '',
        alloyWidth: '',
        alloyPCD: '',
        alloyOffset: '',
        alloyBoreSizeMM: '',
        alloyBrand: '',
        alloyDesignName: '',
        alloyFinish: '',
        productType: '',
        gstTaxRate: '18',
        hsnCode: '87087090',
        unit: 'PIECE',
        broadCategory: 'ALLOY WHEELS',
        category: '',
        subCategory: '',
        productDescription: '',
        published_status: 'DRAFT',
      };

    case 'SERVICE':
      return {
        ...baseInitialValues,
        serviceName: '',
        serviceDescription: '',
        serviceShortName: '',
        serviceCategory: 'MAINTENANCE',
        estimatedDuration: '',
        complexityLevel: 'BASIC',
        productType: '',
        gstTaxRate: '18',
        gstType: 'CGST_SGST',
        hsnCode: '99820000',
        unit: 'SERVICE',
        warranty: 'Standard service warranty as per company policy',
        published_status: 'DRAFT',
      };

    default:
      return baseInitialValues;
  }
};

export const view_all_table = [
  { name: 'Type', value: 'product_category' },
  { name: 'Name', value: 'name' }, // This will be dynamic based on product type
  { name: 'Cost Price', value: 'cost_price' },
  { name: 'MRP Price', value: 'mrp_price' },
  { name: 'Stock', value: 'stock' },
  { name: 'Status', value: 'published_status' },
  { name: 'Vendor', value: 'vendor', related: true, field: 'name' },
];

export const SIDEBAR_OPTIONS = [
  {
    id: 'product_category',
    field: 'product_category',
    label: 'Product Type',
    type: 'select',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
    options: ['TYRE', 'ALLOY_WHEEL', 'SERVICE'],
  },
  {
    id: 'published_status',
    field: 'published_status',
    label: 'Status',
    type: 'select',
    search_type: 'exact',
    inputType: 'select',
    condition: '',
    options: ['DRAFT', 'PUBLISHED'],
  },
  {
    id: 'cost_price',
    field: 'cost_price',
    label: 'Cost Price Range',
    type: 'range',
    search_type: 'range',
    inputType: 'number',
    condition: '',
  },
];
