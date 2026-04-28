import api from '../../domain/api';
import {
  GET_JOB_CARDS_STATED,
  GET_JOB_CARDS,
  GET_JOB_CARDS_ENDED,
  ADD_JOB_CARD_STATED,
  ADD_JOB_CARD,
  ADD_JOB_CARD_ENDED,
  EDIT_JOB_CARD_STATED,
  EDIT_JOB_CARD,
  EDIT_JOB_CARD_ENDED,
  GET_JOB_CARD_STATED,
  GET_JOB_CARD,
  GET_JOB_CARD_ENDED,
  GET_ALL_JOB_CARDS_STATED,
  GET_ALL_JOB_CARDS,
  GET_ALL_JOB_CARDS_ENDED,
} from '../types/job_card_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addJobCard = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_JOB_CARD_STATED,
    });
    const { data } = await api.post(`/job-cards`, formData);
    dispatch({
      type: ADD_JOB_CARD,
      payload: data,
    });
    dispatch({
      type: ADD_JOB_CARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_JOB_CARD_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getJobCards =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_JOB_CARDS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/job-cards?${query}`);

      dispatch({
        type: GET_JOB_CARDS,
        payload: data,
      });
      dispatch({
        type: GET_JOB_CARDS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_JOB_CARDS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getJobCard = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_JOB_CARD_STATED,
    });
    const { data } = await api.get(`/job-cards/${id}`);

    dispatch({
      type: GET_JOB_CARD,
      payload: data,
    });
    dispatch({
      type: GET_JOB_CARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_JOB_CARD_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editJobCard = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_JOB_CARD_STATED,
    });
    const { data } = await api.put(`/job-cards/${id}`, formData);
    dispatch({
      type: EDIT_JOB_CARD,
      payload: data,
    });
    dispatch({
      type: EDIT_JOB_CARD_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_JOB_CARD_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteJobCard = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/job-cards/${id}`);
    dispatch(setAlert('JobCard Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllJobCards =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_JOB_CARDS_STATED,
      });
      const { data } = await api.get(
        `/job-cards/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_JOB_CARDS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_JOB_CARDS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_JOB_CARDS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
