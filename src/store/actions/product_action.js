import api from '../../domain/api';
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
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addProduct = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PRODUCT_STATED,
    });
    const { data } = await api.post(`/products`, formData);
    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
    dispatch({
      type: ADD_PRODUCT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getProducts =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/products/products?&${query}`);

      dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
      dispatch({
        type: GET_PRODUCTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_STATED,
    });
    const { data } = await api.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
    dispatch({
      type: GET_PRODUCT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCT_STATED,
    });
    const { data } = await api.put(`/products/${id}`, formData);
    dispatch({
      type: EDIT_PRODUCT,
      payload: data,
    });
    dispatch({
      type: EDIT_PRODUCT_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/products/${id}`);
    dispatch(setAlert('Product Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBulkProduct = (products) => async (dispatch) => {
  try {
    const { data } = await api.post(`/products/bulk-delete`, {
      products: products,
    });
    dispatch(getProducts({}));
    dispatch(setAlert('Product Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllProducts =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PRODUCTS_STATED,
      });
      const { data } = await api.get(
        `/products/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PRODUCTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
