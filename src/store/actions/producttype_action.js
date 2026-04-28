import api from '../../domain/api';
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
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addProductType = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PRODUCTTYPE_STATED,
    });
    const { data } = await api.post(`/product-types`, formData);
    dispatch({
      type: ADD_PRODUCTTYPE,
      payload: data,
    });
    dispatch({
      type: ADD_PRODUCTTYPE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCTTYPE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getProductTypes =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTTYPES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/product-types?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_PRODUCTTYPES,
        payload: data,
      });
      dispatch({
        type: GET_PRODUCTTYPES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTTYPES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getProductType = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTTYPE_STATED,
    });
    const { data } = await api.get(`/product-types/${id}`);

    dispatch({
      type: GET_PRODUCTTYPE,
      payload: data,
    });
    dispatch({
      type: GET_PRODUCTTYPE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTTYPE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editProductType = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCTTYPE_STATED,
    });
    const { data } = await api.put(`/product-types/${id}`, formData);
    dispatch({
      type: EDIT_PRODUCTTYPE,
      payload: data,
    });
    dispatch({
      type: EDIT_PRODUCTTYPE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCTTYPE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteProductType = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/product-types/${id}`);
    dispatch(setAlert('ProductType Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllProductTypes =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PRODUCTTYPES_STATED,
      });
      const { data } = await api.get(
        `/product-types/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_PRODUCTTYPES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PRODUCTTYPES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTTYPES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
