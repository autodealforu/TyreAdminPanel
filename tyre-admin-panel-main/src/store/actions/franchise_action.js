import api from '../../domain/api';
import {
  GET_FRANCHISES_STATED,
  GET_FRANCHISES,
  GET_FRANCHISES_ENDED,
  ADD_FRANCHISE_STATED,
  ADD_FRANCHISE,
  ADD_FRANCHISE_ENDED,
  EDIT_FRANCHISE_STATED,
  EDIT_FRANCHISE,
  EDIT_FRANCHISE_ENDED,
  GET_FRANCHISE_STATED,
  GET_FRANCHISE,
  GET_FRANCHISE_ENDED,
  GET_ALL_FRANCHISES_STATED,
  GET_ALL_FRANCHISES,
  GET_ALL_FRANCHISES_ENDED,
} from '../types/franchise_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addFranchise = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_FRANCHISE_STATED,
    });
    const { data } = await api.post(`/franchises`, formData);
    dispatch({
      type: ADD_FRANCHISE,
      payload: data,
    });
    dispatch({
      type: ADD_FRANCHISE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_FRANCHISE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getFranchises =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_FRANCHISES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/franchises?${query}`);

      dispatch({
        type: GET_FRANCHISES,
        payload: data,
      });
      dispatch({
        type: GET_FRANCHISES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_FRANCHISES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getFranchise = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FRANCHISE_STATED,
    });
    const { data } = await api.get(`/franchises/${id}`);

    dispatch({
      type: GET_FRANCHISE,
      payload: data,
    });
    dispatch({
      type: GET_FRANCHISE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_FRANCHISE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editFranchise = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_FRANCHISE_STATED,
    });
    const { data } = await api.put(`/franchises/${id}`, formData);
    dispatch({
      type: EDIT_FRANCHISE,
      payload: data,
    });
    dispatch({
      type: EDIT_FRANCHISE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FRANCHISE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteFranchise = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/franchises/${id}`);
    dispatch(setAlert('Franchise Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllFranchises =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_FRANCHISES_STATED,
      });
      const { data } = await api.get(
        `/franchises/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_FRANCHISES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_FRANCHISES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_FRANCHISES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
