import api from '../../domain/api';
import {
  GET_ALLOYFINISHES_STATED,
  GET_ALLOYFINISHES,
  GET_ALLOYFINISHES_ENDED,
  ADD_ALLOYFINISH_STATED,
  ADD_ALLOYFINISH,
  ADD_ALLOYFINISH_ENDED,
  EDIT_ALLOYFINISH_STATED,
  EDIT_ALLOYFINISH,
  EDIT_ALLOYFINISH_ENDED,
  GET_ALLOYFINISH_STATED,
  GET_ALLOYFINISH,
  GET_ALLOYFINISH_ENDED,
  GET_ALL_ALLOYFINISHES_STATED,
  GET_ALL_ALLOYFINISHES,
  GET_ALL_ALLOYFINISHES_ENDED,
} from '../types/alloyfinish_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyFinish = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ALLOYFINISH_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.post(`/alloy-finishes`, payload);
    dispatch({ type: ADD_ALLOYFINISH, payload: data });
    dispatch({ type: ADD_ALLOYFINISH_ENDED });
  } catch (error) {
    dispatch({ type: ADD_ALLOYFINISH_ENDED });
    dispatch(handleError(error));
  }
};

export const getAlloyFinishes =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOYFINISHES_STATED });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const { data } = await api.get(
        `/alloy-finishes?&pageNumber=${pageNumber}&${query}`
      );
      dispatch({ type: GET_ALLOYFINISHES, payload: data });
      dispatch({ type: GET_ALLOYFINISHES_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALLOYFINISHES_ENDED });
      dispatch(handleError(error));
    }
  };

export const getAlloyFinish = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLOYFINISH_STATED });
    const { data } = await api.get(`/alloy-finishes/${id}`);
    dispatch({ type: GET_ALLOYFINISH, payload: data });
    dispatch({ type: GET_ALLOYFINISH_ENDED });
  } catch (error) {
    dispatch({ type: GET_ALLOYFINISH_STATED });
    dispatch(handleError(error));
  }
};

export const editAlloyFinish = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ALLOYFINISH_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.put(`/alloy-finishes/${id}`, payload);
    dispatch({ type: EDIT_ALLOYFINISH, payload: data });
    dispatch({ type: EDIT_ALLOYFINISH_ENDED });
  } catch (error) {
    dispatch({ type: EDIT_ALLOYFINISH_ENDED });
    dispatch(handleError(error));
  }
};

export const deleteAlloyFinish = (id) => async (dispatch) => {
  try {
    await api.delete(`/alloy-finishes/${id}`);
    dispatch(setAlert('Alloy Finish Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getAllAlloyFinishes =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ALLOYFINISHES_STATED });
      const { data } = await api.get(
        `/alloy-finishes/all?term=${term}&value=${value}`
      );
      dispatch({ type: GET_ALL_ALLOYFINISHES, payload: data });
      dispatch({ type: GET_ALL_ALLOYFINISHES_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALL_ALLOYFINISHES_ENDED });
      dispatch(handleError(error));
    }
  };
