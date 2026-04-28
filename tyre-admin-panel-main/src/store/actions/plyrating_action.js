import api from '../../domain/api';
import {
  GET_PLYRATINGS_STATED,
  GET_PLYRATINGS,
  GET_PLYRATINGS_ENDED,
  ADD_PLYRATING_STATED,
  ADD_PLYRATING,
  ADD_PLYRATING_ENDED,
  EDIT_PLYRATING_STATED,
  EDIT_PLYRATING,
  EDIT_PLYRATING_ENDED,
  GET_PLYRATING_STATED,
  GET_PLYRATING,
  GET_PLYRATING_ENDED,
  GET_ALL_PLYRATINGS_STATED,
  GET_ALL_PLYRATINGS,
  GET_ALL_PLYRATINGS_ENDED,
} from '../types/plyrating_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addPlyrating = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PLYRATING_STATED,
    });
    const { data } = await api.post(`/ply-ratings`, formData);
    dispatch({
      type: ADD_PLYRATING,
      payload: data,
    });
    dispatch({
      type: ADD_PLYRATING_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PLYRATING_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getPlyratings =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PLYRATINGS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/ply-ratings?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_PLYRATINGS,
        payload: data,
      });
      dispatch({
        type: GET_PLYRATINGS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PLYRATINGS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getPlyrating = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PLYRATING_STATED,
    });
    const { data } = await api.get(`/ply-ratings/${id}`);

    dispatch({
      type: GET_PLYRATING,
      payload: data,
    });
    dispatch({
      type: GET_PLYRATING_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PLYRATING_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editPlyrating = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PLYRATING_STATED,
    });
    const { data } = await api.put(`/ply-ratings/${id}`, formData);
    dispatch({
      type: EDIT_PLYRATING,
      payload: data,
    });
    dispatch({
      type: EDIT_PLYRATING_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PLYRATING_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deletePlyrating = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/ply-ratings/${id}`);
    dispatch(setAlert('Plyrating Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllPlyratings =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PLYRATINGS_STATED,
      });
      const { data } = await api.get(
        `/ply-ratings/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_PLYRATINGS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PLYRATINGS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PLYRATINGS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
