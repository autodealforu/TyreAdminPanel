export const PAGE_TITLE = "Blogs";
export const PAGE_SINGLE_TITLE = "Blog";
export const LINK_URL = "blogs";
export const inputFields = {
  title: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
    slug: true,
  },
  category: {
    type: "related",
    required: false,
    title: "Category",
    inputType: "text",
    field: "name",
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
  gallery: {
    type: "gallery",
    required: false,
    title: "Gallery",
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
};

export const view_all_table = [
  { name: "Title", value: "title" },
  { name: "Image", value: "image", image: true },
];

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
