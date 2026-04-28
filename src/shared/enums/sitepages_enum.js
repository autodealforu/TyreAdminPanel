export const PAGE_TITLE = "Pages";
export const PAGE_SINGLE_TITLE = "Page";
export const LINK_URL = "pages";
export const inputFields = {
  title: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
    slug: true,
  },
  description: {
    type: "html",
    required: true,
    title: "Description",
    inputType: "text",
  },
  image: {
    type: "file",
    required: false,
    title: "Featured Image",
    inputType: "text",
  },
  slug: {
    type: "slug",
    required: true,
    title: "Slug",
    inputType: "text",
  },
};
export const initialValues = {
  title: "",
  description: "",
};

export const view_all_table = [{ name: "Title", value: "title" }];

export const SIDEBAR_OPTIONS = [
  {
    id: "title",
    field: "title",
    label: "Title",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
