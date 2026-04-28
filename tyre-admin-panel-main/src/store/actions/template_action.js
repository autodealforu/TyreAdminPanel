import api from "../../domain/api";
import {
  GET_TEMPLATES_STATED,
  GET_TEMPLATES,
  GET_TEMPLATES_ENDED,
  ADD_TEMPLATE_STATED,
  ADD_TEMPLATE,
  ADD_TEMPLATE_ENDED,
  EDIT_TEMPLATE_STATED,
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_ENDED,
  GET_TEMPLATE_STATED,
  GET_TEMPLATE,
  GET_TEMPLATE_ENDED,
  GET_ALL_TEMPLATES_STATED,
  GET_ALL_TEMPLATES,
  GET_ALL_TEMPLATES_ENDED,
} from "../types/template_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addTemplate = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TEMPLATE_STATED,
    });
    const { data } = await api.post(`/templates`, formData);
    dispatch({
      type: ADD_TEMPLATE,
      payload: data,
    });
    dispatch({
      type: ADD_TEMPLATE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_TEMPLATE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getTemplates =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_TEMPLATES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/templates?&${query}`);

      dispatch({
        type: GET_TEMPLATES,
        payload: data,
      });
      dispatch({
        type: GET_TEMPLATES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_TEMPLATES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getTemplate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TEMPLATE_STATED,
    });
    const { data } = await api.get(`/templates/${id}`);

    dispatch({
      type: GET_TEMPLATE,
      payload: data,
    });
    dispatch({
      type: GET_TEMPLATE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_TEMPLATE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editTemplate = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_TEMPLATE_STATED,
    });
    const { data } = await api.put(`/templates/${id}`, formData);
    dispatch({
      type: EDIT_TEMPLATE,
      payload: data,
    });
    dispatch({
      type: EDIT_TEMPLATE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TEMPLATE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteTemplate = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/templates/${id}`);
    dispatch(setAlert("Template Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllTemplates =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_TEMPLATES_STATED,
      });
      const { data } = await api.get(
        `/templates/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_TEMPLATES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_TEMPLATES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_TEMPLATES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
