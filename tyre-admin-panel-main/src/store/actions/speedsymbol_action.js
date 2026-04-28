import api from '../../domain/api';
import {
  GET_SPEEDSYMBOLS_STATED,
  GET_SPEEDSYMBOLS,
  GET_SPEEDSYMBOLS_ENDED,
  ADD_SPEEDSYMBOL_STATED,
  ADD_SPEEDSYMBOL,
  ADD_SPEEDSYMBOL_ENDED,
  EDIT_SPEEDSYMBOL_STATED,
  EDIT_SPEEDSYMBOL,
  EDIT_SPEEDSYMBOL_ENDED,
  GET_SPEEDSYMBOL_STATED,
  GET_SPEEDSYMBOL,
  GET_SPEEDSYMBOL_ENDED,
  GET_ALL_SPEEDSYMBOLS_STATED,
  GET_ALL_SPEEDSYMBOLS,
  GET_ALL_SPEEDSYMBOLS_ENDED,
} from '../types/speedsymbol_type';
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addSpeedSymbol = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SPEEDSYMBOL_STATED,
    });
    const { data } = await api.post(`/speed-symbols`, formData);
    dispatch({
      type: ADD_SPEEDSYMBOL,
      payload: data,
    });
    dispatch({
      type: ADD_SPEEDSYMBOL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SPEEDSYMBOL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSpeedSymbols =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SPEEDSYMBOLS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(
        `/speed-symbols?&pageNumber=${pageNumber}&${query}`
      );

      dispatch({
        type: GET_SPEEDSYMBOLS,
        payload: data,
      });
      dispatch({
        type: GET_SPEEDSYMBOLS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SPEEDSYMBOLS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSpeedSymbol = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPEEDSYMBOL_STATED,
    });
    const { data } = await api.get(`/speed-symbols/${id}`);

    dispatch({
      type: GET_SPEEDSYMBOL,
      payload: data,
    });
    dispatch({
      type: GET_SPEEDSYMBOL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SPEEDSYMBOL_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSpeedSymbol = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SPEEDSYMBOL_STATED,
    });
    const { data } = await api.put(`/speed-symbols/${id}`, formData);
    dispatch({
      type: EDIT_SPEEDSYMBOL,
      payload: data,
    });
    dispatch({
      type: EDIT_SPEEDSYMBOL_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SPEEDSYMBOL_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSpeedSymbol = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/speed-symbols/${id}`);
    dispatch(setAlert('SpeedSymbol Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSpeedSymbols =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SPEEDSYMBOLS_STATED,
      });
      const { data } = await api.get(
        `/speed-symbols/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_SPEEDSYMBOLS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SPEEDSYMBOLS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SPEEDSYMBOLS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
