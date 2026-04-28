import api from "../../domain/api";
import {
  GET_SITEPAGES_STATED,
  GET_SITEPAGES,
  GET_SITEPAGES_ENDED,
  ADD_SITEPAGE_STATED,
  ADD_SITEPAGE,
  ADD_SITEPAGE_ENDED,
  EDIT_SITEPAGE_STATED,
  EDIT_SITEPAGE,
  EDIT_SITEPAGE_ENDED,
  GET_SITEPAGE_STATED,
  GET_SITEPAGE,
  GET_SITEPAGE_ENDED,
  GET_ALL_SITEPAGES_STATED,
  GET_ALL_SITEPAGES,
  GET_ALL_SITEPAGES_ENDED,
} from "../types/sitepage_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addSitepage = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SITEPAGE_STATED,
    });
    const { data } = await api.post(`/pages`, formData);
    dispatch({
      type: ADD_SITEPAGE,
      payload: data,
    });
    dispatch({
      type: ADD_SITEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_SITEPAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getSitepages =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_SITEPAGES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/pages?&${query}`);

      dispatch({
        type: GET_SITEPAGES,
        payload: data,
      });
      dispatch({
        type: GET_SITEPAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_SITEPAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getSitepage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SITEPAGE_STATED,
    });
    const { data } = await api.get(`/pages/${id}`);

    dispatch({
      type: GET_SITEPAGE,
      payload: data,
    });
    dispatch({
      type: GET_SITEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_SITEPAGE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editSitepage = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SITEPAGE_STATED,
    });
    const { data } = await api.put(`/pages/${id}`, formData);
    dispatch({
      type: EDIT_SITEPAGE,
      payload: data,
    });
    dispatch({
      type: EDIT_SITEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SITEPAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteSitepage = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/pages/${id}`);
    dispatch(setAlert("Sitepage Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllSitepages =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_SITEPAGES_STATED,
      });
      const { data } = await api.get(`/pages/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_SITEPAGES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_SITEPAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_SITEPAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
