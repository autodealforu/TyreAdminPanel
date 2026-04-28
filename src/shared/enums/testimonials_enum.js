export const PAGE_TITLE = "Testimonials";
export const PAGE_SINGLE_TITLE = "Testimonial";
export const LINK_URL = "testimonials";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
  },
  testimonial: {
    type: "text",
    required: true,
    title: "Testimonial",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
  testimonial: "",
};

export const view_all_table = [
  { name: "Name", value: "name" },
  { name: "Testimonial", value: "testimonial" },
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
