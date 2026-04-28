import api from '../../domain/api';
import {
  GET_ALLOYPCDS_STATED,
  GET_ALLOYPCDS,
  GET_ALLOYPCDS_ENDED,
  ADD_ALLOYPCD_STATED,
  ADD_ALLOYPCD,
  ADD_ALLOYPCD_ENDED,
  EDIT_ALLOYPCD_STATED,
  EDIT_ALLOYPCD,
  EDIT_ALLOYPCD_ENDED,
  GET_ALLOYPCD_STATED,
  GET_ALLOYPCD,
  GET_ALLOYPCD_ENDED,
  GET_ALL_ALLOYPCDS_STATED,
  GET_ALL_ALLOYPCDS,
  GET_ALL_ALLOYPCDS_ENDED,
} from '../types/alloypcd_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAlloyPCD = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ALLOYPCD_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.post(`/alloy-pcds`, payload);
    dispatch({ type: ADD_ALLOYPCD, payload: data });
    dispatch({ type: ADD_ALLOYPCD_ENDED });
  } catch (error) {
    dispatch({ type: ADD_ALLOYPCD_ENDED });
    dispatch(handleError(error));
  }
};

export const getAlloyPCDS =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALLOYPCDS_STATED });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, { encodeValuesOnly: true });
      const { data } = await api.get(
        `/alloy-pcds?&pageNumber=${pageNumber}&${query}`
      );
      dispatch({ type: GET_ALLOYPCDS, payload: data });
      dispatch({ type: GET_ALLOYPCDS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALLOYPCDS_ENDED });
      dispatch(handleError(error));
    }
  };

export const getAlloyPCD = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLOYPCD_STATED });
    const { data } = await api.get(`/alloy-pcds/${id}`);
    dispatch({ type: GET_ALLOYPCD, payload: data });
    dispatch({ type: GET_ALLOYPCD_ENDED });
  } catch (error) {
    dispatch({ type: GET_ALLOYPCD_STATED });
    dispatch(handleError(error));
  }
};

export const editAlloyPCD = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ALLOYPCD_STATED });
    const payload = { name: formData?.name?.trim() };
    const { data } = await api.put(`/alloy-pcds/${id}`, payload);
    dispatch({ type: EDIT_ALLOYPCD, payload: data });
    dispatch({ type: EDIT_ALLOYPCD_ENDED });
  } catch (error) {
    dispatch({ type: EDIT_ALLOYPCD_ENDED });
    dispatch(handleError(error));
  }
};

export const deleteAlloyPCD = (id) => async (dispatch) => {
  try {
    await api.delete(`/alloy-pcds/${id}`);
    dispatch(setAlert('Alloy PCD Deleted Successfully', 'success'));
    return { success: true };
  } catch (error) {
    dispatch(handleError(error));
    return { success: false, error };
  }
};

export const getAllAlloyPCDs =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ALLOYPCDS_STATED });
      const { data } = await api.get(
        `/alloy-pcds/all?term=${term}&value=${value}`
      );
      dispatch({ type: GET_ALL_ALLOYPCDS, payload: data });
      dispatch({ type: GET_ALL_ALLOYPCDS_ENDED });
    } catch (error) {
      dispatch({ type: GET_ALL_ALLOYPCDS_ENDED });
      dispatch(handleError(error));
    }
  };
