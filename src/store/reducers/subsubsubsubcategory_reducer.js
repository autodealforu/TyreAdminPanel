import {
  GET_SUBSUBSUBSUBCATEGORYS_STATED,
  GET_SUBSUBSUBSUBCATEGORYS,
  GET_SUBSUBSUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBSUBSUBCATEGORY_STATED,
  ADD_SUBSUBSUBSUBCATEGORY,
  ADD_SUBSUBSUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBSUBSUBCATEGORY_STATED,
  EDIT_SUBSUBSUBSUBCATEGORY,
  EDIT_SUBSUBSUBSUBCATEGORY_ENDED,
  GET_SUBSUBSUBSUBCATEGORY_STATED,
  GET_SUBSUBSUBSUBCATEGORY,
  GET_SUBSUBSUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBSUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBSUBSUBCATEGORYS,
  GET_ALL_SUBSUBSUBSUBCATEGORYS_ENDED
} from "../types/subsubsubsubcategory_type";

const initialState = {
  subsubsubsubcategorys_loading: true,
  subsubsubsubcategorys: null,
  page: null,
  pages: null,
  total_subsubsubsubcategorys: 0,

  subsubsubsubcategory: null,
  subsubsubsubcategory_loading: null,

  loading: true,

  subsubsubsubcategory_message: null,
  all_subsubsubsubcategorys: null,
  all_subsubsubsubcategorys_loading: null,
  add_subsubsubsubcategory_loading: true,
  edit_subsubsubsubcategory_loading: true
};

export const subsubsubsubcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBSUBSUBSUBCATEGORYS_STATED:
      return {
        ...state,
        subsubsubsubcategorys: null,
        pages: null,
        page: null,
        total_subsubsubsubcategorys: 0,
        subsubsubsubcategorys_loading: true
      };
    case GET_SUBSUBSUBSUBCATEGORYS:
      return {
        ...state,
        subsubsubsubcategorys: payload.subsubsubsubcategorys,
        pages: payload.pages,
        page: payload.page,
        total_subsubsubsubcategorys: payload.total_subsubsubsubcategorys
      };
    case GET_SUBSUBSUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        subsubsubsubcategorys_loading: false
      };
    case GET_ALL_SUBSUBSUBSUBCATEGORYS_STATED:
      return {
        ...state,
        all_subsubsubsubcategorys_loading: true,
        all_subsubsubsubcategorys: null
      };
    case GET_ALL_SUBSUBSUBSUBCATEGORYS:
      return {
        ...state,
        all_subsubsubsubcategorys: payload
      };
    case GET_ALL_SUBSUBSUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        all_subsubsubsubcategorys_loading: false
      };

    case ADD_SUBSUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubsubcategory_message: null,
        add_subsubsubsubcategory_loading: true
      };
    case ADD_SUBSUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubsubcategory_message: payload
      };
    case ADD_SUBSUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        add_subsubsubsubcategory_loading: false
      };
    case GET_SUBSUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubsubcategory: null,
        subsubsubsubcategory_loading: true
      };
    case GET_SUBSUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubsubcategory: payload
      };
    case GET_SUBSUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        subsubsubsubcategory_loading: false
      };
    case EDIT_SUBSUBSUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubsubsubcategory_message: null,
        edit_subsubsubsubcategory_loading: true
      };
    case EDIT_SUBSUBSUBSUBCATEGORY:
      return {
        ...state,
        subsubsubsubcategory_message: payload
      };
    case EDIT_SUBSUBSUBSUBCATEGORY_ENDED:
      return {
        ...state,
        edit_subsubsubsubcategory_loading: false
      };

    default:
      return state;
  }
};
