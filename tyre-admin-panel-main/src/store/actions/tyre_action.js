import api from '../../domain/api';
import {
  GET_TYRES_STATED,
  GET_TYRES,
  GET_TYRES_ENDED,
  ADD_TYRE_STATED,
  ADD_TYRE,
  ADD_TYRE_ENDED,
  EDIT_TYRE_STATED,
  EDIT_TYRE,
  EDIT_TYRE_ENDED,
  GET_TYRE_STATED,
  GET_TYRE,
  GET_TYRE_ENDED,
  GET_ALL_TYRES_STATED,
  GET_ALL_TYRES,
  GET_ALL_TYRES_ENDED,
} from '../types/tyre_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addTyre = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TYRE_STATED,
    });
    const { data } = await api.post(`/tyres`, formData);
    dispatch({
      type: ADD_TYRE,
      payload: data,
    });
    dispatch({
      type: ADD_TYRE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_TYRE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getTyres =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TYRES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/tyres?${query}`);

      dispatch({
        type: GET_TYRES,
        payload: data,
      });
      dispatch({
        type: GET_TYRES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_TYRES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getTyre = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TYRE_STATED,
    });
    const { data } = await api.get(`/tyres/${id}`);

    dispatch({
      type: GET_TYRE,
      payload: data,
    });
    dispatch({
      type: GET_TYRE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_TYRE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editTyre = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TYRE_STATED,
    });
    const { data } = await api.put(`/tyres/${id}`, formData);
    dispatch({
      type: EDIT_TYRE,
      payload: data,
    });
    dispatch({
      type: EDIT_TYRE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TYRE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteTyre = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/tyres/${id}`);
    dispatch(setAlert('Tyre Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllTyres =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TYRES_STATED,
      });
      const { data } = await api.get(`/tyres/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_TYRES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TYRES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TYRES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
