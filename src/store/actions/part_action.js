import api from '../../domain/api';
import {
  GET_PARTS_STATED,
  GET_PARTS,
  GET_PARTS_ENDED,
  ADD_PART_STATED,
  ADD_PART,
  ADD_PART_ENDED,
  EDIT_PART_STATED,
  EDIT_PART,
  EDIT_PART_ENDED,
  GET_PART_STATED,
  GET_PART,
  GET_PART_ENDED,
  GET_ALL_PARTS_STATED,
  GET_ALL_PARTS,
  GET_ALL_PARTS_ENDED,
} from '../types/part_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addPart = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PART_STATED,
    });
    const { data } = await api.post(`/parts`, formData);
    dispatch({
      type: ADD_PART,
      payload: data,
    });
    dispatch({
      type: ADD_PART_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PART_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getParts =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PARTS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/parts?${query}`);

      dispatch({
        type: GET_PARTS,
        payload: data,
      });
      dispatch({
        type: GET_PARTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PARTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getPart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PART_STATED,
    });
    const { data } = await api.get(`/parts/${id}`);

    dispatch({
      type: GET_PART,
      payload: data,
    });
    dispatch({
      type: GET_PART_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PART_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editPart = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PART_STATED,
    });
    const { data } = await api.put(`/parts/${id}`, formData);
    dispatch({
      type: EDIT_PART,
      payload: data,
    });
    dispatch({
      type: EDIT_PART_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PART_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deletePart = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/parts/${id}`);
    dispatch(setAlert('Part Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllParts =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PARTS_STATED,
      });
      const { data } = await api.get(`/parts/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_PARTS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PARTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PARTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
