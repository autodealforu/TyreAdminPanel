import api from '../../domain/api';
import {
  GET_ASPECTRATIOS_STATED,
  GET_ASPECTRATIOS,
  GET_ASPECTRATIOS_ENDED,
  ADD_ASPECTRATIO_STATED,
  ADD_ASPECTRATIO,
  ADD_ASPECTRATIO_ENDED,
  EDIT_ASPECTRATIO_STATED,
  EDIT_ASPECTRATIO,
  EDIT_ASPECTRATIO_ENDED,
  GET_ASPECTRATIO_STATED,
  GET_ASPECTRATIO,
  GET_ASPECTRATIO_ENDED,
  GET_ALL_ASPECTRATIOS_STATED,
  GET_ALL_ASPECTRATIOS,
  GET_ALL_ASPECTRATIOS_ENDED,
} from '../types/aspectratio_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addAspectRatio = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_ASPECTRATIO_STATED,
    });
    const { data } = await api.post(`/aspect-ratios`, formData);
    dispatch({
      type: ADD_ASPECTRATIO,
      payload: data,
    });
    dispatch({
      type: ADD_ASPECTRATIO_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_ASPECTRATIO_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAspectRatios =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ASPECTRATIOS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/aspect-ratios?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_ASPECTRATIOS,
        payload: data,
      });
      dispatch({
        type: GET_ASPECTRATIOS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ASPECTRATIOS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getAspectRatio = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ASPECTRATIO_STATED,
    });
    const { data } = await api.get(`/aspect-ratios/${id}`);

    dispatch({
      type: GET_ASPECTRATIO,
      payload: data,
    });
    dispatch({
      type: GET_ASPECTRATIO_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ASPECTRATIO_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editAspectRatio = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_ASPECTRATIO_STATED,
    });
    const { data } = await api.put(`/aspect-ratios/${id}`, formData);
    dispatch({
      type: EDIT_ASPECTRATIO,
      payload: data,
    });
    dispatch({
      type: EDIT_ASPECTRATIO_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ASPECTRATIO_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteAspectRatio = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/aspect-ratios/${id}`);
    dispatch(setAlert('AspectRatio Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllAspectRatios =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_ASPECTRATIOS_STATED,
      });
      const { data } = await api.get(
        `/aspect-ratios/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_ASPECTRATIOS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_ASPECTRATIOS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ASPECTRATIOS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
