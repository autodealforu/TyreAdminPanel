import api from '../../domain/api';
import {
  GET_SUBSUBCATEGORYS_STATED,
  GET_SUBSUBCATEGORYS,
  GET_SUBSUBCATEGORYS_ENDED,
  ADD_SUBSUBCATEGORY_STATED,
  ADD_SUBSUBCATEGORY,
  ADD_SUBSUBCATEGORY_ENDED,
  EDIT_SUBSUBCATEGORY_STATED,
  EDIT_SUBSUBCATEGORY,
  EDIT_SUBSUBCATEGORY_ENDED,
  GET_SUBSUBCATEGORY_STATED,
  GET_SUBSUBCATEGORY,
  GET_SUBSUBCATEGORY_ENDED,
  GET_ALL_SUBSUBCATEGORYS_STATED,
  GET_ALL_SUBSUBCATEGORYS,
  GET_ALL_SUBSUBCATEGORYS_ENDED,
} from '../types/subsubcategory_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addSubSubCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SUBSUBCATEGORY_STATED,
    });
    const { data } = await api.post(`/subsubcategorys`, formData);
    dispatch({
      type: ADD_SUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_SUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSubSubCategorys =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SUBSUBCATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/subsubcategorys?&${query}`);

      dispatch({
        type: GET_SUBSUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_SUBSUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SUBSUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSubSubCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUBSUBCATEGORY_STATED,
    });
    const { data } = await api.get(`/subsubcategorys/${id}`);

    dispatch({
      type: GET_SUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_SUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SUBSUBCATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSubSubCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SUBSUBCATEGORY_STATED,
    });
    const { data } = await api.put(`/subsubcategorys/${id}`, formData);
    dispatch({
      type: EDIT_SUBSUBCATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_SUBSUBCATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SUBSUBCATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSubSubCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/subsubcategorys/${id}`);
    dispatch(setAlert('SubSubCategory Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSubSubCategorys =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SUBSUBCATEGORYS_STATED,
      });
      const { data } = await api.get(
        `/subsubcategorys/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_SUBSUBCATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SUBSUBCATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SUBSUBCATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
