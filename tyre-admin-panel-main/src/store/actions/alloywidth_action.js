import api from '../../domain/api';
import {
  GET_ALLOYWIDTHS_STATED,
  GET_ALLOYWIDTHS,
  GET_ALLOYWIDTHS_ENDED,
  ADD_ALLOYWIDTH_STATED,
  ADD_ALLOYWIDTH,
  ADD_ALLOYWIDTH_ENDED,
  EDIT_ALLOYWIDTH_STATED,
  EDIT_ALLOYWIDTH,
  EDIT_ALLOYWIDTH_ENDED,
  GET_ALLOYWIDTH_STATED,
  GET_ALLOYWIDTH,
  GET_ALLOYWIDTH_ENDED,
  GET_ALL_ALLOYWIDTHS_STATED,
  GET_ALL_ALLOYWIDTHS,
  GET_ALL_ALLOYWIDTHS_ENDED,
} from '../types/alloywidth_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyWidth = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ALLOYWIDTH_STATED });
    const payload = {
      name: formData?.name?.trim(),
      width_type: formData?.width_type?.trim(),
    };
    const { data } = await api.post(`/alloy-widths`, payload);
    dispatch({ type: ADD_ALLOYWIDTH, payload: data });
    dispatch({ type: ADD_ALLOYWIDTH_ENDED });
  } catch (error) {
    dispatch({ type: ADD_ALLOYWIDTH_ENDED });
    dispatch(handleError(error));
  }
};

export const getAlloyWidths =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOYWIDTHS_STATED });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const { data } = await api.get(
        `/alloy-widths?&pageNumber=${pageNumber}&${query}`
      );
      dispatch({ type: GET_ALLOYWIDTHS, payload: data });
      dispatch({ type: GET_ALLOYWIDTHS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALLOYWIDTHS_ENDED });
      dispatch(handleError(error));
    }
  };

export const getAlloyWidth = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLOYWIDTH_STATED });
    const { data } = await api.get(`/alloy-widths/${id}`);
    dispatch({ type: GET_ALLOYWIDTH, payload: data });
    dispatch({ type: GET_ALLOYWIDTH_ENDED });
  } catch (error) {
    dispatch({ type: GET_ALLOYWIDTH_STATED });
    dispatch(handleError(error));
  }
};

export const editAlloyWidth = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ALLOYWIDTH_STATED });
    const payload = {
      name: formData?.name?.trim(),
      width_type: formData?.width_type?.trim(),
    };
    const { data } = await api.put(`/alloy-widths/${id}`, payload);
    dispatch({ type: EDIT_ALLOYWIDTH, payload: data });
    dispatch({ type: EDIT_ALLOYWIDTH_ENDED });
  } catch (error) {
    dispatch({ type: EDIT_ALLOYWIDTH_ENDED });
    dispatch(handleError(error));
  }
};

export const deleteAlloyWidth = (id) => async (dispatch) => {
  try {
    await api.delete(`/alloy-widths/${id}`);
    dispatch(setAlert('Alloy Width Deleted Successfully', 'success'));
    return { success: true };
  } catch (error) {
    dispatch(handleError(error));
    return { success: false, error };
  }
};

export const getAllAlloyWidths =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ALLOYWIDTHS_STATED });
      const { data } = await api.get(
        `/alloy-widths/all?term=${term}&value=${value}`
      );
      dispatch({ type: GET_ALL_ALLOYWIDTHS, payload: data });
      dispatch({ type: GET_ALL_ALLOYWIDTHS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALL_ALLOYWIDTHS_ENDED });
      dispatch(handleError(error));
    }
  };
