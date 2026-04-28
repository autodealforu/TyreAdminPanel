import api from '../../utils/api';
import { handleError } from '../../utils/handleError';
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
        queryString += `&category=${searchParams.category}`;
      }
      if (searchParams.vendor) {
        queryString += `&vendor=${searchParams.vendor}`;
      }
      if (searchParams.minPrice) {
        queryString += `&minPrice=${searchParams.minPrice}`;
      }
      if (searchParams.maxPrice) {
        queryString += `&maxPrice=${searchParams.maxPrice}`;
      }

      // Handle complex search parameters from SidebarFilter
      if (searchParams.search) {
        // If search is an object (from SidebarFilter), iterate through its properties
        if (typeof searchParams.search === 'object') {
          Object.keys(searchParams.search).forEach((key) => {
            if (searchParams.search[key]) {
              queryString += `&search[${key}]=${encodeURIComponent(
                searchParams.search[key]
              )}`;
            }
          });
        } else {
          // If search is a string, add it directly
          queryString += `&search=${encodeURIComponent(searchParams.search)}`;
        }
      }

      // Handle conditional search parameters (for ranges, dates, etc.)
      if (searchParams.conditional) {
        if (typeof searchParams.conditional === 'object') {
          Object.keys(searchParams.conditional).forEach((key) => {
            if (
              searchParams.conditional[key] &&
              typeof searchParams.conditional[key] === 'object'
            ) {
              Object.keys(searchParams.conditional[key]).forEach(
                (condition) => {
                  if (searchParams.conditional[key][condition]) {
                    queryString += `&conditional[${key}][${condition}]=${encodeURIComponent(
                      searchParams.conditional[key][condition]
                    )}`;
                  }
                }
              );
            }
          });
        }
      }

      // Handle any other filter parameters
      Object.keys(searchParams).forEach((key) => {
        if (
          ![
            'category',
            'vendor',
            'minPrice',
            'maxPrice',
            'search',
            'conditional',
            'pageNumber',
          ].includes(key)
        ) {
          if (searchParams[key]) {
            queryString += `&${key}=${encodeURIComponent(searchParams[key])}`;
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
