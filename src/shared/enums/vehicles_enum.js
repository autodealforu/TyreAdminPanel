export const PAGE_TITLE = 'Vehicles';
export const PAGE_SINGLE_TITLE = 'Vehicle';
export const LINK_URL = 'vehicles';
export const inputFields = {
  vehicle_number: {
    type: 'string',
    required: true,
    title: 'Vehicle Number',
    inputType: 'text',
  },
  makeModel: {
    type: 'related',
    required: true,
    title: 'Make & Model',
    inputType: 'async_select',
    field: 'name',
  },
  owner: {
    type: 'related',
    required: true,
    title: 'Owner',
    inputType: 'async_select',
    field: 'name',
  },
  year: {
    type: 'string',
    required: true,
    title: 'Year of Sale / Manufacture',
    inputType: 'number',
  },
  vin: {
    type: 'string',
    required: false,
    title: 'VIN',
    inputType: 'text',
  },
};
export const initialValues = {
  makemodel: '',
  year: '',
  vin: '',
  vehicle_number: '',
};

export const view_all_table = [{ name: 'Vehicle No', value: 'vehicle_number' }];

export const SIDEBAR_OPTIONS = [
  {
    id: 'makemodel',
    field: 'makemodel',
    label: 'Make & Model',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
];
