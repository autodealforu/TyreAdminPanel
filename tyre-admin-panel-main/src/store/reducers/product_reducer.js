import {
  GET_PRODUCTS_STATED,
  GET_PRODUCTS,
  GET_PRODUCTS_ENDED,
  ADD_PRODUCT_STATED,
  ADD_PRODUCT,
  ADD_PRODUCT_ENDED,
  EDIT_PRODUCT_STATED,
  EDIT_PRODUCT,
  EDIT_PRODUCT_ENDED,
  GET_PRODUCT_STATED,
  GET_PRODUCT,
  GET_PRODUCT_ENDED,
  GET_ALL_PRODUCTS_STATED,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_ENDED,
} from '../types/product_type';

const initialState = {
  products_loading: true,
  products: null,
  page: null,
  pages: null,
  total_products: 0,

  product: null,
  product_loading: null,

  loading: true,

  product_message: null,
  all_products: null,
  all_products_loading: null,
  add_product_loading: false,
  edit_product_loading: false,
};

export const product_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS_STATED:
      return {
        ...state,
        products: null,
        pages: null,
        page: null,
        total_products: 0,
        products_loading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
        total_products: payload.count,
      };
    case GET_PRODUCTS_ENDED:
      return {
        ...state,
        products_loading: false,
      };
    case GET_ALL_PRODUCTS_STATED:
      return {
        ...state,
        all_products_loading: true,
        all_products: null,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        all_products: payload,
      };
    case GET_ALL_PRODUCTS_ENDED:
      return {
        ...state,
        all_products_loading: false,
      };

    case ADD_PRODUCT_STATED:
      return {
        ...state,
        product_message: null,
        add_product_loading: true,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product_message: payload,
      };
    case ADD_PRODUCT_ENDED:
      return {
        ...state,
        add_product_loading: false,
      };
    case GET_PRODUCT_STATED:
      return {
        ...state,
        product: null,
        product_loading: true,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case GET_PRODUCT_ENDED:
      return {
        ...state,
        product_loading: false,
      };
    case EDIT_PRODUCT_STATED:
      return {
        ...state,
        product_message: null,
        edit_product_loading: true,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product_message: payload,
      };
    case EDIT_PRODUCT_ENDED:
      return {
        ...state,
        edit_product_loading: false,
      };

    default:
      return state;
  }
};
