import {
  GET_SUBCATEGORYS_STATED,
  GET_SUBCATEGORYS,
  GET_SUBCATEGORYS_ENDED,
  ADD_SUBCATEGORY_STATED,
  ADD_SUBCATEGORY,
  ADD_SUBCATEGORY_ENDED,
  EDIT_SUBCATEGORY_STATED,
  EDIT_SUBCATEGORY,
  EDIT_SUBCATEGORY_ENDED,
  GET_SUBCATEGORY_STATED,
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_ENDED,
  GET_ALL_SUBCATEGORYS_STATED,
  GET_ALL_SUBCATEGORYS,
  GET_ALL_SUBCATEGORYS_ENDED,
} from '../types/subcategory_type';

const initialState = {
  subcategorys_loading: true,
  subcategorys: null,
  page: null,
  pages: null,
  total_subcategorys: 0,

  subcategory: null,
  subcategory_loading: null,

  loading: true,

  subcategory_message: null,
  all_subcategorys: null,
  all_subcategorys_loading: null,
  add_subcategory_loading: true,
  edit_subcategory_loading: true,
};

export const subcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBCATEGORYS_STATED:
      return {
        ...state,
        subcategorys: null,
        pages: null,
        page: null,
        total_subcategorys: 0,
        subcategorys_loading: true,
      };
    case GET_SUBCATEGORYS:
      return {
        ...state,
        subcategorys: payload.subcategorys,
        pages: payload.pages,
        page: payload.page,
        total_subcategorys: payload.count,
      };
    case GET_SUBCATEGORYS_ENDED:
      return {
        ...state,
        subcategorys_loading: false,
      };
    case GET_ALL_SUBCATEGORYS_STATED:
      return {
        ...state,
        all_subcategorys_loading: true,
        all_subcategorys: null,
      };
    case GET_ALL_SUBCATEGORYS:
      return {
        ...state,
        all_subcategorys: payload,
      };
    case GET_ALL_SUBCATEGORYS_ENDED:
      return {
        ...state,
        all_subcategorys_loading: false,
      };

    case ADD_SUBCATEGORY_STATED:
      return {
        ...state,
        subcategory_message: null,
        add_subcategory_loading: true,
      };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        subcategory_message: payload,
      };
    case ADD_SUBCATEGORY_ENDED:
      return {
        ...state,
        add_subcategory_loading: false,
      };
    case GET_SUBCATEGORY_STATED:
      return {
        ...state,
        subcategory: null,
        subcategory_loading: true,
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        subcategory: payload,
      };
    case GET_SUBCATEGORY_ENDED:
      return {
        ...state,
        subcategory_loading: false,
      };
    case EDIT_SUBCATEGORY_STATED:
      return {
        ...state,
        subcategory_message: null,
        edit_subcategory_loading: true,
      };
    case EDIT_SUBCATEGORY:
      return {
        ...state,
        subcategory_message: payload,
      };
    case EDIT_SUBCATEGORY_ENDED:
      return {
        ...state,
        edit_subcategory_loading: false,
      };

    default:
      return state;
  }
};
