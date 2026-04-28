import api from '../../domain/api';
import {
  GET_SUBCATEGORYS_STATED,
  GET_SUBCATEGORYS,
  GET_SUBCATEGORYS_ENDED,
  ADD_SUBCATEGORY_STATED,
  ADD_SUBCATEGORY,
  ADD_SUBCATEGORY_ENDED,
  EDIT_SUBCATEGORY_STATED,
  EDIT_SUBCATEGORY,
  EDIT_SUBCATEGORY_ENDED,
  GET_SUBCATEGORY_STATED,
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_ENDED,
  GET_ALL_SUBCATEGORYS_STATED,
  GET_ALL_SUBCATEGORYS,
  GET_ALL_SUBCATEGORYS_ENDED,
} from '../types/subcategory_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addSubCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SUBCATEGORY_STATED,
    });
    const { data } = await api.post(`/subcategorys`, formData);
    dispatch({
      type: ADD_SUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_SUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSubCategorys =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SUBCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/subcategorys?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_SUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_SUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBCATEGORY_STATED,
    });
    const { data } = await api.get(`/subcategorys/${id}`);

    dispatch({
      type: GET_SUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_SUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSubCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SUBCATEGORY_STATED,
    });
    const { data } = await api.put(`/subcategorys/${id}`, formData);
    dispatch({
      type: EDIT_SUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_SUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/subcategorys/${id}`);
    dispatch(setAlert('SubCategory Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSubCategorys =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SUBCATEGORYS_STATED,
      });
      const { data } = await api.get(
        `/subcategorys/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_SUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
