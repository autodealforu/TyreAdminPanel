export const PAGE_TITLE = "Frames";
export const PAGE_SINGLE_TITLE = "Frame";
export const LINK_URL = "frames";
export const inputFields = {
    title: {
        type: "string",
        required: true,
        title: "Name",
        inputType: "text",
        slug: true,
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
