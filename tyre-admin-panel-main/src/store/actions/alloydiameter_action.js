import api from '../../domain/api';
import {
  GET_ALLOYDIAMETERS_STATED,
  GET_ALLOYDIAMETERS,
  GET_ALLOYDIAMETERS_ENDED,
  ADD_ALLOYDIAMETER_STATED,
  ADD_ALLOYDIAMETER,
  ADD_ALLOYDIAMETER_ENDED,
  EDIT_ALLOYDIAMETER_STATED,
  EDIT_ALLOYDIAMETER,
  EDIT_ALLOYDIAMETER_ENDED,
  GET_ALLOYDIAMETER_STATED,
  GET_ALLOYDIAMETER,
  GET_ALLOYDIAMETER_ENDED,
  GET_ALL_ALLOYDIAMETERS_STATED,
  GET_ALL_ALLOYDIAMETERS,
  GET_ALL_ALLOYDIAMETERS_ENDED,
} from '../types/alloydiameter_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyDiameter = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ALLOYDIAMETER_STATED });
    const payload = {
      name: formData?.name?.trim(),
      diameterInches: formData?.diameterInches?.trim(),
      description: formData?.description || '',
    };
    const { data } = await api.post(`/alloy-diameters`, payload);
    dispatch({ type: ADD_ALLOYDIAMETER, payload: data });
    dispatch({ type: ADD_ALLOYDIAMETER_ENDED });
  } catch (error) {
    dispatch({ type: ADD_ALLOYDIAMETER_ENDED });
    dispatch(handleError(error));
  }
};

export const getAlloyDiameters =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOYDIAMETERS_STATED });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const { data } = await api.get(
        `/alloy-diameters?&pageNumber=${pageNumber}&${query}`
      );
      dispatch({ type: GET_ALLOYDIAMETERS, payload: data });
      dispatch({ type: GET_ALLOYDIAMETERS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALLOYDIAMETERS_ENDED });
      dispatch(handleError(error));
    }
  };

export const getAlloyDiameter = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLOYDIAMETER_STATED });
    const { data } = await api.get(`/alloy-diameters/${id}`);
    dispatch({ type: GET_ALLOYDIAMETER, payload: data });
    dispatch({ type: GET_ALLOYDIAMETER_ENDED });
  } catch (error) {
    dispatch({ type: GET_ALLOYDIAMETER_STATED });
    dispatch(handleError(error));
  }
};

export const editAlloyDiameter = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ALLOYDIAMETER_STATED });
    const payload = {
      name: formData?.name?.trim(),
      diameterInches: formData?.diameterInches?.trim(),
      description: formData?.description || '',
    };
    const { data } = await api.put(`/alloy-diameters/${id}`, payload);
    dispatch({ type: EDIT_ALLOYDIAMETER, payload: data });
    dispatch({ type: EDIT_ALLOYDIAMETER_ENDED });
  } catch (error) {
    dispatch({ type: EDIT_ALLOYDIAMETER_ENDED });
    dispatch(handleError(error));
  }
};

export const deleteAlloyDiameter = (id) => async (dispatch) => {
  try {
    await api.delete(`/alloy-diameters/${id}`);
    dispatch(setAlert('Alloy Diameter Deleted Successfully', 'success'));
    return { success: true };
  } catch (error) {
    dispatch(handleError(error));
    return { success: false, error };
  }
};

export const getAllAlloyDiameters =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ALLOYDIAMETERS_STATED });
      const { data } = await api.get(
        `/alloy-diameters/all?term=${term}&value=${value}`
      );
      dispatch({ type: GET_ALL_ALLOYDIAMETERS, payload: data });
      dispatch({ type: GET_ALL_ALLOYDIAMETERS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALL_ALLOYDIAMETERS_ENDED });
      dispatch(handleError(error));
    }
  };
