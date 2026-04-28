import api from '../../domain/api';
import {
  GET_BULKS_STATED,
  GET_BULKS,
  GET_BULKS_ENDED,
  ADD_BULK_STATED,
  ADD_BULK,
  ADD_BULK_ENDED,
  EDIT_BULK_STATED,
  EDIT_BULK,
  EDIT_BULK_ENDED,
  GET_BULK_STATED,
  GET_BULK,
  GET_BULK_ENDED,
  GET_ALL_BULKS_STATED,
  GET_ALL_BULKS,
  GET_ALL_BULKS_ENDED,
} from '../types/bulk_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addBulk = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BULK_STATED,
    });
    const { data } = await api.post(`/bulks`, formData);
    dispatch({
      type: ADD_BULK,
      payload: data,
    });
    dispatch({
      type: ADD_BULK_ENDED,
    });
    dispatch(setAlert('Product Uploaded Successfully', 'success'));
    window.location.href = '/products';
  } catch (error) {
    dispatch({
      type: ADD_BULK_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getBulks =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_BULKS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/bulks?${query}`);

      dispatch({
        type: GET_BULKS,
        payload: data,
      });
      dispatch({
        type: GET_BULKS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_BULKS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getBulk = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BULK_STATED,
    });
    const { data } = await api.get(`/bulks/${id}`);

    dispatch({
      type: GET_BULK,
      payload: data,
    });
    dispatch({
      type: GET_BULK_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_BULK_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editBulk = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_BULK_STATED,
    });
    const { data } = await api.put(`/bulks/${id}`, formData);
    dispatch({
      type: EDIT_BULK,
      payload: data,
    });
    dispatch({
      type: EDIT_BULK_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_BULK_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteBulk = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/bulks/${id}`);
    dispatch(setAlert('Bulk Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllBulks =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_BULKS_STATED,
      });
      const { data } = await api.get(`/bulks/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_BULKS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_BULKS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_BULKS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
