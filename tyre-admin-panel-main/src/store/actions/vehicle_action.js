import api from '../../domain/api';
import {
  GET_VEHICLES_STATED,
  GET_VEHICLES,
  GET_VEHICLES_ENDED,
  ADD_VEHICLE_STATED,
  ADD_VEHICLE,
  ADD_VEHICLE_ENDED,
  EDIT_VEHICLE_STATED,
  EDIT_VEHICLE,
  EDIT_VEHICLE_ENDED,
  GET_VEHICLE_STATED,
  GET_VEHICLE,
  GET_VEHICLE_ENDED,
  GET_ALL_VEHICLES_STATED,
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLES_ENDED,
} from '../types/vehicle_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addVehicle = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_VEHICLE_STATED,
    });
    const { data } = await api.post(`/vehicles`, formData);
    dispatch({
      type: ADD_VEHICLE,
      payload: data,
    });
    dispatch({
      type: ADD_VEHICLE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_VEHICLE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getVehicles =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_VEHICLES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/vehicles?${query}`);

      dispatch({
        type: GET_VEHICLES,
        payload: data,
      });
      dispatch({
        type: GET_VEHICLES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_VEHICLES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getVehicle = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_VEHICLE_STATED,
    });
    const { data } = await api.get(`/vehicles/${id}`);

    dispatch({
      type: GET_VEHICLE,
      payload: data,
    });
    dispatch({
      type: GET_VEHICLE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_VEHICLE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editVehicle = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_VEHICLE_STATED,
    });
    const { data } = await api.put(`/vehicles/${id}`, formData);
    dispatch({
      type: EDIT_VEHICLE,
      payload: data,
    });
    dispatch({
      type: EDIT_VEHICLE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_VEHICLE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteVehicle = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/vehicles/${id}`);
    dispatch(setAlert('Vehicle Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllVehicles =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_VEHICLES_STATED,
      });
      const { data } = await api.get(
        `/vehicles/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_VEHICLES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_VEHICLES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_VEHICLES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
