import {
  GET_PRODUCTCATEGORYS_STATED,
  GET_PRODUCTCATEGORYS,
  GET_PRODUCTCATEGORYS_ENDED,
  ADD_PRODUCTCATEGORY_STATED,
  ADD_PRODUCTCATEGORY,
  ADD_PRODUCTCATEGORY_ENDED,
  EDIT_PRODUCTCATEGORY_STATED,
  EDIT_PRODUCTCATEGORY,
  EDIT_PRODUCTCATEGORY_ENDED,
  GET_PRODUCTCATEGORY_STATED,
  GET_PRODUCTCATEGORY,
  GET_PRODUCTCATEGORY_ENDED,
  GET_ALL_PRODUCTCATEGORYS_STATED,
  GET_ALL_PRODUCTCATEGORYS,
  GET_ALL_PRODUCTCATEGORYS_ENDED
} from "../types/productcategory_type";

const initialState = {
  productcategorys_loading: true,
  productcategorys: null,
  page: null,
  pages: null,
  total_productcategorys: 0,

  productcategory: null,
  productcategory_loading: null,

  loading: true,

  productcategory_message: null,
  all_productcategorys: null,
  all_productcategorys_loading: null,
  add_productcategory_loading: true,
  edit_productcategory_loading: true
};

export const productcategory_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTCATEGORYS_STATED:
      return {
        ...state,
        productcategorys: null,
        pages: null,
        page: null,
        total_productcategorys: 0,
        productcategorys_loading: true
      };
    case GET_PRODUCTCATEGORYS:
      return {
        ...state,
        productcategorys: payload.productcategorys,
        pages: payload.pages,
        page: payload.page,
        total_productcategorys: payload.count
      };
    case GET_PRODUCTCATEGORYS_ENDED:
      return {
        ...state,
        productcategorys_loading: false
      };
    case GET_ALL_PRODUCTCATEGORYS_STATED:
      return {
        ...state,
        all_productcategorys_loading: true,
        all_productcategorys: null
      };
    case GET_ALL_PRODUCTCATEGORYS:
      return {
        ...state,
        all_productcategorys: payload
      };
    case GET_ALL_PRODUCTCATEGORYS_ENDED:
      return {
        ...state,
        all_productcategorys_loading: false
      };

    case ADD_PRODUCTCATEGORY_STATED:
      return {
        ...state,
        productcategory_message: null,
        add_productcategory_loading: true
      };
    case ADD_PRODUCTCATEGORY:
      return {
        ...state,
        productcategory_message: payload
      };
    case ADD_PRODUCTCATEGORY_ENDED:
      return {
        ...state,
        add_productcategory_loading: false
      };
    case GET_PRODUCTCATEGORY_STATED:
      return {
        ...state,
        productcategory: null,
        productcategory_loading: true
      };
    case GET_PRODUCTCATEGORY:
      return {
        ...state,
        productcategory: payload
      };
    case GET_PRODUCTCATEGORY_ENDED:
      return {
        ...state,
        productcategory_loading: false
      };
    case EDIT_PRODUCTCATEGORY_STATED:
      return {
        ...state,
        productcategory_message: null,
        edit_productcategory_loading: true
      };
    case EDIT_PRODUCTCATEGORY:
      return {
        ...state,
        productcategory_message: payload
      };
    case EDIT_PRODUCTCATEGORY_ENDED:
      return {
        ...state,
        edit_productcategory_loading: false
      };

    default:
      return state;
  }
};
