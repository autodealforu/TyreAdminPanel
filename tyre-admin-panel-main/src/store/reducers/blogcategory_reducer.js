import {
  GET_BLOGCATEGORYS_STATED,
  GET_BLOGCATEGORYS,
  GET_BLOGCATEGORYS_ENDED,
  ADD_BLOGCATEGORY_STATED,
  ADD_BLOGCATEGORY,
  ADD_BLOGCATEGORY_ENDED,
  EDIT_BLOGCATEGORY_STATED,
  EDIT_BLOGCATEGORY,
  EDIT_BLOGCATEGORY_ENDED,
  GET_BLOGCATEGORY_STATED,
  GET_BLOGCATEGORY,
  GET_BLOGCATEGORY_ENDED,
  GET_ALL_BLOGCATEGORYS_STATED,
  GET_ALL_BLOGCATEGORYS,
  GET_ALL_BLOGCATEGORYS_ENDED
} from "../types/blogcategory_type";

const initialState = {
  blogcategorys_loading: true,
  blogcategorys: null,
  page: null,
  pages: null,
  total_blogcategorys: 0,

  blogcategory: null,
  blogcategory_loading: null,

  loading: true,

  blogcategory_message: null,
  all_blogcategorys: null,
  all_blogcategorys_loading: null,
  add_blogcategory_loading: true,
  edit_blogcategory_loading: true
};

export const blogcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGCATEGORYS_STATED:
      return {
        ...state,
        blogcategorys: null,
        pages: null,
        page: null,
        total_blogcategorys: 0,
        blogcategorys_loading: true
      };
    case GET_BLOGCATEGORYS:
      return {
        ...state,
        blogcategorys: payload.blogcategorys,
        pages: payload.pages,
        page: payload.page,
        total_blogcategorys: payload.count
      };
    case GET_BLOGCATEGORYS_ENDED:
      return {
        ...state,
        blogcategorys_loading: false
      };
    case GET_ALL_BLOGCATEGORYS_STATED:
      return {
        ...state,
        all_blogcategorys_loading: true,
        all_blogcategorys: null
      };
    case GET_ALL_BLOGCATEGORYS:
      return {
        ...state,
        all_blogcategorys: payload
      };
    case GET_ALL_BLOGCATEGORYS_ENDED:
      return {
        ...state,
        all_blogcategorys_loading: false
      };

    case ADD_BLOGCATEGORY_STATED:
      return {
        ...state,
        blogcategory_message: null,
        add_blogcategory_loading: true
      };
    case ADD_BLOGCATEGORY:
      return {
        ...state,
        blogcategory_message: payload
      };
    case ADD_BLOGCATEGORY_ENDED:
      return {
        ...state,
        add_blogcategory_loading: false
      };
    case GET_BLOGCATEGORY_STATED:
      return {
        ...state,
        blogcategory: null,
        blogcategory_loading: true
      };
    case GET_BLOGCATEGORY:
      return {
        ...state,
        blogcategory: payload
      };
    case GET_BLOGCATEGORY_ENDED:
      return {
        ...state,
        blogcategory_loading: false
      };
    case EDIT_BLOGCATEGORY_STATED:
      return {
        ...state,
        blogcategory_message: null,
        edit_blogcategory_loading: true
      };
    case EDIT_BLOGCATEGORY:
      return {
        ...state,
        blogcategory_message: payload
      };
    case EDIT_BLOGCATEGORY_ENDED:
      return {
        ...state,
        edit_blogcategory_loading: false
      };

    default:
      return state;
  }
};
