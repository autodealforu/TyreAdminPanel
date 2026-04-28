export const PAGE_TITLE = "Return Requests";
export const PAGE_SINGLE_TITLE = "Return Request";
export const LINK_URL = "return-requests";
export const inputFields = {
  subject: {
    type: "string",
    required: true,
    title: "Subject",
    inputType: "text",
  },
  order: {
    type: "related",
    required: true,
    title: "Order",
    field: "name",
  },
  message: {
    type: "text",
    required: true,
    title: "Message",
    inputType: "text",
  },
  media: {
    type: "gallery",
    required: false,
    title: "Media",
    inputType: "text",
  },
  status: {
    type: "select",
    required: false,
    title: "Status",
    options: ["OPENED", "RESOLVED", "CLOSED"],
    default: "OPENED",
  },
};
export const initialValues = {
  subject: "",
};

export const view_all_table = [{ name: "Subject", value: "subject" }];

export const SIDEBAR_OPTIONS = [
  {
    id: "subject",
    field: "subject",
    label: "Subject",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
