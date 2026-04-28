import api from '../../domain/api';
import {
  GET_TECHNICIANS_STATED,
  GET_TECHNICIANS,
  GET_TECHNICIANS_ENDED,
  ADD_TECHNICIAN_STATED,
  ADD_TECHNICIAN,
  ADD_TECHNICIAN_ENDED,
  EDIT_TECHNICIAN_STATED,
  EDIT_TECHNICIAN,
  EDIT_TECHNICIAN_ENDED,
  GET_TECHNICIAN_STATED,
  GET_TECHNICIAN,
  GET_TECHNICIAN_ENDED,
  GET_ALL_TECHNICIANS_STATED,
  GET_ALL_TECHNICIANS,
  GET_ALL_TECHNICIANS_ENDED,
} from '../types/technician_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addTechnician = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TECHNICIAN_STATED,
    });
    const { data } = await api.post(`/technicians`, formData);
    dispatch({
      type: ADD_TECHNICIAN,
      payload: data,
    });
    dispatch({
      type: ADD_TECHNICIAN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_TECHNICIAN_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getTechnicians =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TECHNICIANS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/technicians?${query}`);

      dispatch({
        type: GET_TECHNICIANS,
        payload: data,
      });
      dispatch({
        type: GET_TECHNICIANS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_TECHNICIANS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getTechnician = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TECHNICIAN_STATED,
    });
    const { data } = await api.get(`/technicians/${id}`);

    dispatch({
      type: GET_TECHNICIAN,
      payload: data,
    });
    dispatch({
      type: GET_TECHNICIAN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_TECHNICIAN_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editTechnician = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TECHNICIAN_STATED,
    });
    const { data } = await api.put(`/technicians/${id}`, formData);
    dispatch({
      type: EDIT_TECHNICIAN,
      payload: data,
    });
    dispatch({
      type: EDIT_TECHNICIAN_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TECHNICIAN_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteTechnician = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/technicians/${id}`);
    dispatch(setAlert('Technician Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllTechnicians =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TECHNICIANS_STATED,
      });
      const { data } = await api.get(
        `/technicians/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_TECHNICIANS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TECHNICIANS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TECHNICIANS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
