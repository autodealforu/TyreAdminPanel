export const PAGE_TITLE = "Templates";
export const PAGE_SINGLE_TITLE = "Template";
export const LINK_URL = "templates";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
  },
  image: {
    type: "file",
    required: true,
    title: "Image",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
  image: "",
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
