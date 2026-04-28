import api from '../../domain/api';
import {
  GET_LOADINDEXS_STATED,
  GET_LOADINDEXS,
  GET_LOADINDEXS_ENDED,
  ADD_LOADINDEX_STATED,
  ADD_LOADINDEX,
  ADD_LOADINDEX_ENDED,
  EDIT_LOADINDEX_STATED,
  EDIT_LOADINDEX,
  EDIT_LOADINDEX_ENDED,
  GET_LOADINDEX_STATED,
  GET_LOADINDEX,
  GET_LOADINDEX_ENDED,
  GET_ALL_LOADINDEXS_STATED,
  GET_ALL_LOADINDEXS,
  GET_ALL_LOADINDEXS_ENDED,
} from '../types/loadindex_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addLoadIndex = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_LOADINDEX_STATED,
    });
    const { data } = await api.post(`/load-indexes`, formData);
    dispatch({
      type: ADD_LOADINDEX,
      payload: data,
    });
    dispatch({
      type: ADD_LOADINDEX_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_LOADINDEX_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getLoadIndexs =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LOADINDEXS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/load-indexes?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_LOADINDEXS,
        payload: data,
      });
      dispatch({
        type: GET_LOADINDEXS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_LOADINDEXS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getLoadIndex = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LOADINDEX_STATED,
    });
    const { data } = await api.get(`/load-indexes/${id}`);

    dispatch({
      type: GET_LOADINDEX,
      payload: data,
    });
    dispatch({
      type: GET_LOADINDEX_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_LOADINDEX_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editLoadIndex = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_LOADINDEX_STATED,
    });
    const { data } = await api.put(`/load-indexes/${id}`, formData);
    dispatch({
      type: EDIT_LOADINDEX,
      payload: data,
    });
    dispatch({
      type: EDIT_LOADINDEX_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_LOADINDEX_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteLoadIndex = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/load-indexes/${id}`);
    dispatch(setAlert('LoadIndex Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllLoadIndexs =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_LOADINDEXS_STATED,
      });
      const { data } = await api.get(
        `/load-indexes/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_LOADINDEXS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_LOADINDEXS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_LOADINDEXS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
