import api from '../../domain/api';
import {
  GET_SERVICES_STATED,
  GET_SERVICES,
  GET_SERVICES_ENDED,
  ADD_SERVICE_STATED,
  ADD_SERVICE,
  ADD_SERVICE_ENDED,
  EDIT_SERVICE_STATED,
  EDIT_SERVICE,
  EDIT_SERVICE_ENDED,
  GET_SERVICE_STATED,
  GET_SERVICE,
  GET_SERVICE_ENDED,
  GET_ALL_SERVICES_STATED,
  GET_ALL_SERVICES,
  GET_ALL_SERVICES_ENDED,
} from '../types/service_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addService = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SERVICE_STATED,
    });
    const { data } = await api.post(`/services`, formData);
    dispatch({
      type: ADD_SERVICE,
      payload: data,
    });
    dispatch({
      type: ADD_SERVICE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const getServices =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/services?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_SERVICES,
        payload: data,
      });
      dispatch({
        type: GET_SERVICES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SERVICES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const getService = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SERVICE_STATED,
    });
    const { data } = await api.get(`/services/${id}`);

    dispatch({
      type: GET_SERVICE,
      payload: data,
    });
    dispatch({
      type: GET_SERVICE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const editService = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SERVICE_STATED,
    });
    const { data } = await api.put(`/services/${id}`, formData);
    dispatch({
      type: EDIT_SERVICE,
      payload: data,
    });
    dispatch({
      type: EDIT_SERVICE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SERVICE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/services/${id}`);
    dispatch(setAlert('Service Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const getAllServices =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SERVICES_STATED,
      });
      const { data } = await api.get(
        `/services/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_SERVICES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SERVICES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SERVICES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
