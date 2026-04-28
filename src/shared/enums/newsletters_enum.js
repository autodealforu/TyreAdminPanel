export const PAGE_TITLE = "Newsletters";
export const PAGE_SINGLE_TITLE = "Newsletter";
export const LINK_URL = "newsletters";
export const inputFields = {
  email: {
    type: "string",
    required: true,
    title: "email",
    inputType: "text",
  },
};
export const initialValues = {
  email: "",
};

export const view_all_table = [{ name: "Email", value: "email" }];

export const SIDEBAR_OPTIONS = [
  {
    id: "email",
    field: "email",
    label: "Email",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
