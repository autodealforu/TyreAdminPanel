import api from "../../domain/api";
import {
  GET_CATEGORYS_STATED,
  GET_CATEGORYS,
  GET_CATEGORYS_ENDED,
  ADD_CATEGORY_STATED,
  ADD_CATEGORY,
  ADD_CATEGORY_ENDED,
  EDIT_CATEGORY_STATED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_ENDED,
  GET_CATEGORY_STATED,
  GET_CATEGORY,
  GET_CATEGORY_ENDED,
  GET_ALL_CATEGORYS_STATED,
  GET_ALL_CATEGORYS,
  GET_ALL_CATEGORYS_ENDED,
} from "../types/category_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addCategory = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CATEGORY_STATED,
    });
    const { data } = await api.post(`/categorys`, formData);
    dispatch({
      type: ADD_CATEGORY,
      payload: data,
    });
    dispatch({
      type: ADD_CATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getCategorys =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CATEGORYS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/categorys?&${query}`);

      dispatch({
        type: GET_CATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_CATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_CATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_STATED,
    });
    const { data } = await api.get(`/categorys/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: data,
    });
    dispatch({
      type: GET_CATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_CATEGORY_STATED,
    });
    const { data } = await api.put(`/categorys/${id}`, formData);
    dispatch({
      type: EDIT_CATEGORY,
      payload: data,
    });
    dispatch({
      type: EDIT_CATEGORY_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_CATEGORY_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/categorys/${id}`);
    dispatch(setAlert("Category Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllCategorys =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_CATEGORYS_STATED,
      });
      const { data } = await api.get(
        `/categorys/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_CATEGORYS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_CATEGORYS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CATEGORYS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
