import api from '../../domain/api';
import {
  GET_TYREWIDTHS_STATED,
  GET_TYREWIDTHS,
  GET_TYREWIDTHS_ENDED,
  ADD_TYREWIDTH_STATED,
  ADD_TYREWIDTH,
  ADD_TYREWIDTH_ENDED,
  EDIT_TYREWIDTH_STATED,
  EDIT_TYREWIDTH,
  EDIT_TYREWIDTH_ENDED,
  GET_TYREWIDTH_STATED,
  GET_TYREWIDTH,
  GET_TYREWIDTH_ENDED,
  GET_ALL_TYREWIDTHS_STATED,
  GET_ALL_TYREWIDTHS,
  GET_ALL_TYREWIDTHS_ENDED,
} from '../types/tyrewidth_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addTyreWidth = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TYREWIDTH_STATED,
    });
    const { data } = await api.post(`/tyre-widths`, formData);
    dispatch({
      type: ADD_TYREWIDTH,
      payload: data,
    });
    dispatch({
      type: ADD_TYREWIDTH_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_TYREWIDTH_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getTyreWidths =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TYREWIDTHS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/tyre-widths?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_TYREWIDTHS,
        payload: data,
      });
      dispatch({
        type: GET_TYREWIDTHS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_TYREWIDTHS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getTyreWidth = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TYREWIDTH_STATED,
    });
    const { data } = await api.get(`/tyre-widths/${id}`);

    dispatch({
      type: GET_TYREWIDTH,
      payload: data,
    });
    dispatch({
      type: GET_TYREWIDTH_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_TYREWIDTH_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editTyreWidth = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TYREWIDTH_STATED,
    });
    const { data } = await api.put(`/tyre-widths/${id}`, formData);
    dispatch({
      type: EDIT_TYREWIDTH,
      payload: data,
    });
    dispatch({
      type: EDIT_TYREWIDTH_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TYREWIDTH_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteTyreWidth = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/tyre-widths/${id}`);
    dispatch(setAlert('TyreWidth Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllTyreWidths =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TYREWIDTHS_STATED,
      });
      const { data } = await api.get(
        `/tyre-widths/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_TYREWIDTHS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TYREWIDTHS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TYREWIDTHS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
