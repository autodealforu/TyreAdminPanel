export const PAGE_TITLE = "Blogcategorys";
export const PAGE_SINGLE_TITLE = "Blogcategory";
export const LINK_URL = "blogcategorys";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text"
  }
};
export const initialValues = {
  name: ""
};

export const view_all_table = [{ name: "Name", value: "name" }];

export const SIDEBAR_OPTIONS = [
  {
    id: "name",
    field: "name",
    label: "Name",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: ""
  }
];
