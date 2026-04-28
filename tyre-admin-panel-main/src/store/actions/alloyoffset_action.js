import api from '../../domain/api';
import {
  GET_ALLOYOFFSETS_STATED,
  GET_ALLOYOFFSETS,
  GET_ALLOYOFFSETS_ENDED,
  ADD_ALLOYOFFSET_STATED,
  ADD_ALLOYOFFSET,
  ADD_ALLOYOFFSET_ENDED,
  EDIT_ALLOYOFFSET_STATED,
  EDIT_ALLOYOFFSET,
  EDIT_ALLOYOFFSET_ENDED,
  GET_ALLOYOFFSET_STATED,
  GET_ALLOYOFFSET,
  GET_ALLOYOFFSET_ENDED,
  GET_ALL_ALLOYOFFSETS_STATED,
  GET_ALL_ALLOYOFFSETS,
  GET_ALL_ALLOYOFFSETS_ENDED,
} from '../types/alloyoffset_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyOffset = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ALLOYOFFSET_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.post(`/alloy-offsets`, payload);
    dispatch({ type: ADD_ALLOYOFFSET, payload: data });
    dispatch({ type: ADD_ALLOYOFFSET_ENDED });
  } catch (error) {
    dispatch({ type: ADD_ALLOYOFFSET_ENDED });
    dispatch(handleError(error));
  }
};

export const getAlloyOffsets =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOYOFFSETS_STATED });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const { data } = await api.get(
        `/alloy-offsets?&pageNumber=${pageNumber}&${query}`
      );
      dispatch({ type: GET_ALLOYOFFSETS, payload: data });
      dispatch({ type: GET_ALLOYOFFSETS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALLOYOFFSETS_ENDED });
      dispatch(handleError(error));
    }
  };

export const getAlloyOffset = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLOYOFFSET_STATED });
    const { data } = await api.get(`/alloy-offsets/${id}`);
    dispatch({ type: GET_ALLOYOFFSET, payload: data });
    dispatch({ type: GET_ALLOYOFFSET_ENDED });
  } catch (error) {
    dispatch({ type: GET_ALLOYOFFSET_STATED });
    dispatch(handleError(error));
  }
};

export const editAlloyOffset = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ALLOYOFFSET_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.put(`/alloy-offsets/${id}`, payload);
    dispatch({ type: EDIT_ALLOYOFFSET, payload: data });
    dispatch({ type: EDIT_ALLOYOFFSET_ENDED });
  } catch (error) {
    dispatch({ type: EDIT_ALLOYOFFSET_ENDED });
    dispatch(handleError(error));
  }
};

export const deleteAlloyOffset = (id) => async (dispatch) => {
  try {
    await api.delete(`/alloy-offsets/${id}`);
    dispatch(setAlert('Alloy Offset Deleted Successfully', 'success'));
    return { success: true };
  } catch (error) {
    dispatch(handleError(error));
    return { success: false, error };
  }
};

export const getAllAlloyOffsets =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ALLOYOFFSETS_STATED });
      const { data } = await api.get(
        `/alloy-offsets/all?term=${term}&value=${value}`
      );
      dispatch({ type: GET_ALL_ALLOYOFFSETS, payload: data });
      dispatch({ type: GET_ALL_ALLOYOFFSETS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALL_ALLOYOFFSETS_ENDED });
      dispatch(handleError(error));
    }
  };
