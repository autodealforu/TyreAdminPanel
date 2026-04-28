export const PAGE_TITLE = "Coupons";
export const PAGE_SINGLE_TITLE = "Coupon";
export const LINK_URL = "coupons";
export const inputFields = {
  code: {
    type: "string",
    required: true,
    title: "Code",
    inputType: "text",
  },
  min_cart_value: {
    type: "string",
    required: true,
    title: "Min Cart Value",
    inputType: "number",
  },
  max_discount: {
    type: "string",
    required: true,
    title: "Max Discount",
    inputType: "number",
  },
  discount_type: {
    type: "select",
    required: true,
    title: "Discount Type",
    inputType: "text",
    options: ["FIXED", "PERCENTAGE"],
  },
  discount: {
    type: "string",
    required: true,
    title: "Discount",
    inputType: "number",
  },
  product_collection: {
    type: "related",
    required: false,
    title: "Collection",
    inputType: "text",
    field: "name",
  },
  product_category: {
    type: "related",
    required: false,
    title: "Category",
    inputType: "text",
    field: "name",
  },
};
export const initialValues = {
  code: "",
  min_cart_value: "",
  max_discount: "",
  discount_type: "",
  discount: "",
};

export const view_all_table = [
  { name: "Code", value: "code" },
  { name: "Min Cart Value", value: "min_cart_value" },
  { name: "Max Discount", value: "max_discount" },
  { name: "Discount Type", value: "discount_type" },
  { name: "Discount", value: "discount" },
];

export const SIDEBAR_OPTIONS = [
  {
    id: "code",
    field: "code",
    label: "Code",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
