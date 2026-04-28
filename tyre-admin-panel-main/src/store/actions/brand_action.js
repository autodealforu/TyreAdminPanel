import api from '../../domain/api';
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
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addBrand = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BRAND_STATED,
    });
    const { data } = await api.post(`/brands`, formData);
    dispatch({
      type: ADD_BRAND,
      payload: data,
    });
    dispatch({
      type: ADD_BRAND_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_BRAND_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getBrands =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BRANDS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/brands?${query}`);

      dispatch({
        type: GET_BRANDS,
        payload: data,
      });
      dispatch({
        type: GET_BRANDS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_BRANDS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getBrand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BRAND_STATED,
    });
    const { data } = await api.get(`/brands/${id}`);

    dispatch({
      type: GET_BRAND,
      payload: data,
    });
    dispatch({
      type: GET_BRAND_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_BRAND_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editBrand = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BRAND_STATED,
    });
    const { data } = await api.put(`/brands/${id}`, formData);
    dispatch({
      type: EDIT_BRAND,
      payload: data,
    });
    dispatch({
      type: EDIT_BRAND_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BRAND_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBrand = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/brands/${id}`);
    dispatch(setAlert('Brand Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllBrands =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BRANDS_STATED,
      });
      const { data } = await api.get(`/brands/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_BRANDS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_BRANDS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BRANDS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
