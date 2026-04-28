import api from '../../domain/api';
import {
  GET_RIMDIAMETERS_STATED,
  GET_RIMDIAMETERS,
  GET_RIMDIAMETERS_ENDED,
  ADD_RIMDIAMETER_STATED,
  ADD_RIMDIAMETER,
  ADD_RIMDIAMETER_ENDED,
  EDIT_RIMDIAMETER_STATED,
  EDIT_RIMDIAMETER,
  EDIT_RIMDIAMETER_ENDED,
  GET_RIMDIAMETER_STATED,
  GET_RIMDIAMETER,
  GET_RIMDIAMETER_ENDED,
  GET_ALL_RIMDIAMETERS_STATED,
  GET_ALL_RIMDIAMETERS,
  GET_ALL_RIMDIAMETERS_ENDED,
} from '../types/rimdiameter_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addRimDiameter = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_RIMDIAMETER_STATED,
    });
    const { data } = await api.post(`/rim-diameters`, formData);
    dispatch({
      type: ADD_RIMDIAMETER,
      payload: data,
    });
    dispatch({
      type: ADD_RIMDIAMETER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_RIMDIAMETER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getRimDiameters =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_RIMDIAMETERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/rim-diameters?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_RIMDIAMETERS,
        payload: data,
      });
      dispatch({
        type: GET_RIMDIAMETERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_RIMDIAMETERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getRimDiameter = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RIMDIAMETER_STATED,
    });
    const { data } = await api.get(`/rim-diameters/${id}`);

    dispatch({
      type: GET_RIMDIAMETER,
      payload: data,
    });
    dispatch({
      type: GET_RIMDIAMETER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_RIMDIAMETER_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editRimDiameter = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_RIMDIAMETER_STATED,
    });
    const { data } = await api.put(`/rim-diameters/${id}`, formData);
    dispatch({
      type: EDIT_RIMDIAMETER,
      payload: data,
    });
    dispatch({
      type: EDIT_RIMDIAMETER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_RIMDIAMETER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteRimDiameter = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/rim-diameters/${id}`);
    dispatch(setAlert('RimDiameter Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllRimDiameters =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_RIMDIAMETERS_STATED,
      });
      const { data } = await api.get(
        `/rim-diameters/all?term=${term}&value=${value}`
      );
      console.log('Data from Action', data);

      dispatch({
        type: GET_ALL_RIMDIAMETERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_RIMDIAMETERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_RIMDIAMETERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
