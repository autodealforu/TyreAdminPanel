import {
  GET_PRODUCTTYPES_STATED,
  GET_PRODUCTTYPES,
  GET_PRODUCTTYPES_ENDED,
  ADD_PRODUCTTYPE_STATED,
  ADD_PRODUCTTYPE,
  ADD_PRODUCTTYPE_ENDED,
  EDIT_PRODUCTTYPE_STATED,
  EDIT_PRODUCTTYPE,
  EDIT_PRODUCTTYPE_ENDED,
  GET_PRODUCTTYPE_STATED,
  GET_PRODUCTTYPE,
  GET_PRODUCTTYPE_ENDED,
  GET_ALL_PRODUCTTYPES_STATED,
  GET_ALL_PRODUCTTYPES,
  GET_ALL_PRODUCTTYPES_ENDED,
} from '../types/producttype_type';

const initialState = {
  producttypes_loading: true,
  producttypes: null,
  page: null,
  pages: null,
  total_producttypes: 0,

  producttype: null,
  producttype_loading: null,

  loading: true,

  producttype_message: null,
  all_producttypes: null,
  all_producttypes_loading: null,
  add_producttype_loading: true,
  edit_producttype_loading: true,
};

export const producttype_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTTYPES_STATED:
      return {
        ...state,
        producttypes: null,
        pages: null,
        page: null,
        total_producttypes: 0,
        producttypes_loading: true,
      };
    case GET_PRODUCTTYPES:
      return {
        ...state,
        producttypes: payload.productTypes,
        pages: payload.pages,
        page: payload.page,
        total_producttypes: payload.count,
      };
    case GET_PRODUCTTYPES_ENDED:
      return {
        ...state,
        producttypes_loading: false,
      };
    case GET_ALL_PRODUCTTYPES_STATED:
      return {
        ...state,
        all_producttypes_loading: true,
        all_producttypes: null,
      };
    case GET_ALL_PRODUCTTYPES:
      return {
        ...state,
        all_producttypes: payload,
      };
    case GET_ALL_PRODUCTTYPES_ENDED:
      return {
        ...state,
        all_producttypes_loading: false,
      };

    case ADD_PRODUCTTYPE_STATED:
      return {
        ...state,
        producttype_message: null,
        add_producttype_loading: true,
      };
    case ADD_PRODUCTTYPE:
      return {
        ...state,
        producttype_message: payload,
      };
    case ADD_PRODUCTTYPE_ENDED:
      return {
        ...state,
        add_producttype_loading: false,
      };
    case GET_PRODUCTTYPE_STATED:
      return {
        ...state,
        producttype: null,
        producttype_loading: true,
      };
    case GET_PRODUCTTYPE:
      return {
        ...state,
        producttype: payload,
      };
    case GET_PRODUCTTYPE_ENDED:
      return {
        ...state,
        producttype_loading: false,
      };
    case EDIT_PRODUCTTYPE_STATED:
      return {
        ...state,
        producttype_message: null,
        edit_producttype_loading: true,
      };
    case EDIT_PRODUCTTYPE:
      return {
        ...state,
        producttype_message: payload,
      };
    case EDIT_PRODUCTTYPE_ENDED:
      return {
        ...state,
        edit_producttype_loading: false,
      };

    default:
      return state;
  }
};
