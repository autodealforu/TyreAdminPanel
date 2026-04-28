import api from '../../domain/api';
import {
  GET_SIZES_STATED,
  GET_SIZES,
  GET_SIZES_ENDED,
  ADD_SIZE_STATED,
  ADD_SIZE,
  ADD_SIZE_ENDED,
  EDIT_SIZE_STATED,
  EDIT_SIZE,
  EDIT_SIZE_ENDED,
  GET_SIZE_STATED,
  GET_SIZE,
  GET_SIZE_ENDED,
  GET_ALL_SIZES_STATED,
  GET_ALL_SIZES,
  GET_ALL_SIZES_ENDED,
} from '../types/size_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addSize = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SIZE_STATED,
    });
    const { data } = await api.post(`/sizes`, formData);
    dispatch({
      type: ADD_SIZE,
      payload: data,
    });
    dispatch({
      type: ADD_SIZE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SIZE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSizes =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SIZES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/sizes?${query}`);

      dispatch({
        type: GET_SIZES,
        payload: data,
      });
      dispatch({
        type: GET_SIZES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SIZES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSize = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SIZE_STATED,
    });
    const { data } = await api.get(`/sizes/${id}`);

    dispatch({
      type: GET_SIZE,
      payload: data,
    });
    dispatch({
      type: GET_SIZE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SIZE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSize = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SIZE_STATED,
    });
    const { data } = await api.put(`/sizes/${id}`, formData);
    dispatch({
      type: EDIT_SIZE,
      payload: data,
    });
    dispatch({
      type: EDIT_SIZE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SIZE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSize = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/sizes/${id}`);
    dispatch(setAlert('Size Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSizes =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SIZES_STATED,
      });
      const { data } = await api.get(`/sizes/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_SIZES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SIZES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SIZES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
