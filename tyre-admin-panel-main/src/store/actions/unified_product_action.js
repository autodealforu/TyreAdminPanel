import api from '../../domain/api';
import { handleError } from '../../shared/handleError';
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

// @desc    Add a new unified product
// @route   POST /api/products/unified
// @access  Private
export const addUnifiedProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_UNIFIED_PRODUCT_STARTED });

    const { data } = await api.post('/products/unified', formData);

    dispatch({
      type: ADD_UNIFIED_PRODUCT,
      payload: data,
    });

    dispatch({ type: ADD_UNIFIED_PRODUCT_ENDED });
  } catch (error) {
    dispatch({ type: ADD_UNIFIED_PRODUCT_ENDED });
    handleError(error, dispatch);
  }
};

// @desc    Get all unified products with pagination and filtering
// @route   GET /api/products/unified
// @access  Public
export const getUnifiedProducts =
  (pageNumber = 1, searchParams = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_UNIFIED_PRODUCTS_STARTED });

      let queryString = `?pageNumber=${pageNumber}`;

      // Handle basic search parameters
      if (searchParams.category) {
        queryString += `&category=${encodeURIComponent(searchParams.category)}`;
      }
      if (searchParams.vendor) {
        queryString += `&vendor=${encodeURIComponent(searchParams.vendor)}`;
      }
      if (searchParams.minPrice) {
        queryString += `&minPrice=${encodeURIComponent(searchParams.minPrice)}`;
      }
      if (searchParams.maxPrice) {
        queryString += `&maxPrice=${encodeURIComponent(searchParams.maxPrice)}`;
      }

      // Handle fuzzy or fielded search parameters
      if (searchParams.search) {
        if (typeof searchParams.search === 'object') {
          Object.keys(searchParams.search).forEach((key) => {
            const val = searchParams.search[key];
            if (val !== undefined && val !== null && `${val}`.trim() !== '') {
              queryString += `&search[${key}]=${encodeURIComponent(val)}`;
            }
          });
        } else if (`${searchParams.search}`.trim() !== '') {
          queryString += `&search=${encodeURIComponent(searchParams.search)}`;
        }
      }

      // Handle exact match parameters (used by dropdowns)
      if (searchParams.exact && typeof searchParams.exact === 'object') {
        Object.keys(searchParams.exact).forEach((key) => {
          const val = searchParams.exact[key];
          if (val !== undefined && val !== null && `${val}`.trim() !== '') {
            queryString += `&exact[${key}]=${encodeURIComponent(val)}`;
          }
        });
      }

      // Handle conditional parameters (ranges etc.)
      if (searchParams.conditional && typeof searchParams.conditional === 'object') {
        Object.keys(searchParams.conditional).forEach((field) => {
          const condObj = searchParams.conditional[field];
          if (condObj && typeof condObj === 'object') {
            Object.keys(condObj).forEach((op) => {
              const val = condObj[op];
              if (val !== undefined && val !== null && `${val}`.trim() !== '') {
                queryString += `&conditional[${field}][${op}]=${encodeURIComponent(val)}`;
              }
            });
          }
        });
      }

      // Handle any other top-level filter parameters (fallback)
      Object.keys(searchParams).forEach((key) => {
        if (!['category', 'vendor', 'minPrice', 'maxPrice', 'search', 'exact', 'conditional', 'pageNumber'].includes(key)) {
          const val = searchParams[key];
          if (val !== undefined && val !== null && `${val}`.trim() !== '') {
            queryString += `&${key}=${encodeURIComponent(val)}`;
          }
        }
      });

      const { data } = await api.get(`/products/unified${queryString}`);

      dispatch({
        type: GET_UNIFIED_PRODUCTS,
        payload: data.data || data,
      });

      dispatch({ type: GET_UNIFIED_PRODUCTS_ENDED });
    } catch (error) {
      dispatch({ type: GET_UNIFIED_PRODUCTS_ENDED });
      handleError(error, dispatch);
    }
  };

// @desc    Get products by category
// @route   GET /api/products/unified/category/:category
// @access  Public
export const getUnifiedProductsByCategory =
  (category, pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_UNIFIED_PRODUCTS_STARTED });

      const { data } = await api.get(
        `/products/unified/category/${category}?pageNumber=${pageNumber}`
      );

      dispatch({
        type: GET_UNIFIED_PRODUCTS,
        payload: data.data || data,
      });

      dispatch({ type: GET_UNIFIED_PRODUCTS_ENDED });
    } catch (error) {
      dispatch({ type: GET_UNIFIED_PRODUCTS_ENDED });
      handleError(error, dispatch);
    }
  };

// @desc    Get single unified product by ID
// @route   GET /api/products/unified/:id
// @access  Public
export const getUnifiedProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_UNIFIED_PRODUCT_BY_ID_STARTED });

    const { data } = await api.get(`/products/unified/${id}`);

    dispatch({
      type: GET_UNIFIED_PRODUCT_BY_ID,
      payload: data.data || data,
    });

    dispatch({ type: GET_UNIFIED_PRODUCT_BY_ID_ENDED });
  } catch (error) {
    dispatch({ type: GET_UNIFIED_PRODUCT_BY_ID_ENDED });
    handleError(error, dispatch);
  }
};

// @desc    Edit unified product
// @route   PUT /api/products/unified/:id
// @access  Private
export const editUnifiedProduct =
  (id, formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_UNIFIED_PRODUCT_STARTED });

      const { data } = await api.put(`/products/unified/${id}`, formData);

      dispatch({
        type: EDIT_UNIFIED_PRODUCT,
        payload: data,
      });

      dispatch({ type: EDIT_UNIFIED_PRODUCT_ENDED });
    } catch (error) {
      dispatch({ type: EDIT_UNIFIED_PRODUCT_ENDED });
      handleError(error, dispatch);
    }
  };

// @desc    Delete unified product
// @route   DELETE /api/products/unified/:id
// @access  Private/Admin
export const deleteUnifiedProduct = (id) => async (dispatch) => {
  try {
    await api.delete(`/products/unified/${id}`);

    dispatch({
      type: DELETE_UNIFIED_PRODUCT,
      payload: id,
    });
  } catch (error) {
    handleError(error, dispatch);
  }
};
