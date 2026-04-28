import api from '../../domain/api';
import {
  GET_MAKEMODELS_STATED,
  GET_MAKEMODELS,
  GET_MAKEMODELS_ENDED,
  ADD_MAKEMODEL_STATED,
  ADD_MAKEMODEL,
  ADD_MAKEMODEL_ENDED,
  EDIT_MAKEMODEL_STATED,
  EDIT_MAKEMODEL,
  EDIT_MAKEMODEL_ENDED,
  GET_MAKEMODEL_STATED,
  GET_MAKEMODEL,
  GET_MAKEMODEL_ENDED,
  GET_ALL_MAKEMODELS_STATED,
  GET_ALL_MAKEMODELS,
  GET_ALL_MAKEMODELS_ENDED,
} from '../types/makemodel_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

const handleErrorLocal = (error) => (dispatch) => {
  if (error.response && error.response.data && error.response.data.message) {
    dispatch(setAlert(error.response.data.message, 'danger', 5000));
  } else {
    dispatch(setAlert('An error occurred', 'danger', 5000));
  }
};

export const addMakeModel = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_MAKEMODEL_STATED,
    });
    const { data } = await api.post(`/makemodels`, formData);
    dispatch({
      type: ADD_MAKEMODEL,
      payload: data,
    });
    dispatch({
      type: ADD_MAKEMODEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_MAKEMODEL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const getMakeModels =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MAKEMODELS_STATED,
      });
      const params = qs.stringify({
        page: pageNumber,
        ...qs.parse(window.location.search.substring(1)),
      });
      const { data } = await api.get(`/makemodels?${params}`);
      dispatch({
        type: GET_MAKEMODELS,
        payload: data,
      });
      dispatch({
        type: GET_MAKEMODELS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_MAKEMODELS_ENDED,
      });
      dispatch(handleError(error));
    }
  };

export const getMakeModel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MAKEMODEL_STATED,
    });
    const { data } = await api.get(`/makemodels/${id}`);
    dispatch({
      type: GET_MAKEMODEL,
      payload: data,
    });
    dispatch({
      type: GET_MAKEMODEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_MAKEMODEL_ENDED,
    });
    dispatch(handleError(error));
  }
};

export const editMakeModel = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_MAKEMODEL_STATED,
    });
    const { data } = await api.put(`/makemodels/${id}`, formData);
    dispatch({
      type: EDIT_MAKEMODEL,
      payload: data,
    });
    dispatch({
      type: EDIT_MAKEMODEL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_MAKEMODEL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};

export const deleteMakeModel = (id) => async (dispatch) => {
  try {
    await api.delete(`/makemodels/${id}`);
    dispatch(getMakeModels({ pageNumber: 1 }));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getAllMakeModels = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_MAKEMODELS_STATED,
    });
    const { data } = await api.get(`/makemodels/all`);
    dispatch({
      type: GET_ALL_MAKEMODELS,
      payload: data,
    });
    dispatch({
      type: GET_ALL_MAKEMODELS_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MAKEMODELS_ENDED,
    });
    dispatch(handleError(error));
  }
};
