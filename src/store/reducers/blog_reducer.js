import {
  GET_BLOGS_STATED,
  GET_BLOGS,
  GET_BLOGS_ENDED,
  ADD_BLOG_STATED,
  ADD_BLOG,
  ADD_BLOG_ENDED,
  EDIT_BLOG_STATED,
  EDIT_BLOG,
  EDIT_BLOG_ENDED,
  GET_BLOG_STATED,
  GET_BLOG,
  GET_BLOG_ENDED,
  GET_ALL_BLOGS_STATED,
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_ENDED
} from "../types/blog_type";

const initialState = {
  blogs_loading: true,
  blogs: null,
  page: null,
  pages: null,
  total_blogs: 0,

  blog: null,
  blog_loading: null,

  loading: true,

  blog_message: null,
  all_blogs: null,
  all_blogs_loading: null,
  add_blog_loading: true,
  edit_blog_loading: true
};

export const blog_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS_STATED:
      return {
        ...state,
        blogs: null,
        pages: null,
        page: null,
        total_blogs: 0,
        blogs_loading: true
      };
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload.blogs,
        pages: payload.pages,
        page: payload.page,
        total_blogs: payload.count
      };
    case GET_BLOGS_ENDED:
      return {
        ...state,
        blogs_loading: false
      };
    case GET_ALL_BLOGS_STATED:
      return {
        ...state,
        all_blogs_loading: true,
        all_blogs: null
      };
    case GET_ALL_BLOGS:
      return {
        ...state,
        all_blogs: payload
      };
    case GET_ALL_BLOGS_ENDED:
      return {
        ...state,
        all_blogs_loading: false
      };

    case ADD_BLOG_STATED:
      return {
        ...state,
        blog_message: null,
        add_blog_loading: true
      };
    case ADD_BLOG:
      return {
        ...state,
        blog_message: payload
      };
    case ADD_BLOG_ENDED:
      return {
        ...state,
        add_blog_loading: false
      };
    case GET_BLOG_STATED:
      return {
        ...state,
        blog: null,
        blog_loading: true
      };
    case GET_BLOG:
      return {
        ...state,
        blog: payload
      };
    case GET_BLOG_ENDED:
      return {
        ...state,
        blog_loading: false
      };
    case EDIT_BLOG_STATED:
      return {
        ...state,
        blog_message: null,
        edit_blog_loading: true
      };
    case EDIT_BLOG:
      return {
        ...state,
        blog_message: payload
      };
    case EDIT_BLOG_ENDED:
      return {
        ...state,
        edit_blog_loading: false
      };

    default:
      return state;
  }
};
