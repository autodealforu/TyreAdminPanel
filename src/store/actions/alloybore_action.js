import api from '../../domain/api';
import {
  GET_ALLOYBORES_STATED,
  GET_ALLOYBORES,
  GET_ALLOYBORES_ENDED,
  ADD_ALLOYBORE_STATED,
  ADD_ALLOYBORE,
  ADD_ALLOYBORE_ENDED,
  EDIT_ALLOYBORE_STATED,
  EDIT_ALLOYBORE,
  EDIT_ALLOYBORE_ENDED,
  GET_ALLOYBORE_STATED,
  GET_ALLOYBORE,
  GET_ALLOYBORE_ENDED,
  GET_ALL_ALLOYBORES_STATED,
  GET_ALL_ALLOYBORES,
  GET_ALL_ALLOYBORES_ENDED,
} from '../types/alloybore_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyBore = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ALLOYBORE_STATED,
    });
    const { data } = await api.post(`/alloy-bores`, formData);
    dispatch({
      type: ADD_ALLOYBORE,
      payload: { alloybore: data },
    });
    dispatch({
      type: ADD_ALLOYBORE_ENDED,
    });
    dispatch(setAlert('Alloy Bore Added Successfully', 'success'));
  } catch (error) {
    dispatch({
      type: ADD_ALLOYBORE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const getAlloyBores =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALLOYBORES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/alloy-bores?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_ALLOYBORES,
        payload: data,
      });
      dispatch({
        type: GET_ALLOYBORES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALLOYBORES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const getAlloyBore = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALLOYBORE_STATED,
    });
    const { data } = await api.get(`/alloy-bores/${id}`);

    dispatch({
      type: GET_ALLOYBORE,
      payload: { alloybore: data },
    });
    dispatch({
      type: GET_ALLOYBORE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ALLOYBORE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const editAlloyBore = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ALLOYBORE_STATED,
    });
    const { data } = await api.put(`/alloy-bores/${id}`, formData);
    dispatch({
      type: EDIT_ALLOYBORE,
      payload: { alloybore: data },
    });
    dispatch({
      type: EDIT_ALLOYBORE_ENDED,
    });
    dispatch(setAlert('Alloy Bore Updated Successfully', 'success'));
  } catch (error) {
    dispatch({
      type: EDIT_ALLOYBORE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const deleteAlloyBore = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/alloy-bores/${id}`);
    dispatch(setAlert('Alloy Bore Deleted Successfully', 'success'));
    return { success: true };
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
    return { success: false, error };
  }
};

export const getAllAlloyBores =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_ALLOYBORES_STATED,
      });
      const { data } = await api.get(
        `/alloy-bores/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_ALLOYBORES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_ALLOYBORES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ALLOYBORES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
