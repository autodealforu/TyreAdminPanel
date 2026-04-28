import api from '../../domain/api';
import {
  GET_THREADPATTERNS_STATED,
  GET_THREADPATTERNS,
  GET_THREADPATTERNS_ENDED,
  ADD_THREADPATTERN_STATED,
  ADD_THREADPATTERN,
  ADD_THREADPATTERN_ENDED,
  EDIT_THREADPATTERN_STATED,
  EDIT_THREADPATTERN,
  EDIT_THREADPATTERN_ENDED,
  GET_THREADPATTERN_STATED,
  GET_THREADPATTERN,
  GET_THREADPATTERN_ENDED,
  GET_ALL_THREADPATTERNS_STATED,
  GET_ALL_THREADPATTERNS,
  GET_ALL_THREADPATTERNS_ENDED,
} from '../types/threadpattern_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addThreadPattern = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_THREADPATTERN_STATED,
    });
    const { data } = await api.post(`/thread-patterns`, formData);
    dispatch({
      type: ADD_THREADPATTERN,
      payload: data,
    });
    dispatch({
      type: ADD_THREADPATTERN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_THREADPATTERN_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getThreadPatterns =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_THREADPATTERNS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/thread-patterns?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_THREADPATTERNS,
        payload: data,
      });
      dispatch({
        type: GET_THREADPATTERNS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_THREADPATTERNS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getThreadPattern = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_THREADPATTERN_STATED,
    });
    const { data } = await api.get(`/thread-patterns/${id}`);

    dispatch({
      type: GET_THREADPATTERN,
      payload: data,
    });
    dispatch({
      type: GET_THREADPATTERN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_THREADPATTERN_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editThreadPattern = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_THREADPATTERN_STATED,
    });
    const { data } = await api.put(`/thread-patterns/${id}`, formData);
    dispatch({
      type: EDIT_THREADPATTERN,
      payload: data,
    });
    dispatch({
      type: EDIT_THREADPATTERN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_THREADPATTERN_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteThreadPattern = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/thread-patterns/${id}`);
    dispatch(setAlert('ThreadPattern Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllThreadPatterns =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_THREADPATTERNS_STATED,
      });
      const { data } = await api.get(
        `/thread-patterns/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_THREADPATTERNS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_THREADPATTERNS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_THREADPATTERNS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
