import {
  ADD_UNIFIED_PRODUCT,
  ADD_UNIFIED_PRODUCT_STARTED,
  ADD_UNIFIED_PRODUCT_ENDED,
  GET_UNIFIED_PRODUCTS,
  GET_UNIFIED_PRODUCTS_STARTED,
  GET_UNIFIED_PRODUCTS_ENDED,
  GET_UNIFIED_PRODUCT_BY_ID,
  GET_UNIFIED_PRODUCT_BY_ID_STARTED,
  GET_UNIFIED_PRODUCT_BY_ID_ENDED,
  EDIT_UNIFIED_PRODUCT,
  EDIT_UNIFIED_PRODUCT_STARTED,
  EDIT_UNIFIED_PRODUCT_ENDED,
  DELETE_UNIFIED_PRODUCT,
} from '../types/unified_product_type';

const initialState = {
  unified_products: [],
  unified_product: {},
  total: 0,
  page: 1,
  pages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  
  // Loading states
  add_unified_product_loading: false,
  get_unified_products_loading: false,
  get_unified_product_loading: false,
  edit_unified_product_loading: false,
};

const unified_product_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Add unified product
    case ADD_UNIFIED_PRODUCT_STARTED:
      return {
        ...state,
        add_unified_product_loading: true,
      };

    case ADD_UNIFIED_PRODUCT:
      return {
        ...state,
        unified_products: [payload.data || payload, ...state.unified_products],
        add_unified_product_loading: false,
      };

    case ADD_UNIFIED_PRODUCT_ENDED:
      return {
        ...state,
        add_unified_product_loading: false,
      };

    // Get all unified products
    case GET_UNIFIED_PRODUCTS_STARTED:
      return {
        ...state,
        get_unified_products_loading: true,
      };

    case GET_UNIFIED_PRODUCTS:
      return {
        ...state,
        unified_products: payload.products || [],
        total: payload.count || 0,
        page: payload.page || 1,
        pages: payload.pages || 1,
        hasNextPage: payload.hasNextPage || false,
        hasPrevPage: payload.hasPrevPage || false,
        get_unified_products_loading: false,
      };

    case GET_UNIFIED_PRODUCTS_ENDED:
      return {
        ...state,
        get_unified_products_loading: false,
      };

    // Get single unified product
    case GET_UNIFIED_PRODUCT_BY_ID_STARTED:
      return {
        ...state,
        get_unified_product_loading: true,
      };

    case GET_UNIFIED_PRODUCT_BY_ID:
      return {
        ...state,
        unified_product: payload.data || payload,
        get_unified_product_loading: false,
      };

    case GET_UNIFIED_PRODUCT_BY_ID_ENDED:
      return {
        ...state,
        get_unified_product_loading: false,
      };

    // Edit unified product
    case EDIT_UNIFIED_PRODUCT_STARTED:
      return {
        ...state,
        edit_unified_product_loading: true,
      };

    case EDIT_UNIFIED_PRODUCT:
      return {
        ...state,
        unified_product: payload.data || payload,
        unified_products: state.unified_products.map((product) =>
          product._id === (payload.data || payload)._id ? payload.data || payload : product
        ),
        edit_unified_product_loading: false,
      };

    case EDIT_UNIFIED_PRODUCT_ENDED:
      return {
        ...state,
        edit_unified_product_loading: false,
      };

    // Delete unified product
    case DELETE_UNIFIED_PRODUCT:
      return {
        ...state,
        unified_products: state.unified_products.filter(
          (product) => product._id !== payload
        ),
        total: state.total - 1,
      };

    default:
      return state;
  }
};

export default unified_product_reducer;
