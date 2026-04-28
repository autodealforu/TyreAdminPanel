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
  banner_type: {
    type: "select",
    required: false,
    title: "Banner Type",
    inputType: "text",
    options: [
      { label: "Image (Slider)", value: "image" },
      { label: "Video (Hero)", value: "video" },
      { label: "Gallery", value: "gallery" },
      { label: "YouTube Video", value: "youtube" },
    ],
  },
  title: {
    type: "string",
    required: false,
    title: "Banner Title (Overlay Text)",
    inputType: "text",
  },
  subtitle: {
    type: "string",
    required: false,
    title: "Banner Subtitle (Overlay Text)",
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
  video: {
    type: "video_file",
    required: false,
    title: "Video",
    inputType: "text",
  },
  youtube_url: {
    type: "string",
    required: false,
    title: "YouTube URL",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
  banner_type: "image",
  title: "",
  subtitle: "",
};

export const view_all_table = [
  { name: "Image", value: "image", image: true },
  { name: "Name", value: "name" },
  { name: "Type", value: "banner_type" },
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