export const PAGE_TITLE = "Banners";
export const PAGE_SINGLE_TITLE = "Banner";
export const LINK_URL = "banners";
export const inputFields = {
  name: {
    type: "string",
    required: false,
    title: "Name",
    inputType: "text",
  },
  product_collection: {
    type: "related",
    required: false,
    title: "Collection",
    inputType: "text",
    field: "name",
  },
  image: {
    type: "file",
    required: false,
    title: "Image",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
};

export const view_all_table = [
  { name: "Image", value: "image", image: true },
  {
    name: "Collection",
    value: "product_collection",
    related: true,
    field: "name",
  },
];

export const SIDEBAR_OPTIONS = [
  {
    id: "name",
    field: "name",
    label: "Name",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
