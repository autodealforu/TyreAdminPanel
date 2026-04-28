import {
  GET_SUBSUBCATEGORYS_STATED,
  GET_SUBSUBCATEGORYS,
  GET_SUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBCATEGORY_STATED,
  ADD_SUBSUBCATEGORY,
  ADD_SUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBCATEGORY_STATED,
  EDIT_SUBSUBCATEGORY,
  EDIT_SUBSUBCATEGORY_ENDED,
  GET_SUBSUBCATEGORY_STATED,
  GET_SUBSUBCATEGORY,
  GET_SUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBCATEGORYS,
  GET_ALL_SUBSUBCATEGORYS_ENDED,
} from '../types/subsubcategory_type';

const initialState = {
  subsubcategorys_loading: true,
  subsubcategorys: null,
  page: null,
  pages: null,
  total_subsubcategorys: 0,

  subsubcategory: null,
  subsubcategory_loading: null,

  loading: true,

  subsubcategory_message: null,
  all_subsubcategorys: null,
  all_subsubcategorys_loading: null,
  add_subsubcategory_loading: true,
  edit_subsubcategory_loading: true,
};

export const subsubcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBSUBCATEGORYS_STATED:
      return {
        ...state,
        subsubcategorys: null,
        pages: null,
        page: null,
        total_subsubcategorys: 0,
        subsubcategorys_loading: true,
      };
    case GET_SUBSUBCATEGORYS:
      return {
        ...state,
        subsubcategorys: payload.subsubcategorys,
        pages: payload.pages,
        page: payload.page,
        total_subsubcategorys: payload.count,
      };
    case GET_SUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        subsubcategorys_loading: false,
      };
    case GET_ALL_SUBSUBCATEGORYS_STATED:
      return {
        ...state,
        all_subsubcategorys_loading: true,
        all_subsubcategorys: null,
      };
    case GET_ALL_SUBSUBCATEGORYS:
      return {
        ...state,
        all_subsubcategorys: payload,
      };
    case GET_ALL_SUBSUBCATEGORYS_ENDED:
      return {
        ...state,
        all_subsubcategorys_loading: false,
      };

    case ADD_SUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubcategory_message: null,
        add_subsubcategory_loading: true,
      };
    case ADD_SUBSUBCATEGORY:
      return {
        ...state,
        subsubcategory_message: payload,
      };
    case ADD_SUBSUBCATEGORY_ENDED:
      return {
        ...state,
        add_subsubcategory_loading: false,
      };
    case GET_SUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubcategory: null,
        subsubcategory_loading: true,
      };
    case GET_SUBSUBCATEGORY:
      return {
        ...state,
        subsubcategory: payload,
      };
    case GET_SUBSUBCATEGORY_ENDED:
      return {
        ...state,
        subsubcategory_loading: false,
      };
    case EDIT_SUBSUBCATEGORY_STATED:
      return {
        ...state,
        subsubcategory_message: null,
        edit_subsubcategory_loading: true,
      };
    case EDIT_SUBSUBCATEGORY:
      return {
        ...state,
        subsubcategory_message: payload,
      };
    case EDIT_SUBSUBCATEGORY_ENDED:
      return {
        ...state,
        edit_subsubcategory_loading: false,
      };

    default:
      return state;
  }
};
