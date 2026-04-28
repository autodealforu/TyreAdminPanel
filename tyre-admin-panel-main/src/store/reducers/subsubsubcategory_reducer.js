import {
  GET_SUBSUBSUBCATEGORYS_STATED,
  GET_SUBSUBSUBCATEGORYS,
  GET_SUBSUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBSUBCATEGORY_STATED,
  ADD_SUBSUBSUBCATEGORY,
  ADD_SUBSUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBSUBCATEGORY_STATED,
  EDIT_SUBSUBSUBCATEGORY,
  EDIT_SUBSUBSUBCATEGORY_ENDED,
  GET_SUBSUBSUBCATEGORY_STATED,
  GET_SUBSUBSUBCATEGORY,
  GET_SUBSUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBSUBCATEGORYS,
  GET_ALL_SUBSUBSUBCATEGORYS_ENDED
} from "../types/subsubsubcategory_type";

const initialState = {
  subsubsubcategorys_loading: true,
  subsubsubcategorys: null,
  page: null,
  pages: null,
  total_subsubsubcategorys: 0,

  subsubsubcategory: null,
  subsubsubcategory_loading: null,

  loading: true,

  subsubsubcategory_message: null,
  all_subsubsubcategorys: null,
  all_subsubsubcategorys_loading: null,
  add_subsubsubcategory_loading: true,
  edit_subsubsubcategory_loading: true
};

export const subsubsubcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBSUBSUBCATEGORYS_STATED:
      return {
        ...state,
        subsubsubcategorys: null,
        pages: null,
        page: null,
        total_subsubsubcategorys: 0,
        subsubsubcategorys_loading: true
      };
    case GET_SUBSUBSUBCATEGORYS:
      return {
        ...state,
        subsubsubcategorys: payload.subsubsubcategorys,
        pages: payload.pages,
        page: payload.page,
        total_subsubsubcategorys: payload.total_subsubsubcategorys
      };
    case GET_SUBSUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        subsubsubcategorys_loading: false
      };
    case GET_ALL_SUBSUBSUBCATEGORYS_STATED:
      return {
        ...state,
        all_subsubsubcategorys_loading: true,
        all_subsubsubcategorys: null
      };
    case GET_ALL_SUBSUBSUBCATEGORYS:
      return {
        ...state,
        all_subsubsubcategorys: payload
      };
    case GET_ALL_SUBSUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        all_subsubsubcategorys_loading: false
      };

    case ADD_SUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubcategory_message: null,
        add_subsubsubcategory_loading: true
      };
    case ADD_SUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubcategory_message: payload
      };
    case ADD_SUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        add_subsubsubcategory_loading: false
      };
    case GET_SUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubcategory: null,
        subsubsubcategory_loading: true
      };
    case GET_SUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubcategory: payload
      };
    case GET_SUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        subsubsubcategory_loading: false
      };
    case EDIT_SUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubcategory_message: null,
        edit_subsubsubcategory_loading: true
      };
    case EDIT_SUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubcategory_message: payload
      };
    case EDIT_SUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        edit_subsubsubcategory_loading: false
      };

    default:
      return state;
  }
};
