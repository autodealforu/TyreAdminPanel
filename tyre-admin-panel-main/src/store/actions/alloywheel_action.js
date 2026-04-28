import api from '../../domain/api';
import {
  GET_ALLOYWHEELS_STATED,
  GET_ALLOYWHEELS,
  GET_ALLOYWHEELS_ENDED,
  ADD_ALLOYWHEEL_STATED,
  ADD_ALLOYWHEEL,
  ADD_ALLOYWHEEL_ENDED,
  EDIT_ALLOYWHEEL_STATED,
  EDIT_ALLOYWHEEL,
  EDIT_ALLOYWHEEL_ENDED,
  GET_ALLOYWHEEL_STATED,
  GET_ALLOYWHEEL,
  GET_ALLOYWHEEL_ENDED,
  GET_ALL_ALLOYWHEELS_STATED,
  GET_ALL_ALLOYWHEELS,
  GET_ALL_ALLOYWHEELS_ENDED,
} from '../types/alloywheel_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyWheel = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ALLOYWHEEL_STATED,
    });
    const { data } = await api.post(`/alloy-wheels`, formData);
    dispatch({
      type: ADD_ALLOYWHEEL,
      payload: data,
    });
    dispatch({
      type: ADD_ALLOYWHEEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_ALLOYWHEEL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAlloyWheels =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALLOYWHEELS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/alloy-wheels?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_ALLOYWHEELS,
        payload: data,
      });
      dispatch({
        type: GET_ALLOYWHEELS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALLOYWHEELS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getAlloyWheel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALLOYWHEEL_STATED,
    });
    const { data } = await api.get(`/alloy-wheels/${id}`);

    dispatch({
      type: GET_ALLOYWHEEL,
      payload: data,
    });
    dispatch({
      type: GET_ALLOYWHEEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ALLOYWHEEL_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editAlloyWheel = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ALLOYWHEEL_STATED,
    });
    const { data } = await api.put(`/alloy-wheels/${id}`, formData);
    dispatch({
      type: EDIT_ALLOYWHEEL,
      payload: data,
    });
    dispatch({
      type: EDIT_ALLOYWHEEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ALLOYWHEEL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteAlloyWheel = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/alloy-wheels/${id}`);
    dispatch(setAlert('AlloyWheel Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllAlloyWheels =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_ALLOYWHEELS_STATED,
      });
      const { data } = await api.get(
        `/alloy-wheels/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_ALLOYWHEELS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_ALLOYWHEELS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ALLOYWHEELS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
