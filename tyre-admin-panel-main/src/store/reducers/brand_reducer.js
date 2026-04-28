import {
  GET_BRANDS_STATED,
  GET_BRANDS,
  GET_BRANDS_ENDED,
  ADD_BRAND_STATED,
  ADD_BRAND,
  ADD_BRAND_ENDED,
  EDIT_BRAND_STATED,
  EDIT_BRAND,
  EDIT_BRAND_ENDED,
  GET_BRAND_STATED,
  GET_BRAND,
  GET_BRAND_ENDED,
  GET_ALL_BRANDS_STATED,
  GET_ALL_BRANDS,
  GET_ALL_BRANDS_ENDED,
} from '../types/brand_type';

const initialState = {
  brands_loading: true,
  brands: null,
  page: null,
  pages: null,
  total_brands: 0,

  brand: null,
  brand_loading: null,

  loading: true,

  brand_message: null,
  all_brands: null,
  all_brands_loading: null,
  add_brand_loading: true,
  edit_brand_loading: true,
};

export const brand_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BRANDS_STATED:
      return {
        ...state,
        brands: null,
        pages: null,
        page: null,
        total_brands: 0,
        brands_loading: true,
      };
    case GET_BRANDS:
      return {
        ...state,
        brands: payload.brands,
        pages: payload.pages,
        page: payload.page,
        total_brands: payload.count,
      };
    case GET_BRANDS_ENDED:
      return {
        ...state,
        brands_loading: false,
      };
    case GET_ALL_BRANDS_STATED:
      return {
        ...state,
        all_brands_loading: true,
        all_brands: null,
      };
    case GET_ALL_BRANDS:
      return {
        ...state,
        all_brands: payload,
      };
    case GET_ALL_BRANDS_ENDED:
      return {
        ...state,
        all_brands_loading: false,
      };

    case ADD_BRAND_STATED:
      return {
        ...state,
        brand_message: null,
        add_brand_loading: true,
      };
    case ADD_BRAND:
      return {
        ...state,
        brand_message: payload,
      };
    case ADD_BRAND_ENDED:
      return {
        ...state,
        add_brand_loading: false,
      };
    case GET_BRAND_STATED:
      return {
        ...state,
        brand: null,
        brand_loading: true,
      };
    case GET_BRAND:
      return {
        ...state,
        brand: payload,
      };
    case GET_BRAND_ENDED:
      return {
        ...state,
        brand_loading: false,
      };
    case EDIT_BRAND_STATED:
      return {
        ...state,
        brand_message: null,
        edit_brand_loading: true,
      };
    case EDIT_BRAND:
      return {
        ...state,
        brand_message: payload,
      };
    case EDIT_BRAND_ENDED:
      return {
        ...state,
        edit_brand_loading: false,
      };

    default:
      return state;
  }
};
