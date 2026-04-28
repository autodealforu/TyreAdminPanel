import {
  GET_CATEGORYS_STATED,
  GET_CATEGORYS,
  GET_CATEGORYS_ENDED,
  ADD_CATEGORY_STATED,
  ADD_CATEGORY,
  ADD_CATEGORY_ENDED,
  EDIT_CATEGORY_STATED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ENDED,
  GET_CATEGORY_STATED,
  GET_CATEGORY,
  GET_CATEGORY_ENDED,
  GET_ALL_CATEGORYS_STATED,
  GET_ALL_CATEGORYS,
  GET_ALL_CATEGORYS_ENDED
} from "../types/category_type";

const initialState = {
  categorys_loading: true,
  categorys: null,
  page: null,
  pages: null,
  total_categorys: 0,

  category: null,
  category_loading: null,

  loading: true,

  category_message: null,
  all_categorys: null,
  all_categorys_loading: null,
  add_category_loading: true,
  edit_category_loading: true
};

export const category_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORYS_STATED:
      return {
        ...state,
        categorys: null,
        pages: null,
        page: null,
        total_categorys: 0,
        categorys_loading: true
      };
    case GET_CATEGORYS:
      return {
        ...state,
        categorys: payload.categorys,
        pages: payload.pages,
        page: payload.page,
        total_categorys: payload.count
      };
    case GET_CATEGORYS_ENDED:
      return {
        ...state,
        categorys_loading: false
      };
    case GET_ALL_CATEGORYS_STATED:
      return {
        ...state,
        all_categorys_loading: true,
        all_categorys: null
      };
    case GET_ALL_CATEGORYS:
      return {
        ...state,
        all_categorys: payload
      };
    case GET_ALL_CATEGORYS_ENDED:
      return {
        ...state,
        all_categorys_loading: false
      };

    case ADD_CATEGORY_STATED:
      return {
        ...state,
        category_message: null,
        add_category_loading: true
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category_message: payload
      };
    case ADD_CATEGORY_ENDED:
      return {
        ...state,
        add_category_loading: false
      };
    case GET_CATEGORY_STATED:
      return {
        ...state,
        category: null,
        category_loading: true
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload
      };
    case GET_CATEGORY_ENDED:
      return {
        ...state,
        category_loading: false
      };
    case EDIT_CATEGORY_STATED:
      return {
        ...state,
        category_message: null,
        edit_category_loading: true
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        category_message: payload
      };
    case EDIT_CATEGORY_ENDED:
      return {
        ...state,
        edit_category_loading: false
      };

    default:
      return state;
  }
};
