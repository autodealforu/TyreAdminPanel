export const PAGE_TITLE = "Categories";
export const PAGE_SINGLE_TITLE = "Category";
export const LINK_URL = "categorys";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
    slug: true,
  },
  description: {
    type: "html",
    required: false,
    title: "Description",
    inputType: "text",
  },
  image: {
    type: "file",
    required: false,
    title: "Image",
    inputType: "text",
  },
  slug: {
    type: "string",
    required: true,
    title: "Slug",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
  description: "",
  slug: "",
};

export const view_all_table = [
  { name: "Name", value: "name" },
  { name: "Image", value: "image", image: true },
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
